import React from 'react'
import './styles.css'
import Cookies from 'js-cookie'

export const Navbar = () => {
  return (
    <nav className="navbar">
    <div className="container">
      <div className="logo">Cinephile</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/watch-history">Watch History</a></li>
        <li><a href="/watchlist">Watchlist</a></li>
        <li><a onClick={() => {Cookies.remove('userId');}} href="/login">Logout</a></li>
      </ul>
    </div>
  </nav>
  )
}
