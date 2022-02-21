// React & React Router Dom packages
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// firebase components
import { getAuth, updateProfile } from 'firebase/auth'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/config'

// Components & Pages
import ListingItem from '../components/ListingItem'

// Misc Packages
import { toast } from 'react-toastify'

// images & svgs
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

const Profile = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [listings, setListings] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, 'listings')
      const q = query(
        listingRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc'),
        limit(10)
      )
      const querySnap = await getDocs(q)

      const listings = []

      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setListings(listings)
      setIsLoading(false)
    }
    fetchUserListings()
  }, [auth.currentUser.uid])

  const handleClick = () => {
    auth.signOut()
    navigate('/')
  }

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update displayName in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
      }

      // update in firestore
      const userRef = doc(db, 'users', auth.currentUser.uid)
      await updateDoc(userRef, {
        name,
      })
    } catch (error) {
      toast.error('Could not update profile Details')
    }
  }

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter((listing) => {
        return listing.id !== listingId
      })
      setListings(updatedListings)
      toast.success('Successfully deleted listing')
    } else {
      return
    }
  }

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={handleClick}>
          Log Out
        </button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}>
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>
        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={handleChange}
            />
            <input
              type='email'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={handleChange}
            />
          </form>
        </div>
        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt='create' />
        </Link>
        {!isLoading && listings?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  )
}

export default Profile
