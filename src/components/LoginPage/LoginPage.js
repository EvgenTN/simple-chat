import React from 'react';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { AuthForm } from '../AuthForm/AuthForm';
import { GroupsList } from '../GroupsList/GroupsList';
import { MessageBoard } from '../MessageBoard/MessageBoard';

function LoginPage() {

  return (
    <div className="Login-page">
      <AuthForm />

      <hr></hr>

      <RegisterForm />

      <GroupsList />
      <MessageBoard />
    </div>
  )
}

export default LoginPage;