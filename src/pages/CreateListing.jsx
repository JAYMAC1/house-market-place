// react packages
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// firebase services
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// misc components
import Spinner from '../components/Spinner'

const CreateListing = () => {
  // component level state
  const [geoLocationEnabled, setGeoLocationEnabled] = useState(true)
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  })

  // enable Auth
  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid })
        }
      })
    }
    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return <div>CreateListing</div>
}

export default CreateListing
