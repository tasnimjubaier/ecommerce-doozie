import React, {useState} from 'react'

import styles from './index.module.css'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'


// item :: 
// headline, shopName, brand, price, reviewAverage, reviewCount


const ItemsTable = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5])
  const items = useSelector(state => state.items?.items)

  return (
    <div className='tableDiv'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Headline</th>
              <th>Shop Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Review Count</th>
              <th>Review Average</th>
            </tr>
          </thead>
          <tbody>
            {items.map(d => {
              return (
              <tr>
                <td>{d}</td>
                <td>Headline</td>
                <td>Shop Name</td>
                <td>Brand</td>
                <td>Price</td>
                <td>Review Count</td>
                <td>Review Average</td>
              </tr>
              )
            })}
          </tbody>
        </Table>
    </div>
  )
}

export default ItemsTable