import React from "react";
import { useEffect } from "react";
import "./LoginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function LoginPage() {
    return (
        <div>
            <Navbar />
            <div className="toast-container-wrapper">
                {/* <ToastContainer
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
            /> */}
            </div>
            <div className="login-background">
                <div className="warp">
                    <form action="">
                        <h1 className="heading">Login</h1>

                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Username"
                                // value={username}
                                // onChange={(e) => setUsername(e.target.value)}
                                required
                            />

                            {/* <FaUser className="icon" /> */}
                        </div>

                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {/* <FaLock className="icon" /> */}
                        </div>

                        <button type="submit" className="login">
                            Login
                        </button>

                        <div className="signup">
                            <p>
                                Don't have an Account? <br />
                                <br />{" "}
                                <a href="#">
                                    <Link className="btn btn-success" to={"/"}>
                                        Register
                                    </Link>
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
