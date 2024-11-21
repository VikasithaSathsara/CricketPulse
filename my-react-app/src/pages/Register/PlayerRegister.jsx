import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PlayerRegister() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        rePassword: "",
        address: "",
        email: "",
        dob: "",
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
        if (formData.password !== formData.rePassword) {
            alert("Passwords do not match");
            return;
        }

        const requestBody = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.email,
            password: formData.password,
            role: "MEMBER",
            phoneNumber: "0760570695", // You can add a phone number input if needed
            address: formData.address,
            gender: "Male", // You can add a gender input if needed
            dob: formData.dob,
            profilePic: "profile-pic-url", // You can add a profile picture input if needed
        };

        try {
            const response = await fetch(
                "http://localhost:8080/api/users/create-user",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (response.ok) {
                toast.success("Registration Successful");
                setTimeout(function () {
                    window.location.replace("/");
                }, 1300);
            } else {
                toast.error("Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Registration failed");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="form-background">
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
                        <h1 className="form-heading">Player Registration</h1>

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
                                name="rePassword"
                                placeholder="Re-enter Password"
                                value={formData.rePassword}
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

export default PlayerRegister;
