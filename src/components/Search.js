import React, { useContext } from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const Search = () => {

  const {loadSearchResult, findContacts} = useContext(FirebaseContext);

  const findChat = (value) => {
    findContacts(value);
    loadSearchResult(value, 'groups')
  }

  return (
    <div className="m-4">
      <input placeholder="Search..."  onChange={e => findChat(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 hover:border-gray-700 border-gray-400" />
    </div>
  )
}