import axios from 'axios'
import React, { useState } from 'react'

export default function CreateModule() {
  const url = 'http://localhost:3000/module/addModule'
  const [data, setData] = useState({
    moduleCode: '',
    moduleName: '',
    post: [],
  })

  function handleChange(e) {
    const newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
    // console.log(newData)
  }

  function handleSubmit(e) {
    axios
      .post(url, {
        moduleCode: data.moduleCode,
        moduleName: data.moduleName,
        post: [],
      })
      .then((res) => console.log(res.data))
    alert(`Created Module ${data.moduleCode}`)
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* Enter module code for creation */}
        <input
          placeholder='Enter Module Code'
          type='text'
          id='moduleCode'
          value={data.moduleCode}
          onChange={(e) => handleChange(e)}
          required='required'
        ></input>

        {/* Enter module name */}
        <input
          placeholder='Enter Module Name'
          type='text'
          id='moduleName'
          value={data.moduleName}
          required='required'
          onChange={(e) => handleChange(e)}
        ></input>

        {/* click to submit */}
        <button>Add</button>
      </form>
    </div>
  )
}
