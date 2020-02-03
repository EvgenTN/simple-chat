import { useContext, useEffect } from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'

export function useOutsideListener(ref, modalType) {

  const { toggleModal } = useContext(FirebaseContext)
  
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      toggleModal(modalType, false)
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