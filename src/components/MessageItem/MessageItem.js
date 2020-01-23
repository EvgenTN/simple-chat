import React from 'react'
import style from './MessageItem.module.scss'

export const MessageItem = ({message}) => {

  const formatedDate = () => {
    return new Date(message.createdAt.seconds * 1000).toISOString().slice(0, -8).replace('T', ' ')
  }

  return (
    <div className={style.message} >
      <h5 className={style['user-name']}>{message.userName}</h5>
      <p>{message.text}</p>
      <p  className={style.time}>
        <small>{formatedDate()}</small>
      </p>
    </div>
  )
}