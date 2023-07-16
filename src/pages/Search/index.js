import React from 'react'
import styles from './index.module.css'
import ItemsTable from '../../components/ItemsTable'
import TopBanner from '../../components/TopBanner'
import SearchConfig from '../../components/SearchConfig'
import { useSearchParams } from 'react-router-dom'


const Search = () => {


  return (
    <div>
      <TopBanner />
      <SearchConfig />
      <ItemsTable />
    </div>
  )
}

export default Search