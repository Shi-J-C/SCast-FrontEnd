import React, { useState, useEffect } from 'react'
import { TextField, Grid } from '@material-ui/core'
import { Paper, Container, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel'
import axios from 'axios'
import Checkbox from '@mui/material/Checkbox'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'

const Profile = () => {
  var user = JSON.parse(sessionStorage.getItem('user'))
  const [passwordShown, setPasswordShown] = useState(false)

  const initialState = {
    name: '',
    username: '',
    phoneNo: '',
    telegramId: '',
    password: user.password,
    confirmPassword: user.password,
  }
  const [userProfile, setUserProfile] = useState(initialState)

  const [changePassword, setChangePassword] = useState(false)
  const { id } = useParams()

  // const handleChange = (e) => {
  //   setUserProfile({ ...userProfile, [e.target.name]: e.target.value })
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPasswordShown(false)
    // call update backend
    axios.post(`http://localhost:3000/user/${id}/updateUser`, userProfile)
    console.log(userProfile)
  }

  useEffect(() => {
    async function fetchUserData() {
      let response = await axios.get(`http://localhost:3000/user/${id}`)

      setUserProfile({
        ...userProfile,
        name: response.data.name,
        username: response.data.username,
        phoneNo: response.data.phoneNo,
        telegramId: response.data.telegramId,
      })
    }
    fetchUserData()
  }, [])

  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <Paper
          elevation={3}
          style={{
            border: 'solid 1px #52057b',
            marginTop: '20px',
            padding: '20px',
            justifyContent: 'center',
            boxShadow: '1px 2xp 3px #52057b',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <TextField
                name='name'
                label='Name'
                value={userProfile.name}
                // onChange={handleChange}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    name: e.target.value,
                  })
                }
                autoFocus
              />

              <TextField
                name='username'
                label='Email Address'
                value={userProfile.username}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    username: e.target.value,
                  })
                }
                // onChange={handleChange}

                type='email'
              />

              <TextField
                name='phoneNo'
                label='Phone Number'
                value={userProfile.phoneNo}
                // onChange={handleChange}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    phoneNo: e.target.value,
                  })
                }
                required
                type='number'
              />
              <TextField
                name='telegramId'
                label='Telegram ID'
                value={userProfile.telegramId}
                // onChange={handleChange}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    telegramId: e.target.value,
                  })
                }
                required
                type='text'
              />

              {changePassword && (
                <>
                  <TextField
                    name='password'
                    label='Password'
                    value={userProfile.password}
                    // onChange={handleChange}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        password: e.target.value,
                      })
                    }
                    type={passwordShown ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => {
                              setPasswordShown(!passwordShown)
                              console.log(passwordShown)
                            }}
                          >
                            {passwordShown ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    name='confirmPassword'
                    label='Repeat Password'
                    value={userProfile.confirmPassword}
                    // onChange={handleChange}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        confirmPassword: e.target.value,
                      })
                    }
                    type={passwordShown ? 'text' : 'password'}
                  />
                </>
              )}
              <FormControlLabel
                control={<Checkbox />}
                onChange={() => setChangePassword(!changePassword)}
                label='Change password'
              />
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              style={{ marginTop: '20px' }}
              onClick={() => handleSubmit}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export default Profile
