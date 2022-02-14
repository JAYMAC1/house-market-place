import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
const Profile = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const handleClick = () => {
    auth.signOut()
    navigate('/')
  }
  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={handleClick}>
          Log Out
        </button>
      </header>
    </div>
  )
}

export default Profile
