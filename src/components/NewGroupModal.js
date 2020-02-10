import React, { useContext, useState, useRef } from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { useOutsideListener } from '../services/useOutsideListener'

// function useOutsideAlerter(ref) {

//   const { toggleModal } = useContext(FirebaseContext)
  
//   function handleClickOutside(event) {
//     if (ref.current && !ref.current.contains(event.target)) {
//       toggleModal('newGroup', false)
//     }
//   }

//   useEffect(() => {
//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   });
// }

export const NewGroupModal = () => {

  const { isShowNewGroupModal, toggleModal, addNewGroup } = useContext(FirebaseContext)
  const [value, setValue] = useState('')

  
  const wrapperRef = useRef(null);
  useOutsideListener(wrapperRef, 'newGroup');

  if (!isShowNewGroupModal) {
    return null
  }

  const addGroup = () => {
    addNewGroup(value).then(() => {
      setValue('')
      toggleModal('newGroup', false)
    })
  }

  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

        {/* Add margin if you want to see some of the overlay behind the modal */}
        <div ref={wrapperRef} className="modal-content py-4 text-left px-6">

          <label htmlFor="name" className="text-sm block font-bold  pt-2">New group name</label>
          <input type="text" autoFocus name="name" value={value} onChange={(e) => setValue(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 hover:border-gray-700 border-gray-400"/>

          <div className="flex justify-end h-8 mt-2">
            <button onClick={addGroup} className="bg-blue-900 inlene-block text-sm leading-none hover:bg-gray-700 text-white py-2 px-4 mr-2 focus:outline-none border border-blue-900 hover:border-gray-800 rounded">
              Add group
            </button>
            <button onClick={() => toggleModal('newGroup', false)} className="px-4 bg-transparent leading-none text-sm py-2 focus:outline-none rounded text-blue-900 hover:bg-gray-300 hover:text-gray-800">Close</button>
          </div>

        </div>
      </div>
    </div>
  )
}