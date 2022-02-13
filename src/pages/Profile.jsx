import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
const Profile = () => {
  const [user, setUser] = useState(null)
  const auth = getAuth()
  useEffect(() => {
    setUser(auth.currentUser)
  }, [])
  console.log(user)
  return (
    <div>
      {user ? <h1>Welcome, {user.displayName}</h1> : <h1>Not logged In</h1>}
    </div>
  )
}

export default Profile
