import React from 'react'
import { useSelector} from 'react-redux';


const HomeScreen = () => {
  const {userInfo} = useSelector((state) => state.auth);
  return (
    <>
      <h1 className='text-center my-4'>Home screen</h1>
      {userInfo ? (
        <>
        <h2 className='text-center'>Login User is: {userInfo.name}</h2>
        <h2 className='text-center'>Email-Id: {userInfo.email}</h2>
        </>
      ) : ('')}

    </>
  )
};

export default HomeScreen;