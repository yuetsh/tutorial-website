import React, { useState, useRef, useCallback } from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import { usePrismTheme } from "@docusaurus/theme-common"
import { useLocation } from "@docusaurus/router"
import { useEditable } from "use-editable"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import Admonition from "@theme/Admonition"
import styles from "./styles.module.css"
import { createSubmission } from "./api"

function Editor({ children, showInput = false, language }) {
  const theme = usePrismTheme()
  const location = useLocation()
  language = language || location.pathname.split("/")[1]
  if (language === "clang") language = "c"

  const editorRef = useRef(null)
  const inputRef = useRef(null)

  const [code, setCode] = useState(children)
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [statusID, setStatusID] = useState(0)
  const [showInputNullTip, setShowInputNullTip] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const onCodeChange = useCallback((code) => {
    setCode(code.slice(0, -1))
  }, [])

  const onInputChange = useCallback((input) => {
    setInput(input.slice(0, -1))
    if (input) {
      setShowInputNullTip(false)
    }
  }, [])

  useEditable(editorRef, onCodeChange, {
    disabled: false,
    indentation: 4,
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
      <Tabs>
        <TabItem value="输入信息" default>
          <Highlight
            {...defaultProps}
            code={input}
            language="plaintext"
            theme={theme}
          >
            {({ tokens, getTokenProps }) => (
              <pre
                className="margin-bottom--none"
                spellCheck={false}
                ref={inputRef}
              >
                <code>
                  {tokens.map((line, i) => (
                    <React.Fragment key={i}>
                      {line
                        .filter((token) => !token.empty)
                        .map((token, key) => (
                          <span {...getTokenProps({ token, key })} />
                        ))}
                      {"\n"}
                    </React.Fragment>
                  ))}
                </code>
              </pre>
            )}
          </Highlight>
        </TabItem>
      </Tabs>
    )
  }

  function getCodeEditor() {
    let label = "Python"
    if (language === "c") label = "C 语言"
    return (
      <Tabs>
        <TabItem value={label} default>
          <Highlight
            {...defaultProps}
            code={code}
            language={language}
            theme={theme}
          >
            {({ tokens, getTokenProps }) => (
              <pre
                className={styles.codeEditor}
                spellCheck={false}
                ref={editorRef}
              >
                <code>
                  {tokens.map((line, i) => (
                    <React.Fragment key={i}>
                      {line
                        .filter((token) => !token.empty)
                        .map((token, key) => (
                          <span {...getTokenProps({ token, key })} />
                        ))}
                      {"\n"}
                    </React.Fragment>
                  ))}
                </code>
              </pre>
            )}
          </Highlight>
        </TabItem>
      </Tabs>
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
