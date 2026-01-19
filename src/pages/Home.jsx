import React from 'react'
import { useSelector } from 'react-redux'
import UserDashboard from '../components/UserDashboard.jsx'
import OwnerDashboard from '../components/OwnerDashboard.jsx'
import DeliveryBoy from '../components/DeliveryBoy.jsx'


function Home() {
  const { userData } = useSelector(state => state.user)//redux se user data le raha hu

  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-[#fff9f6]'>
      {userData.role === "user" && <UserDashboard />}

      {userData.role === "owner" && < OwnerDashboard />}
      {userData.role === "deliveryboy" && <DeliveryBoy />}

    </div>
  )
}

export default Home
