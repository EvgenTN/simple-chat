import React, { useContext } from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const SearchResultList = () => {
  const {searchResult} = useContext(FirebaseContext)

  return (
    <div className="bg-green-100">
      {searchResult && searchResult.map(result => (
        <p key={result.id}>{result.name}</p>
      ))}
    </div>
  )
}