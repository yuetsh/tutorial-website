import styles from "./styles.module.css"

function BVideo({ src, p }) {
  let url = `https://player.bilibili.com/player.html?bvid=${src}`
  if (p) {
    url += `&page=${p}`
  }
  return (
    <div className={styles.video}>
      <iframe src={url}></iframe>
    </div>
  )
}

export default BVideo
