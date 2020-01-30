import React, { useContext, useEffect, useRef } from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'

function useOutsideAlerter(ref) {

  const { toggleNewGroupModal } = useContext(FirebaseContext)
  
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      toggleNewGroupModal('newGroup', false)
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

export const NewGroupModal = () => {

  const { isShowNewGroupModal, toggleNewGroupModal } = useContext(FirebaseContext)

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);


  if (!isShowNewGroupModal) {
    return null
  }

  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

        <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
          <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
        </div>

        {/* Add margin if you want to see some of the overlay behind the modal */}
        <div ref={wrapperRef} className="modal-content py-4 text-left px-6">

          <label htmlFor="name" className="text-sm block font-bold  pt-2">New group name</label>
          <input type="text" name="name" className="appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400"/>

          <div className="flex justify-end pt-2">
            <button className="bg-blue-900 block h-10 hover:bg-white text-white font-semibold hover:text-blue-900 py-2 px-4 border border-blue-900 hover:border-blue-900 rounded">
              Add group
            </button>
            <button onClick={() => toggleNewGroupModal('newGroup', false)} className="px-4 bg-transparent p-3 rounded-lg text-blue-900 hover:bg-gray-100 hover:text-blue-700">Close</button>
          </div>

        </div>
      </div>
    </div>
  )
}