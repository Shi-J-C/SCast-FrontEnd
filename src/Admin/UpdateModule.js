import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import CreateModule from './CreateModule'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import ReadOnlyRow from './ReadOnlyRow'
import EditableRow from './EditableRow'

export default function UpdateModule() {
  const [moduleData, setModuleData] = useState([])
  const [editModuleId, setEditModuleId] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:3000/module').then((res) => {
      // console.log(res.data)
      setModuleData(res.data)
    })
  }, [])

  const [editFormData, setEditFormData] = useState({
    _id: '',
    moduleCode: '',
    moduleName: '',
    post: [],
  })

  const handleEditClick = (e, module) => {
    e.preventDefault()
    setEditModuleId(module._id)
    const formValues = {
      _id: module._id,
      moduleCode: module.moduleCode,
      moduleName: module.moduleName,
      post: module.post,
    }
    setEditFormData(formValues)
  }

  const handleEditFormChange = (e) => {
    e.preventDefault()
    const newFormData = { ...editFormData }
    newFormData[e.target.id] = e.target.value
    setEditFormData(newFormData)
    console.log(newFormData)
  }
  function handleSubmit(e) {
    const editedModule = {
      _id: editFormData._id,
      moduleCode: editFormData.moduleCode,
      moduleName: editFormData.moduleName,
      post: editFormData.post,
    }
    console.log('Updated data', editedModule)

    axios
      .post('http://localhost:3000/updateModule', editedModule)
      .then((res) => console.log(res.data))
  }

  return (
    <TableContainer component={Paper}>
      <form>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Module Code</TableCell>
              <TableCell>Module Name</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {moduleData.map((module) => (
              <Fragment key={module._id}>
                {editModuleId === module._id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleSubmit={handleSubmit}
                  />
                ) : (
                  <ReadOnlyRow
                    module={module}
                    handleEditClick={handleEditClick}
                  />
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </form>
      <div>
        <h1>Add Module</h1>
      </div>
      <CreateModule />
    </TableContainer>
  )
}
