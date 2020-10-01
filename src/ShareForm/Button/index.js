import React from 'react'

import './styles.scss'

export default function Button({ children, ...otherProps }) {
  return (
    <button className="btnCustom" {...otherProps}>
      {children}
    </button>
  )
}
