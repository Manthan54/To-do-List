// import React, { useState } from 'react';
// import './Login_SignUp_page.css';
// import { useNavigate } from 'react-router-dom';

// import { Link } from 'react-router-dom';


// const LoginSign_page = () => {

//   const [isLogin, setIsLogin] = useState(true);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigation1 = useNavigate();
//   const oncliking_login_button = () => {
    
//     // here you can add validation if needed
//     navigation1("/todolist");   //  correct way to navigate
//   };
  

//   return (
//     <div className='container'>
//       <div className='form-container'>
//         <div className='form-toggle'>
//           <button className={isLogin ? 'active' : ''}
//             onClick={() => setIsLogin(true)}>Login</button>
//           <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>SignUp</button>
//         </div>
//         {isLogin ? <>
//           <div className='form'>
//             <h2>login</h2>
//             <input type="email" placeholder='Email' />
//             <input type="password" placeholder='Password' />
//             <button className='loginbutton' onClick={oncliking_login_button}>Login</button>
//             <p>Not a member ? <a href='#' onClick={()=>setIsLogin(false)}>Signup Now </a> </p>
//           </div>
//         </>
//           :
//           <>
//           <div className='form'>
//             <h2>SignUp</h2>
//             <input type="email" placeholder='Email' />
//             <input type="password" placeholder='Password' />
//             <input type="password" placeholder='Confirm Password' />
//             <button className='Signup_button' onClick={()=>{}}>Signup</button>
//             <p>Already Sign up ?<a href="/" onClick={()=>setIsLogin(true)}>goto login</a></p>
//           </div>
          
//           </>
//             }
//       </div>

//     </div>
//   )
// }

// export default LoginSign_page
import React, { useState } from "react";
import "./Login_SignUp_page.css";
import { useNavigate } from "react-router-dom";

const LoginSign_page = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();

  // Handle Signup
  const handleSignup = () => {
    if (!email || !password || !confirmPass) {
      alert("Please fill all fields");
      return;
    }
    if (password !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email)) {
      alert("User already exists! Please login.");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login.");
    setIsLogin(true);
    setEmail("");
    setPassword("");
    setConfirmPass("");
  };

  // Handle Login
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login successful!");
      navigate("/todolist"); // 🔵 redirect to ToDoList page
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            SignUp
          </button>
        </div>

        {isLogin ? (
          <div className="form">
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginbutton" onClick={handleLogin}>
              Login
            </button>
            <p>
              Not a member?{" "}
              <a href="#" onClick={() => setIsLogin(false)}>
                Signup Now
              </a>
            </p>
          </div>
        ) : (
          <div className="form">
            <h2>SignUp</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            <button className="Signup_button" onClick={handleSignup}>
              Signup
            </button>
            <p>
              Already Signed up?{" "}
              <a href="#" onClick={() => setIsLogin(true)}>
                Go to login
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSign_page;
