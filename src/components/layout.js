/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Header from "./header"
import NavBar from "./navbar"
import "./layout.css"

const Layout = ({ children }) => ( <
    StaticQuery query = { graphql `
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        allContentfulStaticPage {
    edges {
      node {
        fields {
          slug
        }
        headline
      }
    }
  }
      }
    ` }
    render = {
        data => ( <>
            <div style = {{
                    margin: `0 auto`,
                    maxWidth: `960px`,
                    padding: css `rhythm(2)`,
                    paddingTop: css `rhythm(1.5)`
                }}>
            <NavBar />
            <Header siteTitle={data.site.siteMetadata.title}/>

            <main> {children} </main>
            <footer> ©{ new Date().getFullYear() }, Built with { ` ` } <a href = "https://www.gatsbyjs.org">Gatsby</a>
            </footer>
            </div>
            </>
        )
    }
    />
)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout