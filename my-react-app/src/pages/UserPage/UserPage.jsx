import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserPageStyles.scss";
import Table from "../../components/Table/Table";

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState("ALL");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/users/get_users");
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleFilterChange = (filter) => {
        setFilter(filter);
        if (filter === "ALL") {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(users.filter(user => user.role === filter));
        }
    };

    const handleEditUser = (userId) => {
        // Implement edit user functionality
        console.log("Edit user:", userId);
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/delete-user?id=${userId}`);
            setUsers(users.filter(user => user.userId !== userId));
            setFilteredUsers(filteredUsers.filter(user => user.userId !== userId));
            console.log("User deleted:", userId);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };


    const tableHeaders = ["ID","Profile Image", "First Name", "Last Name", "Username", "Role", "Actions"];

    const tableBody = filteredUsers.map((user) => ({
      id: user.userId,
      profileImage: <img src={user.profilePic} alt="Profile" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />,
      firstName: user.firstName,
      lastName: user.lastName,
      Username: user.username,
      role: user.role,
      actions: (
      <>
      <button onClick={() => handleEditUser(user.userId)}>Edit</button>
      <button onClick={() => handleDeleteUser(user.userId)}>Delete</button>
      </>
      )
    }));
  

    return (
        <div className="admin-users-container">
            <h1>Admin User Page</h1>
            <div className="filters">
                <button onClick={() => handleFilterChange("ALL")}>ALL</button>
                <button onClick={() => handleFilterChange("COACH")}>COACHES</button>
                <button onClick={() => handleFilterChange("MEMBER")}>MEMBERS</button>
            </div>

            {filteredUsers.length === 0 ? (
            <p>No user available.</p>
          ) : (
            <Table headers={tableHeaders} body={tableBody} />
          )}
 
        </div>
    );
};

export default UserPage;