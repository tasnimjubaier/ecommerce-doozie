import React from 'react'

import styles from './index.module.css'
import { Button } from 'bootstrap'

// filter properties
// filter by price range, 
// max list size
// sort items by: price, review average, review count
// each config will place api call


const Filter = () => {
  return (
    <div className={styles['wrapper']}>
      <Button>Filter</Button>
    </div>
  )
}

export default Filter