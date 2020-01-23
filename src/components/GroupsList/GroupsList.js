import { FirebaseContext } from "../../context/firebase/firebaseContext"
import React, { useContext } from "react"

export const GroupsList = () => {
  const { groupsList, fetchMessages, selectGroup } = useContext(FirebaseContext)

  // const groupsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  //   .map(i => { return { id: 'id' + i, name: 'group' + i, lastMessage: 'msg' + i } })

  const selectGroupFromList = (id) => {
    fetchMessages(id)
    selectGroup(groupsList.find(group => group.id === id))
    console.log(id);
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