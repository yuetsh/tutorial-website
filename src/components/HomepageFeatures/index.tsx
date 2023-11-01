import styles from "./styles.module.css"

const FeatureList = [
  {
    title: "交互式编程学习",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: "可以自己动手修改代码，无须环境准备，方便快捷",
  },
  {
    title: "系统且专业",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: "提供专业的编程学习",
  },
  {
    title: "及时更新",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: "随时编写，随时更新",
  },
]

function Feature({ Svg, title, description }) {
  return (
    <div className="col col--4">
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
