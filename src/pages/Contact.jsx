// react packages etc
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

// firebase services
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

// misc packages and libraries
import { toast } from 'react-toastify'

const Contact = () => {
  const [message, setMessage] = useState('')
  const [landlord, setLandlord] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useParams()

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, 'users', params.landlordId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log(docSnap.data())
        setLandlord(docSnap.data())
      } else {
        toast.error('Could not find landlord details')
      }
    }
    getLandlord()
  }, [params.landlordId])

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Contact Landlord</p>
      </header>
      {landlord !== null && (
        <main>
          <div className='contactLandlord'>
            <p className='landloardName'>Contact {landlord?.name}</p>
          </div>
          <form action='' className='messageForm'>
            <div className='messageDiv'>
              <label htmlFor='message' className='messageLabel'>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                className='textarea'
                value={message}
                onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                'listingName'
              )}&Body=${message}`}>
              <button type='button' className='primaryButton'>
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}

export default Contact
