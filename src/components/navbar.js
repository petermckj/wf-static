import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import styles from "./navbar.module.css"

const NavBar = () => ( <
    StaticQuery query = { graphql `
      query  {
        allContentfulStaticPage (filter:{
    parentPage: {
      id: { eq: null }
    }} ){
            edges {
              node {
                id
                fields {
                  slug
                }
                headline
                parentPage{
                  id
                }
              }
            }
          }
        }
    `}
    render = {
        data => ( <>
            <nav>
                <div className={styles.navcontainer}>
                    <div className={styles.navitem}>
                      <Link to="/">Home</Link>
                    </div>
                    {data.allContentfulStaticPage.edges.map(({node})=>(
                      <div className={styles.navitem} key={node.id}>
                        <Link to={node.fields.slug}>{node.headline}</Link>
                      </div>
                    ))}
                </div>
            </nav>
            </>
        )
    }
   /> 
)


export default NavBar