import React, { useState } from 'react'
import { getItems } from '../../service/doozieApi'

import { useDispatch, useSelector } from 'react-redux'
import { setItems, setSearchPhase } from '../../features/Items/itemSlice'

import styles from './index.module.css'
import { Box, Button, ButtonBase, Divider, FormControl, IconButton, InputBase, InputLabel, OutlinedInput, Paper } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { formatItems } from '../../utils/formatter'
import { ItemLoadingState } from '../../utils/types'
import { setSearchKey } from '../../features/SearchConfig/searchConfigSlice'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

const SearchBar = () => {
  const [searchQuery] = useSearchParams()
  const [topic, setTopic] = useState(searchQuery.get('key') === null ? "" : searchQuery.get('key'))
  const [error, setError] = useState("")

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
      // api call...
      // update store ...
      /// we won't do this here. 
      // dispatch(setSearchPhase({phase: ItemLoadingState.Loading}))
      // const items = await getItems(topic)
      // const formattedItems = formatItems(items)
      // console.log(formattedItems)
      // dispatch(setItems({items : formattedItems}))
      // dispatch(setSearchPhase({phase: ItemLoadingState.Searched}))

      // we'll just navigate to the page..
      dispatch(setSearchKey({searchKey : topic}))
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
            onChange={(e) => {setTopic(e.target.value); setError("")}}
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