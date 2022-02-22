//  react packages
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// firebase services
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/config'

// misc packages
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Spinner from './Spinner'
// import { setLogLevel } from 'firebase/app'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const Slider = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
      const quesrySnap = await getDocs(q)

      const listings = []

      quesrySnap.forEach((doc) => {
        return listings.push({ id: doc.id, data: doc.data() })
      })
      setListings(listings)
      setIsLoading(false)
    }
    fetchListings()
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (listings.length === 0) {
    return <></>
  }
  return (
    listings && (
      <>
        <p className='exploreHeading'>Featured</p>
        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}>
              <div
                style={{
                  background: `url(${data.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='swiperSlideDiv'>
                <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  £{data.discountedPrice ?? data.regularPrice}
                  {data.type === 'rent' && ' / month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  )
}

export default Slider
