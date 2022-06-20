import React from "react"
import styles from './styles.module.css'
import Editor, { loader } from "@monaco-editor/react"
import { createSubmission } from './api'

loader.config({
  paths: { vs: "https://cdn.staticfile.org/monaco-editor/0.33.0/min/vs" },
  "vs/nls": { availableLanguages: { "*": "zh-cn" } }
})

const options = {
  minimap: { enabled: false },
  fontSize: 20,
  scrollBeyondLastLine: false,
}

async function run () {
  const code = `#include<stdio.h>

  int main()
  {
      printf("1");
      return 0;
  }`
  const result = await createSubmission(code, '', 50)
  console.log(result)
}

export default function CodePen() {
  return (
    <div className={styles.container}>
      <Editor 
        defaultLanguage={"c"}
        options={options}
      />
      <button className="button button--primary" onClick={run}>运行</button>
      <button className="button button--secondary margin-left--md" onClick={run}>重置</button>
    </div>
  )
}
