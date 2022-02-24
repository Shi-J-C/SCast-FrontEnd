import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function CreatePost() {
  const { id } = useParams()
  const [module, setModule] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3000/module/${id}`).then((res) => {
      setModule(res.data)
    })
  }, [])

  const url = `http://localhost:3000/post/${id}/addPost`
  const [data, setData] = useState({
    userId: 'josanpe',
    postTitle: '',
    postImage: '',
    postType: 'Lecture Note',
    comment: [],
  })

  function handleChange(e) {
    const newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData)
  }

  function handleSubmit(e) {
    e.preventDefault()
    // axios
    //   .post(url, {
    //     userId: 'joanpe',
    //     postTitle: data.postTitle,
    //     postImage: data.postImage,
    //     postType: data.postType,
    //     comment: [],
    //   })
    //   .then((res) => console.log(res.data))
    console.log(data)
  }
  return (
    <div>
      <div className='navigate'>
        <span>
          <span>
            <Link to={'/forum'}>SCast Forum - Forum</Link> {'>>'}{' '}
            <Link to={`/forum/${id}`}>{module.moduleCode}</Link> {'>>'}{' '}
            {'New Post'}
          </span>
        </span>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        {/* Enter you post title */}
        <input
          placeholder='Post Title...'
          type='text'
          onChange={(e) => handleChange(e)}
          id='postTitle'
          value={data.postTitle}
        ></input>

        <br />
        {/* Select your question topic */}
        <select
          id='postType'
          value={data.postType}
          onChange={(e) => handleChange(e)}
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
          onChange={(e) => handleChange(e)}
          id='comment'
          value={data.comment}
        ></textarea>

        <br />
        {/* Upload your image here to display */}
        <div>
          <label>Select File</label>
          <input
            type='file'
            id='postImage'
            value={data.postImage}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <button>Create Post</button>
      </form>
    </div>
  )
}
