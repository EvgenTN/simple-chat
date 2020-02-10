import React, { useContext, useRef } from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { useOutsideListener } from '../services/useOutsideListener'

export const NewFriendModal = () => {

  const { isShowNewFriendModal, toggleModal, loadSearchResult, potencialFriends } = useContext(FirebaseContext)
  
  const wrapRef = useRef(null);
  useOutsideListener(wrapRef, 'friend');

  if (!isShowNewFriendModal) {
    return null
  }

  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

        {/* Add margin if you want to see some of the overlay behind the modal */}
        <div ref={wrapRef} className="modal-content py-4 text-left px-6">

          <label htmlFor="name" className="text-sm block font-bold  pt-2">Add friend</label>
          <input type="text" placeholder="Find friend..." autoFocus name="name" onChange={(e) => loadSearchResult(e.target.value, 'users')} className="appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 hover:border-gray-700 border-gray-400"/>

          {
            potencialFriends && potencialFriends.map(item => (
              <div>{ item.name }
              
                <button>Add friend</button>
              </div>
            ))
          }
          {/* <div className="flex justify-end h-8 mt-2">
            <button className="bg-blue-900 inlene-block text-sm leading-none hover:bg-gray-700 text-white py-2 px-4 mr-2 focus:outline-none border border-blue-900 hover:border-gray-800 rounded">
              Confirm
            </button>
            <button onClick={() => toggleModal('settings', false)} className="px-4 bg-transparent leading-none text-sm py-2 focus:outline-none rounded text-blue-900 hover:bg-gray-300 hover:text-gray-800">Close</button>
          </div> */}

        </div>
      </div>
    </div>
  )
}