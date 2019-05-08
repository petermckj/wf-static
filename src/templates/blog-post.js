import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
    const post = data.contentfulBlogPost
    return ( <Layout>
        <div>
        <h1> { post.title } </h1> 
        <h4> { post.postDate } </h4> 
        <div dangerouslySetInnerHTML={{ __html: post.postBody.childMarkdownRemark.html }}/>
        <img src={ post.titleImage.resolutions.src } srcSet={ post.titleImage.resolutions.srcSet } alt="" />
        </div>
        </Layout>
    )
}

export const query = graphql `
  query($slug: String!) {
    contentfulBlogPost(fields: { slug: { eq: $slug } }) 
    {
      title
      postDate
      postBody{
            childMarkdownRemark {
                html
            }
      }
      titleImage {
        resolutions {
            width
            height
            src
            srcSet
        }
    }
  }}
`