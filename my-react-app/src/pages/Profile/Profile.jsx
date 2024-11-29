import React, { useState } from "react";
import "./ProfileStyles.scss";
import SectionContainer from "../../components/SectionContainer/SectionContainer";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [clientInfo, setClientInfo] = useState({
        firstName: "Fohne",
        lastName: "Doeint",
        country: "USA",
        city: "Prownton",
        occupation: "Engineer",
        mobile: "076 0570 695",
        email: "fohndoe@gmail.com",
        birthday: "1990-01-01",
        profilePic: "path_to_profile_picture.jpg",
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientInfo({ ...clientInfo, [name]: value });
    };

    const handleProfileUpdate = () => {
        console.log("Profile updated", clientInfo);
        setIsEditing(false);
    };

    return (
        <div className="profile-page">
            <SectionContainer title="Profile">
                <div className="profile-section">
                    <div className="left-container">
                        <div className="profile-picture-card">
                            <img
                                src={`https://i.ibb.co/ypmBR9k/08.jpg`}
                                alt="Profile"
                            />
                            {isEditing && (
                                <input
                                    type="file"
                                    name="profilePic"
                                    onChange={(e) =>
                                        setClientInfo({
                                            ...clientInfo,
                                            profilePic: URL.createObjectURL(
                                                e.target.files[0]
                                            ),
                                        })
                                    }
                                />
                            )}

                            <h2>
                                {clientInfo.firstName} {clientInfo.lastName}
                            </h2>
                        </div>
                    </div>
                    <div className="right-container">
                        <div className="bio-section">
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={clientInfo.firstName}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={clientInfo.lastName}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="country"
                                        value={clientInfo.country}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="occupation"
                                        value={clientInfo.occupation}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={clientInfo.mobile}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={clientInfo.email}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="date"
                                        name="birthday"
                                        value={clientInfo.birthday}
                                        onChange={handleInputChange}
                                    />
                                    <button onClick={handleProfileUpdate}>
                                        Save
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p>
                                        <label style={{ marginRight: "27px" }}>
                                            First Name
                                        </label>
                                        :{"   "}
                                        {clientInfo.firstName}
                                    </p>

                                    <p>
                                        <label style={{ marginRight: "30px" }}>
                                            Last Name
                                        </label>
                                        :{"   "}
                                        {clientInfo.lastName}
                                    </p>

                                    <p>
                                        <label style={{ marginRight: "70px" }}>
                                            Email
                                        </label>
                                        :{"   "}
                                        {clientInfo.email}
                                    </p>
                                    <p>
                                        <label style={{ marginRight: "57px" }}>
                                            Mobile
                                        </label>
                                        :{"   "}
                                        {clientInfo.mobile}
                                    </p>

                                    <p>
                                        <label style={{ marginRight: "46px" }}>
                                            Birthday
                                        </label>
                                        :{"   "}
                                        {clientInfo.birthday}
                                    </p>
                                    <p>
                                        <label style={{ marginRight: "23px" }}>
                                            Occupation
                                        </label>
                                        :{"   "}
                                        {clientInfo.occupation}
                                    </p>
                                    <p>
                                        <label style={{ marginRight: "50px" }}>
                                            Country
                                        </label>
                                        : {"   "}
                                        {clientInfo.country}
                                    </p>
                                    <p>
                                        <label style={{ marginRight: "80px" }}>
                                            City:{"  "}
                                        </label>
                                        : {clientInfo.city}
                                    </p>

                                    <button onClick={handleEditToggle}>
                                        Edit
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </div>
        // </div>
    );
};

export default Profile;
