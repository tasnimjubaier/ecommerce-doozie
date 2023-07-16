import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { FormControlLabel, FormControl, RadioGroup, Radio, Divider} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { setAllConfig, setPriceRange, setSortBy, setSortOrder } from '../../features/SearchConfig/searchConfigSlice';
import { SortOptions, SortOrders } from '../../utils/types';

import styles from './index.module.css'

// filter properties
// filter by price range, 
// max list size
// sort items by: price, review average, review count
// each config will place api call

const MinPriceRange = 10

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const Filter = ({foldCard, height}) => {
  const [error, setError] = useState('')

  const topic = useSelector(state => state.searchConfig?.searchKey)
  const priceRange = useSelector(state => state.searchConfig?.priceRange)
  const sortBy = useSelector(state => state.searchConfig?.sortBy)
  const sortOrder = useSelector(state => state.searchConfig?.sortOrder)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(priceRange)
    if(isNaN(priceRange[0])) console.log("NaN found")
  }, [priceRange])


  const handleApply = async () => {
    if(isNaN(priceRange[0]) ||  isNaN(priceRange[1]))  {
      setError("Please provide a number")
      return 
    }

    foldCard()

    dispatch(setAllConfig({searchKey: topic, range: [priceRange[0], priceRange[1]], sortBy, sortOrder}))

    navigate({
      pathname: "/search",
      search: createSearchParams({ key: topic, min: priceRange[0], max: priceRange[1], sortBy, sortOrder }).toString()
    })
  }

  const handleDiscard = () => {
    foldCard()
  }

  const handleSortByChange = (e) => {
    let val = parseInt(e.target.value) 
    dispatch(setSortBy({sortBy: val}))
  }

  const handleSortOrderChange = (e) => {
    let val = parseInt(e.target.value) 
    console.log({val})
    dispatch(setSortOrder({sortOrder: val}))
    
  }
  

  return (
    <div className={styles['wrapper']} style={{height}}>
      <div className={styles['buttons']}>
        <button className={styles['button']} onChange={() => setError("")} onClick={handleDiscard}>Discard</button>
        <button className={styles['button']} onChange={() => setError("")} onClick={handleApply}>Apply</button>
      </div>

      <div className={styles['group']}>
        <div className={styles['priceRange']}>
          <h5 className={styles['priceRangeText']}>
            Price Range
          </h5>
          <div style={{display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
            <div style={{display: 'flex', flexDirection:'column'}}>
              <span>Min</span>
              <input defaultValue={priceRange[0]} onChange={(e) => dispatch(setPriceRange({ range : [(parseInt(e.target.value)), priceRange[1]]}))}></input>
            </div>
            <div style={{display: 'flex', flexDirection:'column'}}>
              <span>Max</span>
              <input defaultValue={priceRange[1]} onChange={(e) => dispatch(setPriceRange({ range: [priceRange[0], parseInt(e.target.value)]}))}></input>
            </div>
          </div>
        </div>
        <Divider orientation="vertical" className={styles["divider"]} />
        <div className={styles['sortBy']}>
          <FormControl>
            <h5 className={styles['sortByText']}>
              Sort By
            </h5>
            <RadioGroup
              className={styles['sortByValue']}
              row
              defaultValue="None"
              aria-labelledby="demo-customized-radios"
              name="customized-radios"
              onChange={handleSortByChange}
            >
              <FormControlLabel value="1" control={<BpRadio />} label="None" checked={sortBy === SortOptions.None} />
              <FormControlLabel value="2" control={<BpRadio />} label="Price" checked={sortBy === SortOptions.Price} />
              <FormControlLabel value="3" control={<BpRadio />} label="Review Count" checked={sortBy === SortOptions.ReviewCount} />
              <FormControlLabel value="4" control={<BpRadio />} label="Review Average" checked={sortBy === SortOptions.ReviewAverage} />
            </RadioGroup>
            <RadioGroup
              className={styles['sortByType']}
              row
              defaultValue="None"
              aria-labelledby="demo-customized-radios"
              name="customized-radios"
              onChange={handleSortOrderChange}
            >
              <FormControlLabel value="1" control={<BpRadio />} label="Ascending" checked={sortOrder === SortOrders.Ascending} />
              <FormControlLabel value="2" control={<BpRadio />} label="Descending" checked={sortOrder === SortOrders.Descending} />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className={styles['error']}>
        {error}
      </div>
      
    </div>
  )
}

export default Filter