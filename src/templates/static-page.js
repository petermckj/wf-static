import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SideNav from "../components/sidenav"
import styles from "./static-post.module.css"

export default ({ data }) => {
  const post = data.contentfulStaticPage
  const subpages = data.allContentfulStaticPage
  return (
    <Layout>
      <div className={styles.maincontainer}>
        <div className={styles.main}>
          <h1>{post.headline}</h1>
          <img src={post.mainImage.fluid.src} srcSet={post.mainImage.fluid.srcSet} alt=''/>
          <div id="maincontent" dangerouslySetInnerHTML={{ __html: post.mainContent.childContentfulRichText.html }}></div>
        </div>
        <div className={styles.side}>
          <SideNav pageid={post.id} pages={subpages} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $id: String!) {
    contentfulStaticPage(fields: { slug: { eq: $slug } }) {
      id
      fields {
          slug
        }
        headline
        mainImage {
          id
          file {
            url
            fileName
            contentType
          }
          fluid(maxWidth:300){
            src
            srcSet
          }
        }
        mainContent {
          id
          childContentfulRichText {
        		html
      		}
        }
        parentPage{
          id
          headline
        }
    }
    allContentfulStaticPage(filter: {parentPage: {id: {eq: $id}}}) {
                        edges {
                            node {
                                id
                                fields{
                                    slug
                                }
                                headline
                                parentPage {
                                    id
                                }
                            }
                        }
                    }
  }
`