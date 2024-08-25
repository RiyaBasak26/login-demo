import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate= useNavigate();
  const handelUserProfile=()=>{
    navigate('/updata-profile');
  }
  return (
    <div><header>
      <button onClick={handelUserProfile}>Edit Profile</button>
    </header>
<h1> Welvome to our page....</h1>
    </div>
  )
}

export default Dashboard