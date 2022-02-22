import React, { useState, useEffect } from 'react'
import { FaFire } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [module, setModule] = useState([])
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:3000/module/${id}`).then((res) => {
      setModule(res.data)
      setPosts(res.data.post)
      console.log(posts)
    })
  }, [])

  let navigate = useNavigate()
  const routechange = () => {
    let path = `/forum/${id}/createpost`
    navigate(path)
  }

  return (
    <div>
      <div className='navigate'>
        <span>
          <Link to={'/forum'}>SCast Forum - Forum</Link> {'>>'}
          {module.moduleCode}
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
              <span>Started by {d.userId}</span>
            </div>
            <div className='replies'>
              {d.comment.length} replies <br /> 125 views
            </div>
            <div className='last-reply'>
              12 Oct 2021
              <br />
              By Joal
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
