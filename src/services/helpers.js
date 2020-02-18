export const getOppoInfo = (contactInfo, userId) => {
  if (!contactInfo) return null;
  if (contactInfo.uid1 === userId) {
    return {
      logo: contactInfo.logo2,
      name: contactInfo.name2,
      uid: contactInfo.uid2
    }
  } else if (contactInfo.uid2 === userId) {
    return {
      logo: contactInfo.logo1,
      name: contactInfo.name1,
      uid: contactInfo.uid1
    }
  }
} 