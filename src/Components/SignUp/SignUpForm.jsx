import React from 'react'
import { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import Button from '../Button/Button'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/Firebase'
import './SignUpForm.style.scss'

const defaultFformField = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formField, setFormFields] = useState(defaultFformField)
  const { displayName, email, password, confirmPassword } = formField

  const resetFormFields = () => {
    setFormFields(defaultFformField)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert('passwords do not match')
      return
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
    } catch (error) {
      if ((error.code = 'auth/email-already-in-use')) {
        alert('Cannot create user. Email is already in use')
      }
      console.log('user creation encountered an error', error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formField, [name]: value })
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
