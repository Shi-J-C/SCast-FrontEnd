import React from 'react'
import { MdOutlineForum } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function ForumDetail({ moduleCode, moduleName }) {
  return (
    <div className='subforum-row'>
      <div className='subforum-icon subforum-column center'>
        <MdOutlineForum />
      </div>
      <div className='subforum-description subforum-column '>
        <h1>
          <Link to={`/forum/${moduleCode}`}>{moduleCode}</Link>
        </h1>
        <p>{moduleName}</p>
      </div>
      <div className='subforum-stats subforum-column center'>
        <span>24 Posts | 15 Topics</span>
      </div>
      <div className='subforum-info subforum-column '>
        <b>
          <a href='google.com'>Last Post </a>
        </b>
        by
        <a href='gooogle.com'> JustAUser</a>
        <br />
        on <small>22 dec 2021</small>
      </div>
    </div>
  )
}
