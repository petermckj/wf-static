import React from "react"
import { Link } from "gatsby"
import styles from "./sidenav.module.css"

const SideBar = (props) => (
    <div className={styles.navcontainer}>
    {props.pages.edges.map(({node})=>(
        <div className={styles.navitem} key={node.id}>
            <Link to={node.fields.slug}>{node.headline}</Link>
        </div>
    ))}
    </div>
)

export default SideBar

/*
You can't pass variables to static query as it doesn't receive page context
So this approach didn't work. 

export default () => {
    <StaticQuery
        query={
            graphql`
                query($id:String!) {
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
            `}
        render = {data =>(
        <>
            <nav>
                <h3>Sidenav</h3>
                <div className={styles.navcontainer}>
                    {data.allContentfulStaticPage.edges.map(({node})=>(
                      <div className={styles.navitem} key={node.id}>
                        <Link to={node.fields.slug}>{node.headline}</Link>
                      </div>
                    ))}
                </div>
            </nav>
        </>
        )}
    />
}
*/
