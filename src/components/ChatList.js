import React, { useContext, useEffect, useState } from "react"
import { FirebaseContext } from "../context/firebase/firebaseContext"
import defaultLogo from '../assets/logo192.png'

export const ChatList = () => {
  const { currentUser, groupList, contactList, fetchMessages, docUserId, loadChatList, selectChat, currentChat } = useContext(FirebaseContext)
  const [chatList, setChatList] = useState([])

  const collectChats = () => {
    const colList = contactList.concat(groupList)
    colList.sort((a, b) => b.lastMessageCreatedAt?.seconds - a.lastMessageCreatedAt?.seconds)
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

  const getOpponentLogo = (user) => {
    if (user.uName1 === user.uName2) return user.uid1 === docUserId ? user.logo2 : user.logo1;
    return user.uName1 === currentUser.displayName ? user.logo2 : user.logo1
  }

  const chatLogo = (item) => {
    console.log(item)
    if (!item.uName1) return item.logo;
    return getOpponentLogo(item)
  }

  return (
    <div className="px-2">
      {
        chatList.map(i => {
          return (
            <div className={`flex items-center cursor-pointer hover:bg-gray-200 justify-start ${currentChat.id === i.id ? 'bg-gray-200' : ''}`} key={i.id} onClick={() => selectChatFromList(i.id)}>
              <div className="w-1/6 h-10 rounded-full border border-gray-400 flex justify-center items-center">
                {
                  chatLogo(i) ?
                    <img className="w-8 h-8 rounded-full" src={chatLogo(i)} alt="" /> :
                    <svg className="w-8 h-8 rounded-full" viewBox="0 0 24 24">
                      <path d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z" />
                    </svg>
                }
              </div>
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
