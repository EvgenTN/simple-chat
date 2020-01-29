import React, { useContext, useEffect } from "react"
import { FirebaseContext } from "../context/firebase/firebaseContext"
import defaultLogo from '../assets/logo192.png'

export const GroupsList = () => {
  const { currentUser, groupsList, fetchMessages, loadGroupList, selectGroup } = useContext(FirebaseContext)

  useEffect(() => {
    loadGroupList(currentUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log('groupsList', groupsList)

  const selectGroupFromList = (id) => {
    fetchMessages(id)
    selectGroup(groupsList.find(group => group.id === id))
  }

  return (
    <div>
      {
        groupsList.map(i => {
          return (
            <div className="flex items-center" key={i.id} onClick={() => selectGroupFromList(i.id)}>
              <img className="w-10 h-10 rounded-full mr-4" src={defaultLogo} alt="ava" />
              <div className="text-sm">
                <p className="text-gray-900 leading-none">{i.name}</p>
                <p className="text-gray-600">{i.lastMessage}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
