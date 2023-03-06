import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../controllers/user";
import UserDet from "./UserDet";

const user = {
  name: "John-doe",
  email: "johndoe@example.com",
  tagId: "12345",
  remainingBalance: "$100",
  busRoutes: ["Route A", "Route B", "Route C"],
};

const User = () => {
  const [selectedUserIndexId, setSelectedUserIndexId] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((data) => {
      console.log(data);
      setAllUsers(data?.users)
    });
  }, []);

  useEffect(()=>{
console.log(selectedUserIndexId);
  },[selectedUserIndexId])

  return (
    <div>
      <div>
        <span>Enter User Id</span>
        <Select
          value={selectedUserIndexId}
          onChange={(value) => {
            setSelectedUserIndexId(value);
          }}
          style={{
            width: 120,
          }}
          // options={[
          //   {
          //     value: "lucy",
          //     label: "Lucy",
          //   },
          // ]}
          options={allUsers?.map((user,index) => {
            // console.log(user);
            return {
              value: index,
              label: user.id,
            };
          })}
        />
      </div>
      {
         <UserDet
        uname={allUsers[selectedUserIndexId]?.name}
        email={allUsers[selectedUserIndexId]?.email}
        tagId={allUsers[selectedUserIndexId]?.tagId}
        remainingBalance={allUsers[selectedUserIndexId]?.balance}
        // busRoutes={user.busRoutes}
      />
      }
     
    </div>
  );
};

export default User;
