import React, { useState, useEffect } from 'react'
import { FaFire } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const { id } = useParams()
  console.log('Current module:', id)

  return <div>{id}</div>
}
