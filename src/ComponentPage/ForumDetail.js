import React from 'react'
import { MdOutlineForum } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function ForumDetail({
  _id,
  moduleCode,
  moduleName,
  createdAt,
  post,
}) {
  var str = createdAt
  var res = str.substring(0, 10)

  return (
    <div className='subforum-row'>
      <div className='subforum-icon subforum-column center'>
        <MdOutlineForum />
      </div>
      <div className='subforum-description subforum-column '>
        <h1>
          <Link to={`/forum/${_id}`}>{moduleCode}</Link>
        </h1>
        <p>{moduleName}</p>
      </div>
      <div className='subforum-stats subforum-column center'>
        <span>
          {'Module created at'}
          <br />
          {res}
          {/* 25 Posts | 15 Replies */}
        </span>
      </div>
      <div className='subforum-info subforum-column center'>
        <span>
          {post.length} Posts since
          <br />
          {res}
        </span>
      </div>
    </div>
  )
}
