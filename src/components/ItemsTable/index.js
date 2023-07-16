import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import {  createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

import { ItemLoadingState } from '../../utils/types';
import { addItems, setItems, setSearchPhase } from '../../features/Items/itemSlice';
import { getItems } from '../../service/doozieApi';
import { filterItems, formatItems } from '../../utils/formatter';

import styles from './index.module.css'

// item :: 
// headline, shopName, brand, price, reviewAverage, reviewCount


const headCells = [
  {
    id: 'index',
    numeric: false,
    disablePadding: true,
    label: 'Item',
  },
  {
    id: 'title',
    numeric: true,
    disablePadding: false,
    label: 'Title',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'shopName',
    numeric: true,
    disablePadding: false,
    label: 'Shop Name',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'reviewAverage',
    numeric: true,
    disablePadding: false,
    label: 'Review Average',
  },
  {
    id: 'reviewCount',
    numeric: true,
    disablePadding: false,
    label: 'Review Count',
  },
];

function EnhancedTableHead({ rowCount }) {
  
  return (  
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  rowCount: PropTypes.number.isRequired,
};


const ItemsTable = () => {
  const items = useSelector(state => state.items?.items)
  const searchPhase = useSelector(state => state.items?.phase)
  const searchPage = useSelector(state => state.items?.page)
  const [searchConfig, setSearchConfig] = useState(null)
  const [page, setPage] = React.useState(0)
  const rowsPerPage = 10
  
  const navigate = useNavigate()
  const [searchQuery] = useSearchParams()

  const dispatch = useDispatch()

  useEffect(() => {
    if(searchQuery.size === 0) return 
    const searchKey = searchQuery.get('key')
    const minPrice = searchQuery.get('min')
    const maxPrice = searchQuery.get('max')
    const sortBy = searchQuery.get('sortBy')
    const sortOrder = searchQuery.get('sortOrder')
  
    setSearchConfig({searchKey, minPrice, maxPrice, sortBy, sortOrder})
    return () => {}
  }, [searchQuery])

  

  useEffect(() => {
    /// api call....
    if(searchConfig === null) return 
    
    const fetchData = async () => {
      dispatch(setSearchPhase({phase: ItemLoadingState.Loading}))
      const items = await getItems(searchConfig.searchKey, searchConfig.minPrice,
         searchConfig.maxPrice, searchConfig.sortBy, searchConfig.sortOrder, 1)
      const formattedItems = formatItems(items, 0)
      const filteredItems = filterItems(formattedItems, searchConfig, 0)
      console.log(filteredItems)
      dispatch(setItems({items : filteredItems}))
      dispatch(setSearchPhase({phase: ItemLoadingState.Searched}))
    }

    fetchData()

    return () => {}
  }, [searchConfig])

  useEffect(() => {
    // check if one page before last page
    // if it is then api call and update.
    // if not updated then finish this loop.
    if(page == 0) return
    const l = items.length 
    const r = rowsPerPage * page 

    const fetchNextPageData = async (page) => {
      dispatch(setSearchPhase({phase: ItemLoadingState.Loading}))
      const itms = await getItems(searchConfig.searchKey, searchConfig.minPrice, 
          searchConfig.maxPrice, searchConfig.sortBy, searchConfig.sortOrder, page)
      const formattedItems = formatItems(itms, items.length)
      const filteredItems = filterItems(formattedItems, searchConfig, items.length)
      console.log(filteredItems)
      dispatch(addItems({items : filteredItems}))
      dispatch(setSearchPhase({phase: ItemLoadingState.Searched}))
    }
    if(l - r < 20) {
      // api call
      fetchNextPageData(searchPage + 1)
    }
  }, [page])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleItemClick = (e, item) => {
    navigate({
      pathname: `/item/${item.item_id}`,
      search: createSearchParams({ platform: item.platform }).toString(),
    })
  }


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      items.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [items, page, rowsPerPage],
  );



  if(searchPhase === ItemLoadingState.Loading) {
    let arr = new Array(12).fill(0)
    return (
      <div className={styles['wrapper']}>
        <Box className={styles['table']}>
          { arr.map((ar, key) => (
            <Skeleton key={key} variant='rounded' sx={{height: '35px', marginBottom: '15px'}} animation="wave"/>
          ))}
        </Box>
      </div>
    )
  }

  if(visibleRows.length === 0 && searchPhase === ItemLoadingState.NotSearced) {
    
    return (
      <div className={styles['notsearched']}>
        Type some key to search!
      </div>
    )

  }

  if(visibleRows.length === 0 && searchPhase === ItemLoadingState.Searched) {
    return (
      <div className={styles['notsearched']}>
        No Data Found!
      </div>
    )
  }



  return (
    <div className={styles['wrapper']}>
      <Box className={styles['table']}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size='medium'
            >
              <EnhancedTableHead
                rowCount={items.length}
              />
              <TableBody>
                {visibleRows.map((item, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      title={item.title}
                      hover
                      onClick={(event) => handleItemClick(event, item)}
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      // selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="11"
                        align='center'
                      >
                        {item.id}
                      </TableCell>
                      <TableCell align="center">{item.title}</TableCell>
                      <TableCell align="center">{item.description}</TableCell>
                      <TableCell align="center">{item.shop_name}</TableCell>
                      <TableCell align="center">{item.price}</TableCell>
                      <TableCell align="center">{item.review_average}</TableCell>
                      <TableCell align="center">{item.review_count}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Paper>
      </Box>
    </div>
  )
}

export default ItemsTable