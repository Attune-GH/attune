import React from 'react'
import { Image } from 'react-bootstrap'

//hold for logo and also  a redirect to Dashboard
const Footer = () => {
  return (
  <div className="container footer">
    <div><Image src={'/img/back.svg'} style={{ height: '125%' }} /></div>
    {<div><h3>Dashboard</h3></div>}
    <div><Image src={'/img/forward.svg'} style={{ height: '125%' }} /></div>
  </div>)
}

export default Footer
