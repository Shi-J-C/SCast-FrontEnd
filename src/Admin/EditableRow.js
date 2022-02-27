import React from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import Button from '@mui/material/Button'
import CancelIcon from '@mui/icons-material/Cancel'

function EditableRow({
  editFormData,
  handleSubmit,
  setEditModuleId,
  setEditFormData,
}) {
  return (
    <TableRow>
      <TableCell>
        <input
          type='text'
          required='required'
          placeholder='Enter a module code'
          id='moduleCode'
          value={editFormData.moduleCode}
          onChange={(e) =>
            setEditFormData({ ...editFormData, moduleCode: e.target.value })
          }
        ></input>
      </TableCell>
      <TableCell>
        <input
          type='text'
          required='required'
          placeholder='Enter a module name'
          id='moduleName'
          value={editFormData.moduleName}
          onChange={(e) =>
            setEditFormData({ ...editFormData, moduleName: e.target.value })
          }
        ></input>
      </TableCell>
      <TableCell>
        <Button
          variant='outlined'
          startIcon={<SaveAsIcon />}
          onClick={(e) => {
            handleSubmit()
            setEditModuleId('')
          }}
        >
          Save
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant='outlined'
          startIcon={<CancelIcon />}
          onClick={(e) => setEditModuleId('')}
        >
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default EditableRow
