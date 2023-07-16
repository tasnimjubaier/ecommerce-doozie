import React, { useState } from 'react'
import SearchBar from '../SearchBar'
import Filter from '../Filter'

import styles from './index.module.css'


const ConfigMinHeight = 59
const ConfigMaxHeight = 299


const SearchConfig = () => {
    const [open, setOpen] = useState(false)
    const [height, setHeight] = useState(ConfigMinHeight)

    const handleExpand = (e) => {
        setHeight((height === ConfigMinHeight ? ConfigMaxHeight : ConfigMinHeight))
        setOpen(!open)
    }

    return (
        <div className={styles["wrapper"]}>
            <SearchBar />
            <div className={styles["moreconfig"]} style={{ height }}>
                {!open && 
                    <button className={styles["expand"]}
                        onClick={handleExpand}>
                        More Configuration
                    </button>
                }
                {open && 
                    <div className={styles["expanded"]}>
                        <Filter foldCard={handleExpand} height={height}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default SearchConfig