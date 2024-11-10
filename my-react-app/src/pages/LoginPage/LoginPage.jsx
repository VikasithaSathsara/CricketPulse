import { useState, useContext, Profiler } from 'react';
import "./LoginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { StoreContext } from '../../StoreContext/StoreContext';
import testUsers from '../../assets/tempData/testUsers';


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn, setFirstName, setRole, setUsername, setLastName , setProfileImage } =
    useContext(StoreContext);

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    // try {
    //     const response = await axios.post('http://localhost:8080/api/users/authenticate', {
    //         email: email,
    //         password: password
    //     });

    //     console.log("login-res",response)

    //     if (response.status === 200) {
    //         const role = response.data.role;
    //         const firstName = response.data.firstName;
    //         const lastName = response.data.firstName;
    //         const username = response.data.username;

    //         console.log("First Name:", firstName);
    //         console.log("Last Name:", lastName);
    //         console.log("Role:", role);
    //         console.log("username",username)

    //         setFirstName(firstName);
    //         setLastName(lastName);
    //         setUsername(username);
    //         setRole(role)

    const user = testUsers.find(
      (user) => user.username === email && user.password === password
    );

    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUsername(user.username);
      setRole(user.role);
      setIsLoggedIn(true);
      setProfileImage(user.profileImage);
      navigate("/");
    } else {
      alert("Login failed. Please check your credentials.");
    }

    // setIsLoggedIn(true);
    // navigate('/');
    //     }
    // } catch (error) {
    //     console.error('Login failed:', error);
    //     alert('Login failed. Please check your credentials.');
    // }
  };

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
          <form onSubmit={handleSubmit}>
            <h1 className="heading">Login</h1>

            <div className="input-box">
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                id="exampleInputEmail1"
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              {/* <FaUser className="icon" /> */}
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(event) => setPassword(event.target.value)}
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
