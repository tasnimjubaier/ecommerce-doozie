import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import styles from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ItemLoadingState } from '../../utils/types';
import { setItems, setSearchPhase } from '../../features/Items/itemSlice';
import { getItems } from '../../service/doozieApi';
import { formatItems } from '../../utils/formatter';
import { setAllConfig } from '../../features/SearchConfig/searchConfigSlice';


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
  const [searchConfig, setSearchConfig] = useState(null)
  const [page, setPage] = React.useState(0)
  const rowsPerPage = 10
  
  const navigate = useNavigate()
  const [searchQuery] = useSearchParams()

  const dispatch = useDispatch()

  useEffect(() => {
    if(searchQuery.size === 0) return 
    console.log({searchQuery})
    const searchKey = searchQuery.get('key')
    const minPrice = searchQuery.get('min')
    const maxPrice = searchQuery.get('max')
    const sortBy = searchQuery.get('sortBy')
    const sortOrder = searchQuery.get('sortOrder')

    // dispatch(setAllConfig({searchKey, range: [minPrice, maxPrice], sortBy, sortOrder}))

    setSearchConfig({searchKey, minPrice, maxPrice, sortBy, sortOrder})
    return () => {}
  }, [searchQuery])


  useEffect(() => {
    /// api call....
    console.log({searchConfig})
    if(searchConfig === null) return 
    const fetchData = async () => {
      dispatch(setSearchPhase({phase: ItemLoadingState.Loading}))
      const items = await getItems(searchConfig.searchKey, searchConfig.minPrice, searchConfig.maxPrice, searchConfig.sortBy, searchConfig.sortOrder)
      const formattedItems = formatItems(items)
      console.log(formattedItems)
      dispatch(setItems({items : formattedItems}))
      dispatch(setSearchPhase({phase: ItemLoadingState.Searched}))
    }
    console.log({searchConfig})
    
    fetchData()

    return () => {}
  }, [searchConfig])



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