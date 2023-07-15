import React, { useState } from 'react'
import { getItems } from '../../service/doozieApi'

import { useDispatch, useSelector } from 'react-redux'
import { setItems, setSearchPhase } from '../../features/Items/itemSlice'

import styles from './index.module.css'
import { Button, Divider, IconButton, InputBase, Paper } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { formatItems } from '../../utils/formatter'
import { ItemLoadingState } from '../../utils/types'
import { setSearchKey } from '../../features/SearchConfig/searchConfigSlice'

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
      dispatch(setSearchPhase({phase: ItemLoadingState.Loading}))
      const items = await getItems(topic, 0)
      const formattedItems = formatItems(items)
      console.log(formattedItems)
      dispatch(setItems({items : formattedItems}))
      dispatch(setSearchPhase({phase: ItemLoadingState.Idle}))
    }
  }

  return (
    <div className='searchDiv'>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Type search key"
          className={styles['input']}
          onChange={(e) => setTopic(e.target.value)}
          // inputProps={{ 'aria-label': 'search google maps' }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton onClick={handleSearch} color="primary" sx={{ p: '10px' }} aria-label="directions">
          <Button>Search</Button>
        </IconButton>
      </Paper>
    </div>
  )
}

export default SearchBar