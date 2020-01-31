import React, { useContext } from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const Search = () => {

  const {loadSearchResult} = useContext(FirebaseContext);

  return (
    <div className="m-4">
      <input placeholder="Search..."  onChange={e => loadSearchResult(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 hover:border-gray-700 border-gray-400" />
    </div>
  )
}