import React, { useRef, useState, } from 'react'

export const FileInput = ({ uploadFn }) => {

  const fileRef = useRef(null)
  const [chosenFile, setChosenFile] = useState(null)

  const addFile = () => {
    fileRef.current.click()
    // console.log(fileRef.current)
  }

  const putFile = (e) => {
    e.preventDefault()
    setChosenFile(e.target.files[0])
  }

  return (
    <div>
      <input type="file" ref={fileRef} onChange={e => putFile(e)} className="hidden" />
      <button onClick={addFile} className="bg-green-400 px-2 py-1 text-sm rounded m-1 text-white" >Change logo</button>
      {
        chosenFile &&
        <div>
          <p>{chosenFile.name}</p>
          <button className="p-1 focus:outline-none" onClick={() => uploadFn(chosenFile)}>
            <svg className="w-6 h-6 fill-current text-green-500 hover:text-green-600" viewBox="0 0 24 24">
              <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
            </svg>
          </button>
          <button className="p-1 focus:outline-none" onClick={() => {setChosenFile(null)}}>
            <svg className="w-6 h-6 fill-current text-red-600 hover:text-red-700" viewBox="0 0 24 24">
              <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z" />
            </svg>
          </button>
        </div>
      }
    </div>
  )
}