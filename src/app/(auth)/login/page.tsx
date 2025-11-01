import React from 'react'
import { LoginForm } from './components/LoginForm'

const LoginPage = () => {
  return (
    <div className="flex justify-center">
        <div className='z-10 pt-20'>
            <LoginForm/>    
        </div>
    </div>
  )
}

export default LoginPage