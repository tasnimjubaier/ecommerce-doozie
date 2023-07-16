import React from 'react'
import ItemsTable from '../../components/ItemsTable'
import TopBanner from '../../components/TopBanner'
import SearchConfig from '../../components/SearchConfig'
import { PageTitleFormatter } from '../../utils/formatter'

import styles from './index.module.css'

const Search = () => {

  return (
    <div>
      <PageTitleFormatter title={"Doozie Search"} />
      <TopBanner />
      <SearchConfig />
      <ItemsTable />
    </div>
  )
}

export default Search