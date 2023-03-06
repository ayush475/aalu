import React from 'react'
import "./UserDet.css";


const UserDet = ({ uname, email, tagId,remainingBalance,BusRoutes }) => {
  return (
    <>
     <div className="user-details">
      <h2>User Details</h2>
      <div className="user-info">
        <p><span className="label">Name:</span> {uname}</p>
        <p><span className="label">Email:</span> {email}</p>
        <p><span className="label">Tagid:</span> {tagId}</p>
        <p><span className="label">Remaining-balance:</span> {remainingBalance}</p>
        {/* <p><span className='label'>Bus-Routes</span>{BusRoutes}</p> */}
      </div>
    </div>
    </>
  )
}

export default UserDet