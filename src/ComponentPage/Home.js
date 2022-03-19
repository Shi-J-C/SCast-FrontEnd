import React from 'react'
import Footer from './Footer'
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined'
import forumimg from '../image/forumevent.png'

const Home = () => {
  return (
    <div className='Homecontainer'>
      <div className=''>
        <h1 className='title'>
          <NewReleasesOutlinedIcon />
          What's new at SCast?
        </h1>
        <div className='Homecontainer-row' style={{ marginLeft: '100px' }}>
          <img
            src={forumimg}
            alt=''
            style={{
              width: '85%',
            }}
          ></img>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Home
