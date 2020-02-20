import React, { useContext, useRef, useState, useEffect } from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { useOutsideListener } from '../services/useOutsideListener'
import userPlaceholder from '../assets/user-placeholder.png'

export const NewFriendModal = () => {

  const { isShowNewFriendModal, toggleModal, docUserId, loadSearchResult, contactList, addContact, potencialFriends } = useContext(FirebaseContext)

  const [modifiedPotFriends, setModifiedPotFriends] = useState([])

  const wrapRef = useRef(null);
  useOutsideListener(wrapRef, 'friend');

  const filterPotFriends = () => {
    setModifiedPotFriends([])
    if (!potencialFriends) return;

    const potIds = contactList.map(contact => contact.uid)
    potIds.push(docUserId)
    const idSet = new Set(potIds)
    const modifiedList = potencialFriends.filter(friend => !idSet.has(friend.id))
    setModifiedPotFriends(modifiedList)
  }

  useEffect(() => {
    filterPotFriends()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [potencialFriends, contactList])
  
  if (!isShowNewFriendModal) {
    return null
  }

  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

        {/* Add margin if you want to see some of the overlay behind the modal */}
        <div ref={wrapRef} className="modal-content py-4 text-left px-6">

          <label htmlFor="name" className="text-sm block font-bold  pt-2 pb-1">Add friend</label>
          <input type="text" autoComplete="off" placeholder="Find friend..." autoFocus name="name" onChange={(e) => loadSearchResult(e.target.value, 'users')} className="appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 hover:border-gray-700 border-gray-400" />

          {
            modifiedPotFriends.map(item => (
              <div className="flex justify-between" key={item.id}>
                <div className="flex items-center flex-1" key={item.id}>
                  <div className="w-1/6">
                    <img className="w-8 h-8 rounded-full" src={item.logo ? item.logo : userPlaceholder} alt="ava" />
                  </div>
                  <div className="text-sm w-5/6">
                    <p className="text-gray-900 pl-1 truncate">{item.name}</p>
                  </div>
                </div>

                <button onClick={() => addContact(item)} className="inlene-block text-sm leading-none hover:bg-gray-100 text-white py-2 px-2 mr-2 focus:outline-none hover:border-gray-100 rounded-full">
                  <svg className="w-6 h-6 fill-current text-blue-900" viewBox="0 0 24 24">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                  </svg>
                </button>
              </div>
            ))
          }
          <div className="flex justify-end h-8 mt-2">
            <button onClick={() => toggleModal('friend', false)} className="px-4 bg-transparent leading-none text-sm py-2 focus:outline-none rounded text-blue-900 hover:bg-gray-300 hover:text-gray-800">Close</button>
          </div>

        </div>
      </div>
    </div>
  )
}