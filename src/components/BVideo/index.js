import React from "react"
import styles from "./styles.module.css"

function BVideo({ src, p }) {
  let url = `https://player.bilibili.com/player.html?bvid=${src}`
  if (p) {
    url += `&page=${p}`
  }
  return (
    <div className={styles.video}>
      <iframe
        src={url}
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
      ></iframe>
    </div>
  )
}

export default BVideo
