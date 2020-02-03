import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import { FirebaseContext } from './firebaseContext'

export const FirebaseState = ({ children }) => {
  // ------------------------------ Пока пусть тут побудет -------------------------

  const [isShowNewGroupModal, setIsShowNewGroupModal] = useState(false);

  const toggleNewGroupModal = (modal, value) => {
    switch (modal) {
      case ('newGroup'):
        setIsShowNewGroupModal(value);
        break
      default:
        break
    }
  }

  // const toggleNewGroupModal = () => {
  //   setIsShowNewGroupModal(!isShowNewGroupModal)
  // }


  // -------------------------------------------------------------------------------
  const [currentUser, setCurrentUser] = useState(null);
  const [docUserId, setDocUserId] = useState(null);
  const [groupsList, setGroupsList] = useState([]);
  const [groupsIdList, setGroupsIdList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({});
  const [searchResult, setSearchResult] = useState(null);

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
        groupIdList: []
      })
  }

  const signOut = () => {
    firebase.auth().signOut()
  }

  const addUser = async (name, email) => {
    firebase
      .firestore()
      .collection('users')
      .add({
        name,
        email,
        groupIdList: []
      })
  }

  const selectGroup = (payload) => {
    setCurrentGroup(payload)
  }

  const loadSearchResult = (searchValue) => {
    if (!searchValue) {
      setSearchResult(null)
      return;
    };
    firebase.firestore().collection('groups').where('searchKeywords', 'array-contains', searchValue)
      .onSnapshot(snapShot => {
        const result = [];
        if (snapShot.empty) return;
        snapShot.docs.forEach(doc => {
          result.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setSearchResult(result);
      })
  }

  const loadGroupList = async (user) => {
    // console.log('first')
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
            // console.log('doc', doc)
            const payload = {
              id: doc.id,
              ...doc.data()
            }
            setGroupsList(prevState => {
              // console.log('pS', prevState)
              const groupIndex = prevState.findIndex(group => group.id === payload.id)
              if (~groupIndex) {
                prevState[groupIndex] = payload
                return prevState
              } else {
                return [...prevState, payload]
              }

            })

          })
        })
      })
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

  const addNewGroup = async (name) => {
    let createdGroupId;
    firebase
      .firestore()
      .collection('groups')
      .add({
        name,
        lastMessage: '',
        searchKeywords: createKeywords(name)
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
        lastMessage: text
      })
  }

  return (
    <FirebaseContext.Provider value={{
      currentUser, searchResult,
      addUser, addNewGroup, addGroupToList, loadGroupList, fetchMessages, selectGroup, addMessage, signIn, signOut, signUp, loadSearchResult,
      groupsList,
      groupsIdList,
      messages,
      currentGroup,

      isShowNewGroupModal,
      toggleNewGroupModal
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}

