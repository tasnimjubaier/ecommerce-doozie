import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { json, useLocation, useParams } from 'react-router-dom'
import { getItemById } from '../../service/doozieApi'
import TopBanner from '../../components/TopBanner'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// title, headline, description

// imageurl, shopurl, itemurl, 

// price, currency, availability, shopname, review count, review average, brand

// condition, shipping overseas, shop review count, sale end time 

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Item = (props) => {
  const {itemId} = useParams()
  const [item, setItem] = useState(null)
  const location = useLocation()
  const {state : {platform}} = location
  let images = []
  const [toggler, setToggler] = useState(false);

  useEffect(() => {

    const fetchData = async() => {
      let itm = await getItemById(platform, itemId)
      setItem(itm)
    }
    
    fetchData()
    return () => {}
  }, [itemId])


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
              <SwiperSlide key={index}><img src={img}/></SwiperSlide>
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
          <h5 className={styles['description']}>
            {item?.description}
          </h5>
        </div>
      </div>
      <div className={styles['middle']}>
        <div className={styles['middle-left']}>
          <div className={styles['price']}>
            <h5>Price: </h5>
            <h6>{item?.price}</h6>
          </div>
          <div className={styles['currency']}>
            <h5>Currency: </h5>
            <h6>{item?.currency}</h6>
          </div>
          <div className={styles['availablity']}>
            <h5>Availability: </h5>
            <h6>{item?.availability}</h6>
          </div>
          <div className={styles['shopname']}>
            <h5>Shop Name: </h5>
            <h6>{item?.shop_name}</h6>  
          </div>
          <div className={styles['reviewCount']}>
            <h5>Review Count: </h5>
            <h6>{item?.review_count}</h6>
          </div>
          <div className={styles['reviewAverage']}>
            <h5>Review Average: </h5>
            <h6>{item?.review_average}</h6>
          </div>
          <div className={styles['brand']}>
            <h5>Brand: </h5>
            <h6>{item?.brand}</h6>
          </div>
        </div>
        <div className={styles['middle-right']}>
          <div className={styles['condition']}>
            <h5>Condition: </h5>
            <h6>{item?.condition}</h6>
          </div>
          <div className={styles['shippingOverseas']}>
            <h5>Shipping Overseas: </h5>
            <h6>{item?.shipping_overseas}</h6>
          </div>
          <div className={styles['shopReviewCount']}>
            <h5>Shop Review Count: </h5>
            <h6>{item?.shop_review_count}</h6>
          </div>
          <div className={styles['saleEndTime']}>
            <h5>Sale End Time: </h5>
            <h6>{item?.sale_end_time}</h6>
          </div>
        </div>
      </div>
      <div className={styles['bottom']}>
              {/* shop url , item url */}
      </div>
    </div>
  )
}
// price, currency, availability, shopname, review count, review average, brand

// condition, shipping overseas, shop review count, sale end time 

export default Item