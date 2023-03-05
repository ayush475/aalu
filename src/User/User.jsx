import React from 'react'
import UserDet from './UserDet'

const user = {
    name: "John-doe",
    email: "johndoe@example.com",
    tagId: "12345",
    remainingBalance: "$100",
    busRoutes: ["Route A", "Route B", "Route C"],
  };
  
  const User = () => {
    return (
      <div>
        <UserDet
          uname={user.name}
          email={user.email}
          tagId={user.tagId}
          remainingBalance={user.remainingBalance}
          busRoutes={user.busRoutes}
        />
      </div>
    );
  };

export default User