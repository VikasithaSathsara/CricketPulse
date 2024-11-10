import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Register.scss";
import { useNavigate } from "react-router-dom";

function CoachRegister() {
    const navigate = useNavigate();

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
                    <form action="">
                        <h1 className="form-heading">Coach Registation Form</h1>

                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="text"
                                placeholder="First Name"
                                // value={username}
                                // onChange={(e) => setUsername(e.target.value)}
                                required
                            />

                            {/* <FaUser className="icon" /> */}
                        </div>
                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Last Name"
                                // value={username}
                                // onChange={(e) => setUsername(e.target.value)}
                                required
                            />

                            {/* <FaUser className="icon" /> */}
                        </div>

                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="date"
                                placeholder="Date of Birth"
                                // value={username}
                                // onChange={(e) => setUsername(e.target.value)}
                                required
                            />

                            {/* <FaUser className="icon" /> */}
                        </div>
                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Address"
                                // value={username}
                                // onChange={(e) => setUsername(e.target.value)}
                                required
                            />

                            {/* <FaUser className="icon" /> */}
                        </div>
                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="email"
                                placeholder="Email"
                                // value={username}
                                // onChange={(e) => setUsername(e.target.value)}
                                required
                            />

                            {/* <FaUser className="icon" /> */}
                        </div>

                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="password"
                                placeholder="Password"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {/* <FaLock className="icon" /> */}
                        </div>
                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="password"
                                placeholder="Re-enter Password"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {/* <FaLock className="icon" /> */}
                        </div>

                        <button type="submit" className="register">
                            Register
                        </button>
                        <button
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
