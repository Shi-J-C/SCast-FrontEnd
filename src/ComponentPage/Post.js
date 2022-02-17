import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import data from '../data'
import Footer from './Footer'

const Post = () => {
  const { id, index } = useParams()
  const [post, setPost] = useState([])
  const [commentArea, setCommmentArea] = useState(false)
  const [replyArea, setReplyArea] = useState(false)

  useEffect(() => {
    data.filter((d) => {
      if (d.moduleCode === id) {
        setPost(d.posts[index])
      }
    })
  })

  return (
    <div>
      {/* Navigation */}
      <div className='navigate'>
        <span>
          <Link to={'/forum'}>SCast Forum - Forum</Link> {'>>'}{' '}
          <Link to={`/forum/${id}`}>{id}</Link> {'>>'} {post.postTitle}
        </span>
      </div>
      <div className='topic-container'>
        <div className='head'>
          <div className='authors'>Author</div>
          <div className='content'>Topic: {post.Subject}</div>
          <div className='postreply'>
            <button
              onClick={() => {
                setReplyArea(!replyArea)
                setCommmentArea(false)
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
              {post.userid}
              <br />
              This Data and Time
            </div>
          </div>

          <div className='content'>
            {post.text}
            <hr />
            Regards {post.userid}
            <div className='comment'>
              <button
                onClick={() => {
                  setCommmentArea(!commentArea)
                  setReplyArea(false)
                }}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Show Comments */}
      <div className='comments-container'>
        <div className='head'>
          <div className='authors'>User</div>
          <div className='content' style={{ flex: '85%' }}>
            Comments
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
              {post.userid}
              <br />
              This Data and Time
            </div>
          </div>

          <div className='content'>
            Just a random post by some other users in the SCAST FORUM
            <br />
            This looks like
            <br />
            <br />
            <br />
            <hr />
            Regards {post.userid}
            <div className='comment'>
              <button onClick={() => setCommmentArea(!commentArea)}>
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comment area */}
      {commentArea ? (
        <div className='comment-area'>
          <textarea
            name='comment'
            id=''
            placeholder='comment here ... '
          ></textarea>
          <input type='submit' name='' id='' value='submit'></input>
        </div>
      ) : (
        ''
      )}

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

export default Post
