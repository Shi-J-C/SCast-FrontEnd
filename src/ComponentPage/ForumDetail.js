import React, { useEffect, useState } from 'react'
import {
  MdOutlineForum,
  MdOutlineBookmarkAdd,
  MdOutlineBookmarkRemove,
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function ForumDetail({
  _id,
  moduleCode,
  moduleName,
  createdAt,
  post,
}) {
  var str = createdAt
  var res = str.substring(0, 10)

  const [userBookmark, setUserBookmark] = useState([])

  let user = JSON.parse(sessionStorage.getItem('user'))
  var newdata = {}
  useEffect(() => {
    async function fetchUserData() {
      let response = await axios.get(`http://localhost:3000/user/${user._id}`)
      setUserBookmark(response.data.bookmark)
    }
    fetchUserData()
  }, [newdata])

  const handleAddBookmark = () => {
    newdata = { bookmarkId: _id }
    console.log('data pass over:', newdata)
    console.log(
      'API Link:',
      `http://localhost:3000/user/${user._id}/addBookmark`
    )
    axios.post(`http://localhost:3000/user/${user._id}/addBookmark`, newdata)
  }

  const handleDeleteBookmark = () => {
    newdata = { bookmarkId: _id }
    console.log('data pass over:', newdata)
    console.log(
      'API Link:',
      `http://localhost:3000/user/${user._id}/deleteBookmark`
    )
    axios.post(`http://localhost:3000/user/${user._id}/deleteBookmark`, newdata)
  }

  const bookmarkCheck = () => {
    let bookmarkExist = userBookmark.indexOf(`${_id}`)
    if (bookmarkExist >= 0)
      return (
        <MdOutlineBookmarkRemove
          onClick={() => {
            handleDeleteBookmark()
          }}
        />
      )
    else
      return (
        <MdOutlineBookmarkAdd
          onClick={() => {
            handleAddBookmark()
          }}
        />
      )
  }

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
      <div className='subforum-icon subforum-column center'>
        {/* <Bookmark _id={_id} userBookmark={userBookmark} /> */}
        {bookmarkCheck()}
      </div>
      <div className='subforum-stats subforum-column center'>
        <span>
          {'Module created at'}
          <br />
          {res}
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
