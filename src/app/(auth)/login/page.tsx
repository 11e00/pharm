import React from 'react'
import { LoginForm } from './components/LoginForm'
import { WavyBackground } from '@/components/ui/wavy-background'

const LoginPage = () => {
  return (
    <div className="flex justify-center">
        <div className='z-10 pt-25'>
        <LoginForm/>    
        </div>
    </div>
  )
}

export default LoginPage