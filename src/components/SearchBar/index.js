import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { FormControl, InputLabel, OutlinedInput } from '@mui/material'

import { setSearchKey } from '../../features/SearchConfig/searchConfigSlice'

import styles from './index.module.css'


const SearchBar = () => {
  const [searchQuery] = useSearchParams()
  const [error, setError] = useState("")

  const topic = useSelector(state => state.searchConfig?.searchKey)
  const priceRange = useSelector(state => state.searchConfig?.priceRange)
  const sortBy = useSelector(state => state.searchConfig?.sortBy)
  const sortOrder = useSelector(state => state.searchConfig?.sortOrder)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleKeyDown = (e) => {
    if(e.key === "Enter") {
      handleSearch(e)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()

    if(topic === "") setError("Please provide search key")
    else {
      // we'll just navigate to the page..
      navigate({
        pathname: '/search',
        search: createSearchParams({key: topic, min : priceRange[0], max: priceRange[1], sortBy, sortOrder}).toString()
      })
    }
  }

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["input"]}>
        <FormControl fullWidth className={styles["inputBox"]}>
          <InputLabel htmlFor="search">Type search key</InputLabel>
          <OutlinedInput
            id="search"
            label="Type search key"
            onKeyDown={e => handleKeyDown(e)}
            onChange={(e) => {dispatch(setSearchKey({searchKey : e.target.value})); setError("")}}
            value={topic}
            autoFocus
          />
        </FormControl>
        <button onClick={handleSearch} className={styles["button"]}>
          Search
        </button>
      </div>
      <div  className={styles["error"]}>{error}</div>
    </div>
  )
}

export default SearchBar