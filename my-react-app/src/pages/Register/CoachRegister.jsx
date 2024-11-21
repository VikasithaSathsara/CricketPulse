import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
            const response = await axios.post(
                "http://localhost:8080/api/users/create-user",
                requestBody
            );
            if (response.status === 200) {
                toast.success("Registration Successful");
                setTimeout(function () {
                    window.location.replace("/");
                }, 1300);
            }
        } catch (error) {
            console.error("There was an error registering the coach!", error);
            toast.error("Registration failed");
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
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <div className="form-warp">
                    <form onSubmit={handleSubmit}>
                        <h1 className="form-heading">Coach Registration</h1>

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
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-input-box">
                            <select
                                id="type"
                                className="form-input"
                                name="coachType"
                                value={formData.coachType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">--Select Coach Type--</option>
                                <option value="Type 1">Batting Coach</option>
                                <option value="Type 2">Bowling Coach</option>
                                <option value="Type 3">Fielding Coach</option>
                            </select>
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
                        <div className="file-input-box">
                            <label className="pro-pic">
                                Upload Profile Photo
                            </label>

                            <input
                                className="file-input"
                                type="file"
                                accept="image/*"
                                placeholder="Date of Birth"
                                value={formData.profilePic}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="reg-button">
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CoachRegister;
