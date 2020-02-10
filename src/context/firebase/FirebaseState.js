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
  const [groupsList, setGroupsList] = useState([]);
  const [groupsIdList, setGroupsIdList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({});
  const [searchResult, setSearchResult] = useState(null);
  const [potencialFriends, setPotencialFriends] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setCurrentUser);
    return () => unsubscribe()
  }, [currentUser]);

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
        groupIdList: []
      })
  }

  const signOut = () => {
    firebase.auth().signOut()
  }

  const selectGroup = (payload) => {
    setCurrentGroup(payload)
  }

  const loadSearchResult = (searchValue, collection) => {
    if (!searchValue) {
      setSearchResult(null)
      return;
    };
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

  const loadGroupList = (user) => {
    setGroupsList([])
    setMessages([])
    setCurrentGroup({})
    setSearchResult(null)
    firebase.firestore().collection('users').where('email', '==', user.email)
      .onSnapshot(snapShot => {
        if (!snapShot.docs.length) return;
        setGroupsIdList(snapShot.docs[0].data().groupIdList)
        setDocUserId(snapShot.docs[0].id)
        snapShot.docs[0].data().groupIdList.forEach(i => {
          firebase.firestore().collection('groups').doc(i).onSnapshot({
            includeMetadataChanges: false
          }, doc => {
            const payload = {
              id: doc.id,
              ...doc.data()
            }
            setGroupsList(prevState => {
              const groupIndex = prevState.findIndex(group => group.id === payload.id)
              if (~groupIndex) {
                prevState[groupIndex] = payload
                prevState.sort((a, b) => b.lastMessageCreatedAt.seconds - a.lastMessageCreatedAt.seconds)
                return [...prevState]
              } else {
                prevState.push(payload)
                prevState.sort((a, b) => b.lastMessageCreatedAt.seconds - a.lastMessageCreatedAt.seconds)
                return [...prevState]
              }
            })
          })
        })
      })
  }

  const addNewGroup = async (name) => {
    let existedGroup = await firebase.firestore().collection('groups').where('name', '==', name).get()
    if (existedGroup.empty) {
      let createdGroupId;
      firebase
        .firestore()
        .collection('groups')
        .add({
          name,
          lastMessage: '',
          searchKeywords: createKeywords(name),
          creatorId: docUserId
        })
        .then(doc => createdGroupId = doc.id)
        .then(() => {
          firebase
            .firestore()
            .collection('users')
            .doc(docUserId)
            .update({
              groupIdList: [...groupsIdList, createdGroupId]
            })
        })
    } else alert('Group exists')
  }

  const addGroupToList = (id) => {
    firebase
      .firestore()
      .collection('users')
      .doc(docUserId)
      .update({
        groupIdList: [...groupsIdList, id]
      })
  }

  const fetchMessages = (groupId) => {
    firebase.firestore().collection('messages').where('groupId', '==', groupId).orderBy('createdAt', 'asc')
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

  const addMessage = async ({ text, groupId, userId, userName }) => {
    firebase
      .firestore()
      .collection('messages')
      .add({
        createdAt: new Date(),
        text,
        groupId,
        userId,
        userName
      })
    firebase
      .firestore()
      .collection('groups')
      .doc(groupId)
      .update({
        lastMessageCreatedAt: new Date(),
        lastMessage: text
      })
  }

  return (
    <FirebaseContext.Provider value={{
      currentUser, searchResult, potencialFriends,
      addNewGroup, addGroupToList, loadGroupList, fetchMessages, selectGroup, addMessage, signIn, signOut, signUp, loadSearchResult,
      groupsList,
      groupsIdList,
      messages,
      currentGroup,

      isShowNewGroupModal,
      isShowSettingsModal,
      isShowNewFriendModal,
      toggleModal
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}

