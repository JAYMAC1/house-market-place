import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Reset email was sent')
    } catch (error) {
      toast.error('Could not send rest email')
    }
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Forgot Password</p>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={handleChange}
          />
          <Link to='/sign-in' className='forgotPasswordlink'>
            Sign In
          </Link>
          <div className='signInBar'>
            <div className='signInTtext'>Send Reset Link</div>
            <button className='signInButton'>
              <ArrowRightIcon fill='#fffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
