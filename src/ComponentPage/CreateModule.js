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
    e.preventDefault()
    axios
      .post(url, {
        moduleCode: data.moduleCode,
        moduleName: data.moduleName,
        post: [],
      })
      .then((res) => console.log(res.data))
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* Enter module code for creation */}
        <input
          placeholder='Enter Module Code'
          type='text'
          onChange={(e) => handleChange(e)}
          id='moduleCode'
          value={data.moduleCode}
        ></input>

        {/* Enter module name */}
        <input
          placeholder='Enter Module Name'
          type='text'
          onChange={(e) => handleChange(e)}
          id='moduleName'
          value={data.moduleName}
        ></input>

        {/* click to submit */}
        <button>Submit</button>
      </form>
    </div>
  )
}
