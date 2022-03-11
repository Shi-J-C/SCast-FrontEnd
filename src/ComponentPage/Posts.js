import React, { useState, useEffect } from 'react'
import { FaFire } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [module, setModule] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const source = axios.CancelToken.source()
    axios.get(`http://localhost:3000/module/${id}`).then((res) => {
      setModule(res.data)
      setPosts(res.data.post)
      // console.log(posts[0].comment[posts[0].comment.length - 1].userId)
    })
    return () => {
      source.cancel()
    }
  }, [])

  let navigate = useNavigate()
  const routechange = () => {
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (user) {
      let path = `/forum/${id}/createpost`
      navigate(path)
    } else {
      alert('Please sign up or sign in with us before reply.')
      navigate('/auth', { replace: true })
    }
  }

  return (
    <div>
      <div className='navigate'>
        <span>
          <Link to={'/forum'}>SCast Forum</Link> {'>>'}
          {module.moduleCode}
          <Button
            style={{ float: 'right' }}
            onClick={() => routechange()}
            // variant='contained'
            color='inherit'
            variant='outlined'
          >
            Create Post
          </Button>
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
            <div className='replies'>{d.comment.length} replies</div>
            <div className='last-reply'>
              12 Oct 2021
              <br />
              {d.comment.length
                ? `By ${d.comment[d.comment.length - 1].userId}`
                : 'No Reply'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
