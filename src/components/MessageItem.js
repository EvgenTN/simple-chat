import React from 'react'

export const MessageItem = ({ message }) => {

  const formatedDate = () => {
    return new Date(message.createdAt.seconds * 1000).toISOString().slice(0, -8).replace('T', ' ')
  }

  return (
    <div className="relative bg-white rounded border p-4 m-4 max-w-md">
      <h3 className="flex justify-between items-center text-lg mb-2 font-bold">
        <p className="stretched-link" title="Card 6">
          {message.userName}
        </p>
        <p className="text-sm text-gray-600">{formatedDate()}</p>
      </h3>
      <p>
        {message.text}
      </p>
    </div>
  )
}