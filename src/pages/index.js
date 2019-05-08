import React from "react"
import { Link } from "gatsby"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Img from "gatsby-image"
import styles from "./index.module.css"

console.log('style',styles)

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>

  <h2>{data.allContentfulBlogPost.totalCount} Blog posts</h2>
  <div className={styles.gridcontainer}>
  {data.allContentfulBlogPost.edges.map(({node})=>(
    <div className="blog-post grid-item" key={node.id}>
      <img src={node.titleImage.fluid.src} alt="" className="blog-title-image"/>
      <h3 className="blog-title"><Link to={node.fields.slug}>{node.title}</Link></h3>
      <p className="blog-date">{node.postDate}</p>
    </div>
  )
  )}
    </div>
  </Layout>
)

export default IndexPage

export const query = graphql`
query  {
allContentfulBlogPost(sort: { fields: [postDate], order: DESC }){
    totalCount
    edges{
      node{
        id
        title
        fields{
          slug
        }
        postDate(formatString: "DD MMMM, YYYY")
        titleImage{
          file {
            url
            fileName
            contentType
          }
          resolutions(width: 300) {
            width
            height
            src
            srcSet
          }
          fluid(maxWidth: 500) {
              src
              srcSet
          }
          title
        }
      }
    }
  }
}
`