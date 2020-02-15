import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import { FirebaseContext } from './firebaseContext'

export const FirebaseState = ({ children }) => {
  // ------------------------------ Пока пусть тут побудет -------------------------

  const [isShowNewGroupModal, setIsShowNewGroupModal] = useState(false);
  const [isShowNewFriendModal, setIsShowNewFriendModal] = useState(false);
  const [isShowSettingsModal, setIsShowSettingsModal] = useState(false);

  const toggleModal = (modal, value) => {
    switch (modal) {
      case ('newGroup'):
        setIsShowNewGroupModal(value);
        break
      case ('settings'):
        setIsShowSettingsModal(value);
        break
      case ('friend'):
        setIsShowNewFriendModal(value);
        break
      default:
        break
    }
  }

  // const toggleModal = () => {
  //   setIsShowNewGroupModal(!isShowNewGroupModal)
  // }

  const createKeywords = (name) => {
    const arrName = [];
    let curName = '';
    name.split('').forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    })
    if (arrName.length > 15) {
      arrName.length = 15
    }
    return arrName
  }

  // -------------------------------------------------------------------------------

  const [currentUser, setCurrentUser] = useState(null);
  const [docUserId, setDocUserId] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [groupIdList, setGroupIdList] = useState([]);
  const [contactIdList, setContactIdList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [searchContactList, setSearchContactList] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [potencialFriends, setPotencialFriends] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setCurrentUser);
    return () => unsubscribe()
  }, [currentUser]);

  function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL || '/images/placeholder-image.png';
  }

  const signIn = async ({ email, password }) => {
    await firebase.auth().signInWithEmailAndPassword(email, password)
  }

  const signUp = async ({ email, password, name }) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    const user = firebase.auth().currentUser;
    await user.updateProfile({
      displayName: name
    })
    await firebase
      .firestore()
      .collection('users')
      .add({
        email,
        name,
        searchKeywords: createKeywords(name),
        groupIdList: [],
        contactIdList: [],
        logo: null,
        background: null,
        language: null
      })
  }

  const signOut = () => {
    firebase.auth().signOut()
  }

  const selectChat = (payload) => {
    setCurrentChat(payload)
  }

  const findContacts = (searchValue) => {
    if (!searchValue) {
      setSearchContactList(null)
      return;
    };
    const filteredContacts = contactList.filter(contact => {
      const targetName = contact.uid1 === docUserId ? contact.uName2 : contact.uName1
      return targetName.includes(searchValue)
    })
    setSearchContactList(filteredContacts)
  }

  const loadSearchResult = (searchValue, collection) => {
    if (!searchValue) {
      setSearchResult(null)
      setPotencialFriends(null)
      return;
    };
    if (collection === 'groups') setSearchResult([])
    if (collection === 'users') setPotencialFriends([])
    firebase.firestore().collection(collection).where('searchKeywords', 'array-contains', searchValue)
      .onSnapshot(snapShot => {
        const result = [];
        if (snapShot.empty) return;
        snapShot.docs.forEach(doc => {
          result.push({
            id: doc.id,
            ...doc.data()
          })
        })
        if (collection === 'groups') setSearchResult(result);
        if (collection === 'users') setPotencialFriends(result);
      })
  }

  const loadChatList = (user) => {
    setGroupList([])
    setContactList([])
    setMessages([])
    setCurrentChat({})
    setSearchResult(null)
    firebase.firestore().collection('users').where('email', '==', user.email)
      .onSnapshot(snapShot => {
        if (!snapShot.docs.length) return;
        setGroupIdList(snapShot.docs[0].data().groupIdList)
        setContactIdList(snapShot.docs[0].data().contactIdList)
        setDocUserId(snapShot.docs[0].id)
        snapShot.docs[0].data().contactIdList.forEach(i => {
          firebase.firestore().collection('contacts').doc(i).onSnapshot({
            includeMetadataChanges: false
          }, doc => {
            const payload = {
              id: doc.id,
              ...doc.data()
            }
            setContactList(prevState => {
              const chatIndex = prevState.findIndex(chat => chat.id === payload.id)
              if (~chatIndex) {
                prevState[chatIndex] = payload
                return [...prevState]
              } else {
                prevState.push(payload)
                return [...prevState]
              }
            })
          })
        })
        snapShot.docs[0].data().groupIdList.forEach(i => {
          firebase.firestore().collection('groups').doc(i).onSnapshot({
            includeMetadataChanges: false
          }, doc => {
            const payload = {
              id: doc.id,
              ...doc.data()
            }
            setGroupList(prevState => {
              const chatIndex = prevState.findIndex(chat => chat.id === payload.id)
              if (~chatIndex) {
                prevState[chatIndex] = payload
                return [...prevState]
              } else {
                prevState.push(payload)
                return [...prevState]
              }
            })
          })
        })
      })
  }

  const addNewGroup = async (name) => {
    let createdGroupId;
    firebase
      .firestore()
      .collection('groups')
      .add({
        name,
        lastMessage: '',
        lastMessageCreatedAt: null,
        searchKeywords: createKeywords(name),
        logo: null,
        creatorId: docUserId
      })
      .then(doc => createdGroupId = doc.id)
      .then(() => {
        firebase
          .firestore()
          .collection('users')
          .doc(docUserId)
          .update({
            groupIdList: [...groupIdList, createdGroupId]
          })
      })
  }

  const addContact = async (friend) => {
    let createdChatId;
    firebase
      .firestore()
      .collection('contacts')
      .add({
        uName1: currentUser.displayName,
        uName2: friend.name,
        uid1: docUserId,
        uid2: friend.id,
        logo1: currentUser.photoURL,
        logo2: friend.logo,
        lastMessage: '',
        lastMessageCreatedAt: null,
      })
      .then(doc => createdChatId = doc.id)
      .then(() => {
        firebase
          .firestore()
          .collection('users')
          .doc(docUserId)
          .update({
            contactIdList: [...contactIdList, createdChatId]
          })
        firebase
          .firestore()
          .collection('users')
          .doc(friend.id)
          .update({
            contactIdList: [...contactIdList, createdChatId]
          })
      })
  }

  const addGroupToList = (id) => {
    firebase
      .firestore()
      .collection('users')
      .doc(docUserId)
      .update({
        groupIdList: [...groupIdList, id]
      })
  }

  const fetchMessages = (chatId) => {
    firebase.firestore().collection('messages').where('chatId', '==', chatId).orderBy('createdAt', 'asc')
      .onSnapshot(function (querySnapshot) {
        const payload = []
        querySnapshot.forEach(function (doc) {
          payload.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setMessages(payload)
      });
  }

  const addMessage = async ({ text, chatId, userId, userName, colName }) => {
    firebase
      .firestore()
      .collection('messages')
      .add({
        createdAt: new Date(),
        text,
        chatId,
        userId,
        userName
      })
    firebase
      .firestore()
      .collection(colName)
      .doc(chatId)
      .update({
        lastMessageCreatedAt: new Date(),
        lastMessage: text
      })
  }

  return (
    <FirebaseContext.Provider value={{
      currentUser, searchResult, potencialFriends, searchContactList,
      addNewGroup, addGroupToList, addContact, loadChatList, fetchMessages, selectChat, addMessage, signIn, signOut, signUp, loadSearchResult,
      findContacts,
      groupList,
      contactList,
      groupIdList,
      docUserId,
      messages,
      currentChat,

      isShowNewGroupModal,
      isShowSettingsModal,
      isShowNewFriendModal,
      toggleModal
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}

