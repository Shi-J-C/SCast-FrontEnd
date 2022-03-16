import React, { useState, useEffect } from 'react'
import { FaFire } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button'

export default function Posts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [posts, setPosts] = useState([])
  const [module, setModule] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const source = axios.CancelToken.source()
    axios.get(`http://localhost:3000/module/${id}`).then((res) => {
      setModule(res.data)
      setPosts(res.data.post)
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
      alert('Please sign up or sign in with us before posting.')
      navigate('/auth', { replace: true })
    }
  }

  return (
    <div style={{ margin: '10px' }}>
      <div className='navigate'>
        <span>
          <Link to={'/forum'}>SCast Forum</Link> {'>>'}
          {module.moduleCode}
          <Button
            style={{ float: 'right' }}
            onClick={() => routechange()}
            color='inherit'
            variant='outlined'
          >
            Create Post
          </Button>
        </span>
      </div>
      <input
        type='text'
        placeholder='Search...'
        style={{ marginBottom: 5, width: '30%' }}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
      ></input>

      <div className='posts-table'>
        <div className='table-head'>
          <div className='status'>Status</div>
          <div className='subjects'>Subjects</div>
          <div className='replies'>Replies/Views</div>
          <div className='last-reply'>Last Reply</div>
        </div>

        {posts
          .filter((post) => {
            if (searchTerm === '') {
              return post
            } else if (
              post.postTitle.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return post
            }
          })

          .map((d, index) => (
            <div className='table-row' key={index}>
              <div className='status'>
                <FaFire />
              </div>
              <div className='subjects'>
                <Link to={`/forum/${id}/posts/${index}`}>{d.postTitle}</Link>
                <br />
                <span>Started by {d.name}</span>
              </div>
              <div className='replies'>{d.comment.length} replies</div>
              <div className='last-reply'>
                {d.comment.length ? (
                  <div>
                    {d.comment[d.comment.length - 1].createdAt.substring(0, 10)}
                    <br />
                    By {d.comment[d.comment.length - 1].name}
                  </div>
                ) : (
                  'No Reply'
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
