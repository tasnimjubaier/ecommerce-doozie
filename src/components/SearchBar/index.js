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
    <div className={styles["wrapper"]}>
      <div className={styles["input"]}>
        <FormControl fullWidth className={styles["inputBox"]}>
          <InputLabel htmlFor="search">Type search key</InputLabel>
          <OutlinedInput
            id="search"
            label="Type search key"
            onChange={(e) => setTopic(e.target.value)}
          />
        </FormControl>
        <button onClick={handleSearch} className={styles["button"]}>
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchBar