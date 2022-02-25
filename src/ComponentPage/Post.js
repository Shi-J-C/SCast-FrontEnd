import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Post() {
  const { id, index } = useParams()
  const [module, setModule] = useState([])
  const [post, setPost] = useState([])
  const [replyArea, setReplyArea] = useState(false)

  useEffect(() => {
    const source = axios.CancelToken.source()
    axios.get(`http://localhost:3000/module/${id}`).then((res) => {
      setModule(res.data)
      setPost(res.data.post[index])
      console.log(post)
    })

    return () => {
      source.cancel()
    }
  }, [])

  return (
    <div>
      <div className='navigate'>
        <span>
          <Link to={'/forum'}>SCast Forum - Forum</Link> {'>>'}{' '}
          <Link to={`/forum/${id}`}>{module.moduleCode}</Link> {'>>'}{' '}
          {post.postTitle}
        </span>
      </div>

      <div className='topic-container'>
        <div className='head'>
          <div className='authors'>Author</div>
          <div className='content'>
            {post.postType} : {post.postTitle}
          </div>
          <div className='postreply'>
            <button
              onClick={() => {
                setReplyArea(!replyArea)
              }}
            >
              Post Reply
            </button>
          </div>
        </div>

        <div className='body'>
          <div className='authors'>
            <img
              src='https://cdn.pixabay.com/photo/2014/04/05/13/05/boy-317041__340.jpg'
              alt=''
            ></img>
            <div className='username'>
              Posted By
              <br />
              {post.userId}
              {/* <br />
              This Data and Time */}
            </div>
          </div>

          <div className='content'>
            {post.postObjective}
            <br />
            {post.postImage ? 'Image' : ''}
            <br />
            {post.postImage ? <img src={`${post.postImage}`} alt=''></img> : ''}
            {/* <hr />
            Regards {post.userId} */}
          </div>
        </div>
      </div>

      {/* Reply area */}
      {replyArea ? (
        <div className='comment-area'>
          <textarea
            name='reply'
            id=''
            placeholder='reply to post... '
          ></textarea>
          <input type='submit' name='' id='' value='submit'></input>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
