import React, { useEffect, useState } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import { getItemById } from '../../service/doozieApi'
import TopBanner from '../../components/TopBanner'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import styles from './index.module.css'

// title, headline, description

// imageurl, shopurl, itemurl, 

// price, currency, availability, shopname, review count, review average, brand

// condition, shipping overseas, shop review count, sale end time 

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Skeleton } from '@mui/material'
import { PageTitleFormatter } from '../../utils/formatter'


const Item = (props) => {
  const {itemId} = useParams()
  const [item, setItem] = useState(null)
  const [queryString] = useSearchParams()
  
  const platform = queryString.get('platform')
  console.log(platform)


  useEffect(() => {

    const fetchData = async() => {
      let itm = await getItemById(platform, itemId)
      setItem(itm)
    }
    
    fetchData()
    return () => {}
  }, [itemId, platform])



  if(item === null) {
    return (
      <>
        <PageTitleFormatter title={itemId} />
        <TopBanner />
        <div className={styles['skeleton']}>

          <div className={styles['skimage']}>
            <Skeleton  variant='rounded' sx={{height: '600px', width: "500px"}} animation="wave"/>
          </div>
          <div className={styles['skright']}>
            <Skeleton  variant='rounded' sx={{height: '200px', width:"90%", marginBottom: '15px'}} animation="wave"/>
            <Skeleton  variant='rounded' sx={{height: '600px', width:"90%", marginBottom: '15px'}} animation="wave"/>
          </div>
        </div>
      </>
    )
  }


  return (
    <div className={styles['wrapper']}>
      <TopBanner />
      <div className={styles['top']}>
        <div className={styles['image']}>
          <Swiper
            className={styles['swiper']}
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={1}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {item?.image_urls.map((img, index) => (
              <SwiperSlide key={index}><img src={img} alt='Item'/></SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles['right']}>
          <h3 className={styles['headline']}>
            {item?.headline}
          </h3>
          <h4 className={styles['title']}>
            {item?.title}
          </h4>
          <h4 className={styles['description']}>
            {item?.description}
          </h4>
        </div>
      </div>
      <div className={styles['middle']}>
        <div className={styles['middle-left']}>
          <div className={`${styles['price']} ${styles['item']}`}>
            <h5>Price: </h5>
            <h6>{item?.price}</h6>
          </div>
          <div className={`${styles['currency']} ${styles['item']}`}>
            <h5>Currency: </h5>
            <h6>{item?.currency}</h6>
          </div>
          <div className={`${styles['availability']} ${styles['item']}`}>
            <h5>Availability: </h5>
            <h6>{item?.availability}</h6>
          </div>
          <div className={`${styles['shopname']} ${styles['item']}`}>
            <h5>Shop Name: </h5>
            <h6>{item?.shop_name}</h6>  
          </div>
          <div className={`${styles['currency']} ${styles['item']}`}>
            <h5>Review Count: </h5>
            <h6>{item?.review_count}</h6>
          </div>
          <div className={`${styles['currency']} ${styles['item']}`}>
            <h5>Review Average: </h5>
            <h6>{item?.review_average}</h6>
          </div>
          <div className={`${styles['currency']} ${styles['item']}`}>
            <h5>Brand: </h5>
            <h6>{item?.brand}</h6>
          </div>
        </div>
        <div className={styles['middle-right']}>
        <div className={`${styles['currency']} ${styles['item']}`}>
            <h5>Condition: </h5>
            <h6>{item?.condition}</h6>
          </div>
          <div className={`${styles['currency']} ${styles['item']}`}>
            <h5>Shipping Overseas: </h5>
            <h6 title={item?.shipping_overseas}>{item?.shipping_overseas?.length > 15 ? item?.shipping_overseas?.substring(0, 15) + "..." : item?.shipping_overseas}</h6>
          </div>
          <div className={`${styles['currency']} ${styles['item']}`}>
            <h5>Shop Review Count: </h5>
            <h6>{item?.shop_review_count}</h6>
          </div>
          <div className={`${styles['currency']} ${styles['item']}`}>
            <h5>Sale End Time: </h5>
            <h6>{item?.sale_end_time}</h6>
          </div>
        </div>
      </div>
      <div className={styles['bottom']}>
              {/* shop url , item url */}
              <div></div>
              <button  className={styles['moreinfo']}> 
                <a href={item?.item_url}>
                  More Info <ArrowForwardIcon />
                </a>
              </button>
              <button  className={styles['shopnow']}>  
                <a href={item?.shop_url}>
                  Shop now <AddShoppingCartIcon />
                </a>
              </button>
              <div></div>
      </div>
    </div>
  )
}
// price, currency, availability, shopname, review count, review average, brand

// condition, shipping overseas, shop review count, sale end time 

export default Item