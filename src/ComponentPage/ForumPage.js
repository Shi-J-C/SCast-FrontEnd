import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ForumDetail from './ForumDetail'
import { FaChartBar } from 'react-icons/fa'

export default function ForumPage() {
  const [moduleData, setModuleData] = useState([])
  const [showY1, setShowY1] = useState(true)
  const [showY2, setShowY2] = useState(true)
  const [showY3, setShowY3] = useState(true)
  const [showY4, setShowY4] = useState(true)

  useEffect(() => {
    const source = axios.CancelToken.source()
    axios.get('http://localhost:3000/module').then((res) => {
      setModuleData(res.data)
    })

    return () => {
      source.cancel()
    }
  }, [])

  return (
    <div>
      <div className='container'>
        {/* <div className='subforum'>
          <div className='subforum-title'>
            <h1>General Information</h1>
          </div>
          {moduleData
            .filter((d) => {
              if (d.moduleCode.includes('Announcements')) {
                return d
              }
            })
            .map((d) => {
              return <ForumDetail key={d.moduleCode} {...d} />
            })}
        </div> */}

        <div className='subforum'>
          <div className='subforum-title'>
            <h1>Course Module</h1>
          </div>

          {/************************************** Display Year 1 module **************************************************/}
          <div className='subforum-title' onClick={() => setShowY1(!showY1)}>
            <small>Year 1 {showY1 ? '[COLLAPSE]' : '[EXPAND]'}</small>
          </div>
          {showY1
            ? moduleData
                .filter((d) => {
                  if (d.moduleCode.toLowerCase().includes('cz1')) {
                    return d
                  }
                })
                .map((d) => {
                  return <ForumDetail key={d._id} {...d} />
                })
            : ''}

          {/************************************** Display Year 2 module **************************************************/}
          <div className='subforum-title' onClick={() => setShowY2(!showY2)}>
            <small>Year 2 {showY2 ? '[COLLAPSE]' : '[EXPAND]'}</small>
          </div>
          {showY2
            ? moduleData
                .filter((d) => {
                  if (d.moduleCode.toLowerCase().includes('cz2')) {
                    return d
                  }
                })
                .map((d) => {
                  return <ForumDetail key={d._id} {...d} />
                })
            : ''}

          {/************************************** Display Year 3 module **************************************************/}
          <div className='subforum-title' onClick={() => setShowY3(!showY3)}>
            <small>Year 3 {showY3 ? '[COLLAPSE]' : '[EXPAND]'}</small>
          </div>
          {showY3
            ? moduleData
                .filter((d) => {
                  if (d.moduleCode.toLowerCase().includes('cz3')) {
                    return d
                  }
                })
                .map((d) => {
                  return <ForumDetail key={d._id} {...d} />
                })
            : ''}

          {/************************************** Display Year 4 module **************************************************/}
          <div className='subforum-title' onClick={() => setShowY4(!showY4)}>
            <small>Year 4 {showY4 ? '[COLLAPSE]' : '[EXPAND]'}</small>
          </div>
          {showY4
            ? moduleData
                .filter((d) => {
                  if (d.moduleCode.toLowerCase().includes('cz4')) {
                    return d
                  }
                })
                .map((d) => {
                  return <ForumDetail key={d._id} {...d} />
                })
            : ''}
        </div>
      </div>

      <div className='forum-info'>
        <div className='chart'>
          SCast - States &nbsp;
          <FaChartBar />
        </div>
        <div>
          <span>
            <u>5,300 </u> Posts in <u>1,200</u> Topics by 123,123 Users
          </span>
          {/* <span>
            Latest Post:
            <b>
              <a href='#'>Random Post</a>
            </b>
            on 15 Dec 2021 by <a href='#'>RandomUser</a>
          </span> */}
        </div>
      </div>

      <footer>
        <span>&copy;&nbsp;SCast | All rights Reserved.</span>
      </footer>
    </div>
  )
}
