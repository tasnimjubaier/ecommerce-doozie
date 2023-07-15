import React from 'react'
import styles from './index.module.css'
import { Typography } from '@mui/material'


const TopBanner = () => {
  return (
    <div className={styles['wrapper']}>
        <div className={styles['left']}>
            <h1 className={styles['title']}>
                Doozie
            </h1>
        </div>
        <div className={styles['right']}>
            <div className={styles['menu']}>
                <div className={styles['home']}>
                    <span>Home</span>
                </div>
                <div className={styles['search']}>
                    <span>Search Items</span>
                </div>
                <div className={styles['browse']}>
                    <span>Browse Items</span>
                </div>
            </div>
        </div>
        <div className={styles['extra']}>
            
        </div>
    </div>
  )
}

export default TopBanner