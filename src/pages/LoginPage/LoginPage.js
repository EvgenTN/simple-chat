import React from 'react';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { AuthForm } from '../../components/AuthForm/AuthForm';

export const LoginPage = () => {

  return (
    <div className="Login-page">

      <AuthForm />

      <hr></hr>

      <RegisterForm />
      
    </div>
  )
}