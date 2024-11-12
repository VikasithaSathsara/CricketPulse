import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Register.scss";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";

function CoachRegister() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const requestBody = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.email,
            password: formData.password,
            role: "COACH",
            phoneNumber: "0760570665", // You can add a phone number input field if needed
            address: formData.address,
            gender: "Male", // You can add a gender input field if needed
            dob: formData.dob,
            profilePic: "profile-pic-url", // You can add a profile picture input field if needed
        };

        try {
            const response = await axios.post("http://localhost:8080/api/users/create-user", requestBody);
            if (response.status === 200) {
                alert("Coach registered successfully");
                navigate("/");
            }
        } catch (error) {
            console.error("There was an error registering the coach!", error);
            alert("Coach Already Exists!");
        }
    };

    return (
        <div>
            <Navbar />
            <div
                className="form-background"
                style={{
                    backgroundImage: `url('https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/b5a72f50126031.58c81b1abf0a0.jpg')`,
                }}
            >
                <div className="form-warp">
                    <form onSubmit={handleSubmit}>
                        <h1 className="form-heading">Coach Registration Form</h1>

                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="date"
                                name="dob"
                                placeholder="Date of Birth"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-enter Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="register">
                            Register
                        </button>
                        <button
                            type="button"
                            className="cancel"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CoachRegister;