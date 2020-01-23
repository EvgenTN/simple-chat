import React from 'react';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { AuthForm } from '../AuthForm/AuthForm';
import { GroupsList } from '../GroupsList/GroupsList';
import { MessageBoard } from '../MessageBoard/MessageBoard';
import { NewMessage } from '../NewMessage/NewMessage';

function LoginPage() {

  return (
    <div className="Login-page">
      <AuthForm />

      <hr></hr>

      <RegisterForm />

      <GroupsList />
      <MessageBoard />
      <NewMessage />
    </div>
  )
}

export default LoginPage;