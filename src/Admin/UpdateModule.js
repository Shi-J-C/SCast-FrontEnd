import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import CreateModule from './CreateModule'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import ReadOnlyRow from './ReadOnlyRow'
import EditableRow from './EditableRow'
import { styled } from '@mui/material/styles'

export default function UpdateModule() {
  const [moduleData, setModuleData] = useState([])
  const [editModuleId, setEditModuleId] = useState(null)

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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))

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
      style={{ border: 'solid', borderWidth: 'thin' }}
    >
      <form>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Module Code</StyledTableCell>
              <StyledTableCell>Module Name</StyledTableCell>
              <StyledTableCell>Update</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {moduleData.map((module) => (
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
                    StyledTableCell={StyledTableCell}
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
