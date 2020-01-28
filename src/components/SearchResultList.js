import React, { useContext } from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const SearchResultList = () => {
  const {searchResult} = useContext(FirebaseContext)

  return (
    <div>
      {searchResult.map(result => (
        <p key={result.id}>result.name</p>
      ))}
    </div>
  )
}