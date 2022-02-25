import './App.css'
import Nav from './Nav'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Forum from './ComponentPage/ForumPage'
import Home from './ComponentPage/Home'
import About from './ComponentPage/About'
import Posts from './ComponentPage/Posts'
import CreateModule from './Admin/CreateModule'
import Post from './ComponentPage/Post'
import CreatePost from './ComponentPage/CreatePost'
import UpdateModule from './Admin/UpdateModule'

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/forum' element={<Forum />}></Route>
          <Route path='/forum/:id' element={<Posts />}></Route>
          <Route path='/forum/:id/createpost' element={<CreatePost />}></Route>
          <Route path='/forum/:id/posts/:index' element={<Post />}></Route>
          {/* <Route path='/createmodule' element={<CreateModule />}></Route> */}
          <Route path='/updatemodule' element={<UpdateModule />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
