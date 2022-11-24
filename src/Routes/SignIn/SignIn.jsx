import React from 'react'
import {
  createUserDocumentFromAuth,
  signInWithGoodlePopup,
} from '../../utils/firebase/Firebase'

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGoodlePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
  }
  return (
    <div>
      <h1>Sign In page</h1>
      <button onClick={logGoogleUser}>Sign In with Google Popup</button>
    </div>
  )
}

export default SignIn
