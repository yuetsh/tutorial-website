import React, { useState, useRef, useCallback, useEffect } from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import { usePrismTheme } from "@docusaurus/theme-common"
import { useEditable } from "use-editable"
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import Admonition from "@theme/Admonition"
import "./styles.module.css"
import { createSubmission } from "./api"
import BrowserOnly from "@docusaurus/BrowserOnly"

function Editor({ children, showInput = false, language }) {
  let timer = 0

  const theme = usePrismTheme()

  const editorRef = useRef(null)
  const inputRef = useRef(null)

  const [code, setCode] = useState(children)
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [statusID, setStatusID] = useState(0)
  const [showInputNullTip, setShowInputNullTip] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const onCodeChange = useCallback(code => {
    setCode(code.slice(0, -1))
  }, [])

  const onInputChange = useCallback(input => {
    setInput(input.slice(0, -1))
    if (input) {
      setShowInputNullTip(false)
    }
  }, [])

  useEditable(editorRef, onCodeChange, {
    disabled: false,
    indentation: 4
  })

  useEditable(inputRef, onInputChange)

  async function run() {
    if (showInput && input === "") {
      setOutput("")
      setShowInputNullTip(true)
      return
    }
    setDisabled(true)

    let languageID = 50
    if (language === "python") languageID = 71
    if (language === "cpp") languageID = 54
    const result = await createSubmission(code, input, languageID)
    setOutput(result.output)
    setStatusID(result.status.id)

    timer = setTimeout(() => {
      setDisabled(false)
      clearTimeout(timer)
    }, 2000)
  }

  function reset() {
    setCode(children)
    setInput("")
    setOutput("")
    setStatusID(0)
    setShowInputNullTip(false)
  }

  function getInput() {
    return (
      <Highlight {...defaultProps} code={input} language="plaintext" theme={theme}>
        {({ tokens, getTokenProps }) => (
          <pre className="margin-bottom--none" spellCheck={false} ref={inputRef}>
            <code>
              {tokens.map((line, i) => (
                <React.Fragment key={i}>
                  {line.filter(token => !token.empty).map((token, key) => <span {...getTokenProps({ token, key })} />)}
                  {"\n"}
                </React.Fragment>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    )
  }

  function getCodeEditor() {
    return <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ tokens, getTokenProps }) => (
        <pre spellCheck={false} ref={editorRef}>
          <code>
            {tokens.map((line, i) => (
              <React.Fragment key={i}>
                {line.filter(token => !token.empty).map((token, key) => <span {...getTokenProps({ token, key })} />)}
                {"\n"}
              </React.Fragment>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  }

  function getTabs() {
    if (showInput) {
      return (
        <Tabs>
          <TabItem value="代码（可编辑）" default>
            {getCodeEditor()}
          </TabItem>
          <TabItem value="输入">
            {getInput()}
          </TabItem>
        </Tabs>
      )
    } else {
      return (
        <Tabs>
          <TabItem value="代码（可编辑）" default>
            {getCodeEditor()}
          </TabItem>
        </Tabs>
      )
    }
  }

  function getOutput() {
    if (statusID !== 0 && output !== "") {
      if (statusID === 3) {
        return <Admonition type="tip" title="运行结果">
          {output}
        </Admonition>
      } else if (statusID === 6) {
        return <Admonition type="danger" title="编译失败">
          {output}
        </Admonition>
      } else {
        return <Admonition type="danger" title="运行失败">
          {output}
        </Admonition>
      }
    } else {
      return null
    }
  }

  function getTipForNullInput() {
    if (showInputNullTip) {
      return (
        <Admonition type="caution" title="提示">
          输入不能为空
        </Admonition>
      )
    } else {
      return null
    }
  }

  useEffect(() => {
    language = language || location.pathname.split('/')[1]
    if (language === "clang") language = "c"
    return () => clearTimeout(timer)
  }, [disabled])

  return (
    <BrowserOnly fallback={<div>加载中...</div>}>
      {
        () => <>
          {getTabs()}
          {getOutput()}
          {getTipForNullInput()}
          <div className="margin-vert--md">
            <button className="button button--primary margin-right--md" onClick={run} disabled={disabled}>运行</button>
            <button className="button button--secondary" onClick={reset}>重置</button>
          </div>
        </>
      }
    </BrowserOnly>
  )
}

export default Editor