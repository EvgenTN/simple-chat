import React, { useContext, useEffect, useState } from "react"
import { FirebaseContext } from "../context/firebase/firebaseContext"
import defaultLogo from '../assets/logo192.png'

export const ChatList = () => {
  const { currentUser, groupList, contactList, fetchMessages, docUserId, loadChatList, selectChat, currentChat } = useContext(FirebaseContext)
  const [chatList, setChatList] = useState([])

  const collectChats = () => {
    const colList = contactList.concat(groupList)
    colList.sort((a, b) => b.lastMessageCreatedAt.seconds - a.lastMessageCreatedAt.seconds)
    setChatList(colList)
  }

  useEffect(() => {
    loadChatList(currentUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  useEffect(() => {
    collectChats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupList, contactList])


  const selectChatFromList = (id) => {
    fetchMessages(id)
    selectChat(chatList.find(chat => chat.id === id))
  }

  const getOpponentName = (user) => {
    if (user.uName1 === user.uName2) return user.uid1 === docUserId ? user.uName2 : user.uName1;
    return user.uName1 === currentUser.displayName ? user.uName2 : user.uName1
  }

  const chatName = (item) => {
    if (!item.uName1) return item.name;
    return getOpponentName(item)
  }

  return (
    <div className="px-2">
      {
        chatList.map(i => {
          return (
            <div className={`flex items-center cursor-pointer hover:bg-gray-200 justify-start ${currentChat.id === i.id ? 'bg-gray-200' : ''}`} key={i.id} onClick={() => selectChatFromList(i.id)}>
              <img className="w-1/6 h-10 rounded-full" src={defaultLogo} alt="ava" />
              <div className="text-sm w-5/6">
                <p className="text-gray-900 pl-1 truncate">{chatName(i)}</p>
                <p className="text-gray-600 pl-1 truncate">{i.lastMessage}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
