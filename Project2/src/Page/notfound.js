
import { Link } from 'react-router-dom'


import React from 'react'

function notfound() {
  return (
    <div><h1>Page Not Found</h1>
   <Link to="/">Goto Home Page</Link></div>
  )
}

export default notfound
