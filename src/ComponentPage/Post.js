import { Link, useParams } from 'react-router-dom'
import FileBase from 'react-file-base64'
import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Post() {
  const { id, index } = useParams()
  const [module, setModule] = useState([])
  const [post, setPost] = useState([])
  let navigate = useNavigate()

  const [reply, setReply] = useState({
    postId: '',
    userId: '',
    commentText: '',
    commentImage: '',
  })

  const [replyArea, setReplyArea] = useState(false)
  const [comment, setComment] = useState([])

  useEffect(() => {
    const source = axios.CancelToken.source()
    axios.get(`http://localhost:3000/module/${id}`).then((res) => {
      setModule(res.data)
      setPost(res.data.post[index])
      //changeComment(res.data.post[index].comment);
      setComment(res.data.post[index].comment)
      console.log(post)
    })

    return () => {
      source.cancel()
    }
  }, [])

  const handleReplySubmit = (e) => {
    e.preventDefault()
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (user) {
      let temp = comment
      reply.userId = user.name
      temp = [...temp, reply]
      setComment(temp)
      reply.postId = post._id
      console.log(reply)
      axios
        .post(`http://localhost:3000/comment/${id}/addcomment`, reply)
        .then((res) => console.log(res.data))
    } else {
      alert('Please sign up or sign in with us before reply.')
      navigate('/auth', { replace: true })
    }
  }

  return (
    <div>
      <div className='navigate'>
        <span>
          <Link to={'/forum'}>SCast Forum </Link> {'>>'}{' '}
          <Link to={`/forum/${id}`}>{module.moduleCode}</Link> {'>>'}{' '}
          {post.postTitle}
        </span>
      </div>
      {/*========================author area=========================*/}
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

        {/*========================comment area=========================*/}
        <section>
          {comment.map((data, index) => (
            <div key={index}>
              <div className='head'>Comment</div>
              <div className='body'>
                <div className='authors'>
                  <img
                    src='https://cdn.pixabay.com/photo/2014/04/05/13/05/boy-317041__340.jpg'
                    alt=''
                  ></img>
                  <div className='username'>
                    Posted By
                    <br />
                    {data.userId}
                  </div>
                </div>

                <div className='content'>
                  {data.commentText}
                  <br />
                  {data.commentImage ? 'Image' : ''}
                  <br />
                  {data.commentImage ? (
                    <img src={`${data.commentImage}`} alt=''></img>
                  ) : (
                    ''
                  )}
                  <br />
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Reply area */}
      {replyArea ? (
        <div>
          <form>
            <TextField
              style={{
                background: 'white',
              }}
              id='commentText'
              placeholder='reply to post... '
              type='text'
              onChange={(e) =>
                setReply({ ...reply, commentText: e.target.value })
              }
            />
            <div>
              {/* upload image */}
              <label>Select File</label>
              <FileBase
                type='file'
                multiple={false}
                onDone={({ base64 }) =>
                  setReply({ ...reply, commentImage: base64 })
                }
              ></FileBase>
            </div>
            <Button onClick={handleReplySubmit}>Submit</Button>
          </form>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
