/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `ContentfulBlogPost` || node.internal.type === `ContentfulStaticPage`) {
        let slug = ''
        if (node.internal.type === `ContentfulBlogPost`) {
            slug = 'blog-' + node.title.replace(/\s+/g, '-').toLowerCase();
        } else {
            slug = 'page-' + node.headline.replace(/\s+/g, '-').toLowerCase();
        }
        createNodeField({
            node,
            name: `slug`,
            value: slug
        })
    }
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return graphql(`
    {
        allContentfulBlogPost(sort: { fields: [postDate], order: DESC }){
            edges{
              node{
                id
                fields{
                  slug
                }
              }
            }
          }
        allContentfulStaticPage{
          edges{
            node{
              id
              fields{
                slug
              }
            }
          }
        }
    }
    `).then(result => {
        result.data.allContentfulBlogPost.edges.forEach(({ node }) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/blog-post.js`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: node.fields.slug,
                },
            })
        })
        result.data.allContentfulStaticPage.edges.forEach(({ node }) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/static-page.js`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: node.fields.slug,
                    id: node.id
                },
            })
        })
    })
}