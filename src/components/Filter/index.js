import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { styled } from '@mui/material/styles';
import {Slider, Box, Typography, ButtonBase, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, Divider} from '@mui/material';
import { getItems, getItemsByPrice } from '../../service/doozieApi';
import { useDispatch, useSelector } from 'react-redux';
import { filterByPrice, setItems, setSearchPhase, sortItems } from '../../features/Items/itemSlice';
import { formatItems } from '../../utils/formatter';
import { setAllConfig } from '../../features/SearchConfig/searchConfigSlice';
import { ItemLoadingState } from '../../utils/types';
import { Link } from 'react-router-dom';

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
  const [priceRange, setPriceRange] = useState([10, 20])
  const [sortBy, setSortBy] = useState(1)
  const [sortOrder, setSortOrder] = useState(1)

  const topic = useSelector(state => state.searchConfig?.searchKey)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(priceRange)
  }, [priceRange])

  const handlePriceRangeChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceRange([Math.min(newValue[0], priceRange[1] - MinPriceRange), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + MinPriceRange)]);
    }
  }

  const handleApply = async () => {
    // api call
    // update store 
    foldCard()

    // dispatch(setSearchPhase({phase: ItemLoadingState.Loading}))
    // const items = await getItems(topic, 0)
    // const formattedItems = formatItems(items)

    // dispatch(setItems({items : formattedItems}))
    // // dispatch(filterByPrice({priceRange}))
    // dispatch(sortItems({sortBy, sortOrder}))
    // dispatch(setAllConfig({range: priceRange, sortBy, sortOrder}))
    // dispatch(setSearchPhase({phase: ItemLoadingState.Idle}))
  }

  const handleDiscard = () => {
    foldCard()
  }

  const handleSortByChange = (e) => {
    let val = parseInt(e.target.value) 
    console.log({val: e.target.value})
    setSortBy(val)
  }

  const handleSortOrderChange = (e) => {
    let val = parseInt(e.target.value) 
    console.log({val: e.target.value})
    setSortOrder(val)
  }
  

  return (
    <div className={styles['wrapper']} style={{height}}>
      <div className={styles['buttons']}>
        <button className={styles['button']} onClick={handleDiscard}>Discard</button>
        <button className={styles['button']} onClick={handleApply}>Apply</button>
      </div>

      <div className={styles['group']}>
        <div className={styles['priceRange']}>
          <h5 className={styles['priceRangeText']}>
            Price Range
          </h5>
          {/* <Slider
              className={styles['priceRangeSlider']}
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              disableSwap
          /> */}
          <div style={{display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
            <div style={{display: 'flex', flexDirection:'column'}}>
              <span>Min</span>
              <input defaultValue={0} onChange={(e) => setPriceRange([(parseInt(e.target.value)), priceRange[1]])}></input>
            </div>
            <div style={{display: 'flex', flexDirection:'column'}}>
              <span>Max</span>
              <input defaultValue={10000000} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}></input>
            </div>
          </div>
        </div>
        <Divider orientation="vertical" className={styles["divider"]} />
        <div className={styles['sortBy']}>
          <FormControl>
            <h5 className={styles['sortByText']}>
              Sort By
            </h5>
            {/* <FormLabel className={styles['sortByText']}>Sort By</FormLabel> */}
            <RadioGroup
              className={styles['sortByValue']}
              row
              defaultValue="None"
              aria-labelledby="demo-customized-radios"
              name="customized-radios"
              onChange={handleSortByChange}
            >
              <FormControlLabel value="2" control={<BpRadio />} label="Price" />
              <FormControlLabel value="3" control={<BpRadio />} label="Rating Count" />
              <FormControlLabel value="4" control={<BpRadio />} label="Rating Average" />
            </RadioGroup>
            <RadioGroup
              className={styles['sortByType']}
              row
              defaultValue="None"
              aria-labelledby="demo-customized-radios"
              name="customized-radios"
              onChange={handleSortOrderChange}
            >
              <FormControlLabel value="1" control={<BpRadio />} label="Asending" />
              <FormControlLabel value="2" control={<BpRadio />} label="Descending" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      
    </div>
  )
}

export default Filter