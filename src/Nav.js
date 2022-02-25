import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <header>
      <div className='brand'>SCast</div>
      <div className='navbar'>
        <nav className='navigation'>
          <ul className='nav-list'>
            <div className='nav-item'>
              <Link to='/updatemodule'>Update Module</Link>
              <Link to='/createmodule'>Create Module</Link>
              <Link to='/forum'>Forum</Link>
              <Link to='/about'>About</Link>
              <Link to='/'>Home</Link>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  )
}
