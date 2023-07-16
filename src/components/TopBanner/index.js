import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.css'


const TopBanner = () => {
    const navigate = useNavigate()
        
    return (
        <div className={styles['wrapper']}>
            <div className={styles['left']}>
                <h1 className={styles['title']} onClick={(e) => navigate({pathname: "/"})}>
                    Doozie
                </h1>
            </div>
            <div className={styles['right']}>
                <div className={styles['menu']}>
                    <div className={styles['home']} onClick={(e) => navigate({pathname: "/"})}>
                        <span>Home</span>
                    </div>
                    <div className={styles['search']} onClick={(e) => navigate({pathname: "/"})}>
                        <span>Search Items</span>
                    </div>
                    <div className={styles['browse']} onClick={(e) => navigate({pathname: "/not-found"})}>
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