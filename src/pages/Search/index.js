import React from 'react'
import SearchBar from '../../components/SearchBar'
import Filter from '../../components/Filter'
import ItemsTable from '../../components/ItemsTable'

import styles from './index.module.css'

const Search = () => {
  return (
    <div>
      <SearchBar />
      <Filter />
      <ItemsTable />
    </div>
  )
}

export default Search