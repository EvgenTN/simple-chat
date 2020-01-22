import React from 'react'
import style from './MessageItem.module.scss'

export const MessageItem = ({message}) => {

  return (
    <div className={style.message} >
      {message.text}
    </div>
  )
}