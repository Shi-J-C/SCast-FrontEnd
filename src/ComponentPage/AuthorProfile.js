import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import { green } from '@mui/material/colors'
import Stack from '@mui/material/Stack'

const AuthorProfile = ({ userId, name }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [profile, setProfile] = useState([])

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: green[500],
      },
      children: `${name.split(' ')[0][0]}`,
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      await axios.get(`http://localhost:3000/user/${userId}`).then((res) => {
        setProfile(res.data)
      })
    }
    fetchUserData()
  }, [userId])

  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title='Profile'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 5,
                gridTemplateRows: 'auto',
                marginLeft: '100px',
              }}
            >
              <Avatar
                alt='Remy Sharp'
                {...(name ? stringAvatar(name) : '')}
                sx={{
                  width: 70,
                  height: 70,
                  backgroundColor: 'green',
                }}
              />
            </Box>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '75px', ml: '-47px' }}
          id='menu-appbar'
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <div style={{ margin: '10px' }}>
            <Typography textAlign='center'>
              User Name: {profile.name}
            </Typography>
            <hr />
            <Typography textAlign='center'>
              Email: {profile.username}
            </Typography>
            <hr />
            <Typography textAlign='center'>
              Phone Number: {profile.phoneNo}
            </Typography>
            <hr />
            <Typography textAlign='center'>
              Telegram: {profile.telegramId}
            </Typography>
          </div>
        </Menu>
      </Box>
    </div>
  )
}

export default AuthorProfile
