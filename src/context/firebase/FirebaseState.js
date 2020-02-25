import React, { useEffect, useState } from 'react'
import firebase, { storage } from '../../firebase'
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

  const db = (collection) => firebase.firestore().collection(collection);

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

  const signIn = async ({ email, password }) => {
    try {
      const resp = await firebase.auth().signInWithEmailAndPassword(email, password)
      console.log(resp)
    }
    catch (e) {
      console.log('e', e)
    }
  }

  const signUp = async ({ email, password, name }) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    const user = firebase.auth().currentUser;
    await user.updateProfile({
      displayName: name
    })
    const docRef = await db('publicUsers')
      .add({
        name,
        logo: null,
      })
    await db('users')
      .doc(docRef.id)
      .set({
        email,
        name,
        logo: null,
        searchKeywords: createKeywords(name),
        groupIdList: [],
        contactIdList: [],
        background: null,
        language: null
      })
  }

  const signOut = async () => {
    await firebase.auth().signOut()
    setPotencialFriends(null)
    setSearchResult(null)
    setSearchContactList(null)
  }

  const selectChat = (payload) => {
    if (!payload) setCurrentChat({});
    setCurrentChat(payload)
  }

  const findContacts = (searchValue) => {
    if (!searchValue) {
      setSearchContactList(null)
      return;
    };
    const filteredContacts = contactList.filter(contact => {
      return contact.name.includes(searchValue)
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
    db(collection).where('searchKeywords', 'array-contains', searchValue)
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
    db('users').where('email', '==', user.email)
      .onSnapshot(snapShot => {
        if (!snapShot.docs.length) return;
        setGroupIdList(snapShot.docs[0].data().groupIdList)
        setContactIdList(snapShot.docs[0].data().contactIdList)
        setDocUserId(snapShot.docs[0].id)
        snapShot.docs[0].data().contactIdList.forEach(i => {
          db('contacts').doc(i).onSnapshot(async doc => {
            let refObj
            if (doc.data()['uid1'].id === snapShot.docs[0].id) {
              refObj = await doc.data()['uid2'].get()
            } else {
              refObj = await doc.data()['uid1'].get()
            }            
            const payload = {
              id: doc.id,
              name: refObj.data()['name'],
              logo: refObj.data()['logo'],
              uid: refObj.id,
              isContact: true,
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
          db('groups').doc(i).onSnapshot(doc => {
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
    db('groups')
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
        db('users')
          .doc(docUserId)
          .update({
            groupIdList: [...groupIdList, createdGroupId]
          })
      })
  }

  const addContact = async (friend) => {
    const doc = await db('contacts').add({
      uid1: db('publicUsers').doc(docUserId),
      uid2: db('publicUsers').doc(friend.id),
      lastMessage: '',
      lastMessageCreatedAt: null,
    })
    db('users')
      .doc(docUserId)
      .update({
        contactIdList: firebase.firestore.FieldValue.arrayUnion(doc.id)
      })
    db('users')
      .doc(friend.id)
      .update({
        contactIdList: firebase.firestore.FieldValue.arrayUnion(doc.id)
      })
  }

  const addGroupToList = (id) => {
    db('users')
      .doc(docUserId)
      .update({
        groupIdList: [...groupIdList, id]
      })
  }

  const fetchMessages = (chatId) => {
    db('messages').where('chatId', '==', chatId).orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        const payload = []
        querySnapshot.forEach(doc => {
          payload.push({
            id: doc.id,
            ...doc.data()
          });
        })
        setMessages(payload)
      });
  }

  const addMessage = async ({ text, chatId, userId, userName, colName }) => {
    db('messages')
      .add({
        createdAt: new Date(),
        text,
        userName,
        userLogo: firebase.auth().currentUser.photoURL,
        userId,
        chatId,
      })
    db(colName)
      .doc(chatId)
      .update({
        lastMessageCreatedAt: new Date(),
        lastMessage: text
      })
  }

  const uploadGroupLogo = async (file) => {
    try {
      let oldLogoRef
      if (currentChat.logo) {
        oldLogoRef = storage.refFromURL(currentChat.logo)
      }
      let filePath = 'groups/' + currentChat.id + '/' + file.name;
      const snapshot = await storage.ref(filePath).put(file)
      const url = await snapshot.ref.getDownloadURL()
      await db('groups').doc(currentChat.id).update({ logo: url })
      if (oldLogoRef) {
        oldLogoRef.delete()
      }
    }
    catch (e) {
      console.log('error', e)
    }
  }

  const uploadLogo = async (file) => {
    try {
      const oldLogoRef = currentUser.photoURL ? storage.refFromURL(firebase.auth().currentUser.photoURL) : null
      let filePath = 'users/' + docUserId + '/' + file.name
      const snapshot = await storage.ref(filePath).put(file)
      const url = await snapshot.ref.getDownloadURL()
      await currentUser.updateProfile({ photoURL: url })
      await db('publicUsers').doc(docUserId).update({ logo: url })
      await db('users').doc(docUserId).update({ logo: url })
      await db('messages').where('userId', '==', docUserId).get().then(userMessages => {
        userMessages.docs.forEach(doc => {
          doc.ref.update({
            userLogo: url
          })
        })
      })
      if (oldLogoRef) oldLogoRef.delete();
    }
    catch (e) {
      console.log('error', e)
    }
  }

  const changeDisplayName = async (name) => {
    await currentUser.updateProfile({
      displayName: name
    })
    db('publicUsers').doc(docUserId).update({
      name,
    })
    db('users').doc(docUserId).update({
      name,
    })
    db('messages').where('userId', '==', docUserId).get().then(userMessages => {
      userMessages.docs.forEach(doc => {
        doc.ref.update({
          userName: name
        })
      })
    })
  }

  const changeUserPassword = (newPass) => {
    currentUser.updatePassword(newPass).then(() => {
      alert('password updated!')
    }).catch(e => alert(e))
  }

  const sendCodeToResetPassword = (email) => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(function () {
        // Password reset email sent.
      })
      .catch(function (error) {
        // Error occurred. Inspect error.code.
      });
  }

  const changePasswordAfterReset = (resetCode, newPass) => {
    firebase.auth().confirmPasswordReset(resetCode, newPass)
      .then(() => {
        // Password resets successfully.
      })
      .catch((e) => {
        // Error occurred. Inspect error.code.
      });
  }

  const deleteUser = () => {
    currentUser.delete()
      .then(() => {
        // no more user
      })
      .catch((e) => {
        // are you immortal???
      })
  }

  return (
    <FirebaseContext.Provider value={{
      currentUser, searchResult, potencialFriends, searchContactList,
      addNewGroup, addGroupToList, addContact, loadChatList, fetchMessages, selectChat, addMessage, signIn, signOut, signUp, loadSearchResult,
      findContacts,
      uploadGroupLogo,
      uploadLogo,
      changeDisplayName,
      changeUserPassword,
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

