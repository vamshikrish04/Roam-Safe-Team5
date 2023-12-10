import React from 'react'
import Footer from './Footer/footer'
import Navbar from './Navbar/navbar'

export default function Layout({children}) {
  return (
    <div>
      <Navbar/>
      {children}
      <Footer/>
    </div>
  )
}
