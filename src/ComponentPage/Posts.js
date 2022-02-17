import React, { useState, useEffect } from 'react'
import { FaFire } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import data from '../data'

export default function Posts() {
  const [posts, setPosts] = useState([])
  let { id } = useParams()

  useEffect(() => {
    if (id === 'undefined') {
      console.log(id)
    }
    data.filter((d) => {
      if (d.moduleCode === id) {
        setPosts(d.posts)
      }
    })
  })

  let navigate = useNavigate()
  const routechange = () => {
    let path = `/forum/${id}/createpost`
    navigate(path)
  }

  return (
    <div>
      {/* <SearchBox /> */}

      {/* Navigation */}
      <div className='navigate'>
        <span>
          <Link to={'/forum'}>SCast Forum - Forum</Link> {'>>'}
          {id}
          <button style={{ float: 'right' }} onClick={() => routechange()}>
            Create Post
          </button>
        </span>
      </div>
      <div className='posts-table'>
        <div className='table-head'>
          <div className='status'>Status</div>
          <div className='subjects'>Subjects</div>
          <div className='replies'>Replies/Views</div>
          <div className='last-reply'>Last Reply</div>
        </div>

        {posts.map((d, index) => (
          <div className='table-row' key={index}>
            <div className='status'>
              <FaFire />
            </div>
            <div className='subjects'>
              <Link to={`/forum/${id}/posts/${index}`}>{d.postTitle}</Link>
              <br />
              <span>Started by {d.userid}</span>
            </div>
            <div className='replies'>
              2 replies <br /> 125 views
            </div>
            <div className='last-reply'>
              12 Oct 2021
              <br />
              By Joal
            </div>
          </div>
        ))}

        {/* Pagination */}
        {/* <div className='pagination'>
          pages: <a href='#'>1</a>
          <a href='#'>2</a>
          <a href='#'>3</a>
        </div> */}
      </div>
    </div>
  )
}
