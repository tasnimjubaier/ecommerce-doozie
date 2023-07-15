import React, {useEffect, useState} from 'react'

import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import styles from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Checkbox, FormControlLabel, IconButton, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Link } from 'react-router-dom';


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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleClick = (event, name) => {
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    console.log(items[2]?.image_urls[1])
  }, [items])


  // Avoid a layout jump when reaching the last page with empty rows.
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



  return (
    <div className='tableDiv'>
      <Box sx={{ width: '100%' }}>
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
                      hover
                      onClick={(event) => handleClick(event, item.name)}
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
                      <TableCell align="center">
                        <Link to={`/item/${item.item_id}`} state={{platform : item.platform}}>
                          {item.title}
                        </Link>
                      </TableCell>
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  )
}

export default ItemsTable