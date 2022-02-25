import React from 'react'
import axios from 'axios'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import Button from '@mui/material/Button'
import CancelIcon from '@mui/icons-material/Cancel'

function EditableRow({ editFormData, handleEditFormChange, handleSubmit }) {
  return (
    <TableRow>
      <TableCell>
        <input
          type='text'
          required='required'
          placeholder='Enter a module code'
          id='moduleCode'
          value={editFormData.moduleCode}
          onChange={(e) => handleEditFormChange(e)}
        ></input>
      </TableCell>
      <TableCell>
        <input
          type='text'
          required='required'
          placeholder='Enter a module name'
          id='moduleName'
          value={editFormData.moduleName}
          onChange={(e) => handleEditFormChange(e)}
        ></input>
      </TableCell>
      <TableCell>
        <Button
          variant='outlined'
          startIcon={<SaveAsIcon />}
          onClick={() => {
            handleSubmit()
          }}
        >
          Save
        </Button>
      </TableCell>
      <TableCell>
        <Button variant='outlined' startIcon={<CancelIcon />}>
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default EditableRow
