import React, { useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { getItems } from '../../service/doozieApi'

import { useDispatch, useSelector } from 'react-redux'
import { setItems } from '../../features/Items/itemSlice'

import styles from './index.module.css'

const SearchBar = () => {
  const [topic, setTopic] = useState("")
  const [error, setError] = useState("")
  
  const dispatch = useDispatch()


  const handleSearch = async (e) => {
    e.preventDefault()
    if(topic == "") setError("Please provide search key")
    else {
      // api call...
      // update store ...
      const items = await getItems(topic, 0)
      dispatch(setItems({items}))
    }
  }


  return (
    <div className='searchDiv'>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="search"
          aria-label="search"
          aria-describedby="basic-addon2"
          autoFocus
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={handleSearch}>Search</Button>
      </InputGroup>
      <div>{error}</div>
    </div>
  )
}

export default SearchBar