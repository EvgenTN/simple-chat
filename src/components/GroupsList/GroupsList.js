import React, { useContext, useEffect } from "react"
import { FirebaseContext } from "../../context/firebase/firebaseContext"

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
    <div className="group-list">
      {
        groupsList.map(i => {
          return (
            <p key={i.id} onClick={() => selectGroupFromList(i.id)}>{i.name}</p>
          )
        })
      }
    </div>
  )
}
