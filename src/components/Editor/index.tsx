import React, { useState, useCallback } from "react"
import { useLocation } from "@docusaurus/router"
import { useColorMode } from "@docusaurus/theme-common"
import CodeMirror, { EditorView } from "@uiw/react-codemirror"
import { cpp } from "@codemirror/lang-cpp"
import { python } from "@codemirror/lang-python"
import { githubLight, githubDark } from "@uiw/codemirror-theme-github"
import Admonition from "@theme/Admonition"
import styles from "./styles.module.css"
import { createSubmission } from "./api"

const styleTheme = EditorView.baseTheme({
  "& .cm-scroller": {
    "font-family": "Consolas",
  },
  "&.cm-editor.cm-focused": {
    outline: "none",
  },
})


function Editor({ children, showInput = false, language }) {
  const location = useLocation()
  language = language || location.pathname.split("/")[1]

  const highlight = {
    c: cpp(),
    clang: cpp(),
    python: python(),
  }[language]

  const { colorMode } = useColorMode()

  const theme = {
    light: githubLight,
    dark: githubDark,
  }[colorMode]

  const [code, setCode] = useState(children)
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [statusID, setStatusID] = useState(0)
  const [showInputNullTip, setShowInputNullTip] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const onCodeChange = useCallback(setCode, [])

  const onInputChange = useCallback((input) => {
    setInput(input)
    if (input) {
      setShowInputNullTip(false)
    }
  }, [])

  async function run() {
    if (showInput && input === "") {
      setOutput("")
      setShowInputNullTip(true)
      return
    }
    setDisabled(true)

    let languageID = 50 // C
    if (language === "python") languageID = 71
    const result = await createSubmission(code, input, languageID)
    setOutput(result.output)
    setStatusID(result.status.id)
    setDisabled(false)
  }

  function reset() {
    setCode(children)
    setInput("")
    setOutput("")
    setStatusID(0)
    setShowInputNullTip(false)
  }

  function getInput() {
    if (!showInput) return null
    return (
      <div className={styles.input}>
        <CodeMirror
        className={styles.codeMirror}
        value={input}
        onChange={onInputChange}
        theme={theme}
        basicSetup={{ lineNumbers: false, foldGutter: false }}
        placeholder="输入信息"
        extensions={[styleTheme]}
      ></CodeMirror>
      </div>
    )
  }

  function getCodeEditor() {
    return (
      <CodeMirror
        className={styles.codeMirror}
        value={code}
        onChange={onCodeChange}
        extensions={[highlight, styleTheme]}
        theme={theme}
        basicSetup={{ tabSize: 4 }}
      ></CodeMirror>
    )
  }

  function Actions() {
    return (
      <div className="margin-vert--md">
        <button
          className="button button--primary margin-right--md"
          onClick={run}
          disabled={disabled}
        >
          运行
        </button>
        <button className="button button--secondary" onClick={reset}>
          重置
        </button>
      </div>
    )
  }

  function Output() {
    if (statusID !== 0 && output !== "") {
      if (statusID === 3) {
        return (
          <Admonition type="tip" title="运行结果">
            <pre
              className={styles.outputBox}
              dangerouslySetInnerHTML={{ __html: output }}
            ></pre>
          </Admonition>
        )
      } else if (statusID === 6) {
        return (
          <Admonition type="danger" title="编译失败">
            <pre
              className={styles.outputBox}
              dangerouslySetInnerHTML={{ __html: output }}
            ></pre>
          </Admonition>
        )
      } else {
        return (
          <Admonition type="danger" title="运行失败">
            <pre
              className={styles.outputBox}
              dangerouslySetInnerHTML={{ __html: output }}
            ></pre>
          </Admonition>
        )
      }
    } else {
      return null
    }
  }

  function TipForNullInput() {
    if (!showInputNullTip) return null
    return (
      <Admonition type="caution" title="提示">
        输入不能为空
      </Admonition>
    )
  }

  return (
    <>
      {getCodeEditor()}
      {getInput()}
      <Actions />
      <Output />
      <TipForNullInput />
    </>
  )
}

export default Editor
