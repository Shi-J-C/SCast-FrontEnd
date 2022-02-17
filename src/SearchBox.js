import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function SearchBox({ data, setModuleData }) {
  const [searchTerm, setSearchTerm] = useState('')

  // const filter = () => {
  //   if (searchTerm === '') {
  //     return data
  //   } else {
  //     // eslint-disable-next-line no-lone-blocks
  //     {
  //       data.filter((d) => {
  //         if (d.ModuleCode.toLowerCase().includes(searchTerm.toLowerCase())) {
  //           console.log(d)
  //         }
  //       })
  //     }
  //   }
  // }

  // useEffect(() => {
  //   filter()
  // }, [searchTerm])

  return (
    <div className='search-box'>
      <select>
        <option>Post</option>
      </select>
      <input
        type='text'
        placeholder='search ...'
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
      ></input>
      <button>
        <FaSearch />
      </button>
    </div>
  )
}
