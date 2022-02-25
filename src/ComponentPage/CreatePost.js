import axios from 'axios'
import FileBase from 'react-file-base64'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Post from './Post'

export default function CreatePost() {
  const { id } = useParams()
  const [moduleCode, setModuleCode] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:3000/module/${id}`).then((res) => {
      setModuleCode(res.data.moduleCode)
    })
  }, [])

  const url = `http://localhost:3000/post/${id}/addPost`
  const [postData, setPostData] = useState({
    userId: 'Joann',
    postTitle: '',
    postImage: '',
    postObjective: '',
    postType: 'Lecture Note',
    comment: [],
  })

  function handleSubmit(e) {
    // e.preventDefault()
    // axios.post(url, postData).then((res) => console.log(res.data))
    axios.post(url, postData)
    console.log(postData)
    alert('Create Post successfully')
  }
  return (
    <div>
      <div className='navigate'>
        <span>
          <span>
            <Link to={'/forum'}>SCast Forum - Forum</Link> {'>>'}{' '}
            <Link to={`/forum/${id}`}>{moduleCode}</Link> {'>>'} {'New Post'}
          </span>
        </span>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        {/* Enter you post title */}
        <input
          placeholder='Post Title...'
          type='text'
          id='postTitle'
          value={postData.postTitle}
          onChange={(e) =>
            setPostData({ ...postData, postTitle: e.target.value })
          }
        ></input>

        <br />
        {/* Select your question topic */}
        <select
          id='postType'
          value={postData.postType}
          onChange={(e) =>
            setPostData({ ...postData, postType: e.target.value })
          }
        >
          <option>Lecture Note</option>
          <option>Tutorial</option>
          <option>Lab</option>
        </select>

        <br />

        {/* Enter your question here */}
        <textarea
          placeholder='Enter your question'
          type='text'
          onChange={(e) =>
            setPostData({ ...postData, postObjective: e.target.value })
          }
          id='comment'
          value={postData.postObjective}
        ></textarea>

        <br />
        {/* Upload your image here to display */}
        <div>
          <label>Select File</label>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, postImage: base64 })
            }
          ></FileBase>
        </div>

        <button>Create Post</button>
      </form>
    </div>
  )
}
