import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Footer from './Footer'

const CreatePost = () => {
  const { id } = useParams()
  return (
    <div>
      {/* <SearchBox /> */}
      <div className='navigate'>
        <span>
          <span>
            <Link to={'/forum'}>SCast Forum - Forum</Link> {'>>'}{' '}
            <Link to={`/forum/${id}`}>{id}</Link> {'>>'} {'New Post'}
          </span>
        </span>
      </div>
      <h1>Create Post for Module {id}</h1>
    </div>
  )
}

export default CreatePost
