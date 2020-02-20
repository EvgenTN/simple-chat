import React, { useContext, useState, useRef } from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { useOutsideListener } from '../services/useOutsideListener'
import { FileInput } from './FileInput'

export const SettingsModal = () => {

  const { isShowSettingsModal, toggleModal, currentUser, uploadLogo, changeDisplayName } = useContext(FirebaseContext)
  const [value, setValue] = useState('')
  const [nameChange, setNameChange] = useState(false)

  const wrapRef = useRef(null);
  useOutsideListener(wrapRef, 'settings');

  if (!isShowSettingsModal) {
    return null
  }

  const changeName = () => {
    changeDisplayName(value).then(() => {
      setValue('')
      setNameChange(false)
    })
  }

  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-lg mx-auto rounded shadow-lg z-50 overflow-y-auto">

        {/* Add margin if you want to see some of the overlay behind the modal */}
        <div ref={wrapRef} className="modal-content py-4 text-left px-6 text-sm">
          <h2 className="font-bold mb-4 text-xl">Settings</h2>

          <div className="flex mb-2">
            <p className="mr-2 self-center">User name:</p>
            <div className="flex justify-between flex-1">
              <p className="mr-2 self-center">{currentUser.displayName}</p>
              <button className="bg-gray-100 px-2 py-1 text-sm rounded m-1 text-blue-900 border border-gray-400 hover:bg-gray-200" onClick={() => setNameChange(true)}>Change</button>
            </div>
          </div>
          {
            nameChange &&
            <div className="flex mb-2">
              <input type="text" name="name" value={value} onChange={(e) => setValue(e.target.value)} className="appearance-none flex-1 mr-2 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 hover:border-gray-700 border-gray-400" />
              <button className="p-1 focus:outline-none" onClick={changeName}>
                <svg className="w-6 h-6 fill-current text-green-500 hover:text-green-600" viewBox="0 0 24 24">
                  <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                </svg>
              </button>
              <button className="p-1 focus:outline-none" onClick={() => setNameChange(false)}>
                <svg className="w-6 h-6 fill-current text-red-600 hover:text-red-700" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z" />
                </svg>
              </button>
            </div>
          }

          <div className="flex mb-2">
            <p className="mr-2 self-center">Change logo:</p>
            <FileInput uploadFn={uploadLogo} />
          </div>

          <div className="flex justify-end h-8 mt-2">
            <button onClick={() => toggleModal('settings', false)} className="px-4 bg-transparent leading-none text-sm py-2 focus:outline-none rounded text-blue-900 hover:bg-gray-300 hover:text-gray-800">Close</button>
          </div>

        </div>
      </div>
    </div>
  )
}