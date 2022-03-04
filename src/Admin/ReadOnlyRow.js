import React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'

const ReadOnlyRow = ({ module, handleEditClick, handleDelete }) => {
  return (
    <TableRow>
      <TableCell>{module.moduleCode}</TableCell>
      <TableCell>{module.moduleName}</TableCell>
      <TableCell>
        <Button
          variant='outlined'
          startIcon={<EditIcon />}
          type='button'
          onClick={(e) => handleEditClick(e, module)}
        >
          Edit
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant='outlined'
          startIcon={<DeleteIcon />}
          onClick={(e) => {
            handleDelete(e, module)
          }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default ReadOnlyRow
