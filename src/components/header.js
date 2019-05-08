import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import {Spring} from 'react-spring/renderprops'

//const props = useSpring({opacity: 1, from: {opacity: 0},background: `rebeccapurple`,marginBottom: `1.45rem`})

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}>
        {props => (
          <h1 style={props}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
          </h1>
        )}
      </Spring>
      
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
