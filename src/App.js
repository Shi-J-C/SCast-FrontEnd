import './App.css'
import Nav from './Nav'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Forum from './ComponentPage/ForumPage'
import Home from './ComponentPage/Home'
import About from './ComponentPage/About'
import Posts from './ComponentPage/Posts'
import CreateModule from './ComponentPage/CreateModule'

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route exact path='/forum' element={<Forum />}></Route>
          <Route path='/forum/:id' element={<Posts />}></Route>
          <Route path='/createmodule' element={<CreateModule />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
