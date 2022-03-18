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
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/module').then((res) => {
      // console.log(res.data)
      setModuleData(res.data)
    })
  }, [editModuleId])

  const [editFormData, setEditFormData] = useState({
    _id: '',
    moduleCode: '',
    moduleName: '',
    // post: [],
  })

  const handleEditClick = (e, module) => {
    e.preventDefault()
    setEditModuleId(module._id)
    const formValues = {
      _id: module._id,
      moduleCode: module.moduleCode,
      moduleName: module.moduleName,
      // post: module.post,
    }
    setEditFormData(formValues)
  }

  const handleSubmit = (e) => {
    const editedModule = {
      _id: editFormData._id,
      moduleCode: editFormData.moduleCode,
      moduleName: editFormData.moduleName,
      // post: editFormData.post,
    }
    console.log(editedModule)
    axios.post(
      `http://localhost:3000/module/${editFormData._id}/updateModule`,
      editedModule
    )
    alert(`Module information updated`)
  }

  const handleDelete = (e, module) => {
    setEditModuleId(module._id)
    axios
      .post(`http://localhost:3000/module/${module._id}/deleteModule`)
      .then((res) => console.log(res))

    alert(`Module ${module.moduleCode} deleted`)
  }

  return (
    <TableContainer
      component={Paper}
      style={{ border: 'solid', borderWidth: 'thin', padding: '10px' }}
    >
      <input
        type='text'
        placeholder='Search...'
        style={{ marginBottom: 5, width: '30%' }}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
      ></input>
      <form>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>
                Module Code
              </TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>
                Module Name
              </TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>
                Update
              </TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '15px' }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {moduleData
              .filter((module) => {
                if (searchTerm === '') {
                  return module
                } else if (
                  module.moduleCode
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return module
                }
              })
              .map((module) => (
                <Fragment key={module._id}>
                  {editModuleId === module._id ? (
                    <EditableRow
                      editFormData={editFormData}
                      // handleEditFormChange={handleEditFormChange}
                      handleSubmit={handleSubmit}
                      setEditModuleId={setEditModuleId}
                      setEditFormData={setEditFormData}
                    />
                  ) : (
                    <ReadOnlyRow
                      module={module}
                      handleEditClick={handleEditClick}
                      handleDelete={handleDelete}
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
