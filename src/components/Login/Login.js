import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import "./Login.css";
import { UserContext } from "../../App";

const Login = () => {
    const [newUser, setNewUser] = useState(true);
    const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    photo: "",
  });
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setLoggedInUser(user)
        history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  };
  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        setLoggedInUser(user)
        history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  };
  const handleSubmit = (e) => {
    if (user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(
            res => {
             const newUserInfo = {...user }
             setUser(newUserInfo);
             setLoggedInUser(newUserInfo);
             history.replace(from);
            }
          )
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }
    e.preventDefault();
  };
  const handleBlur = (e) => {
    let isFormValid;
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordValid2 = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid2 && isPasswordValid;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  return (
    <div className="container mt-2">
    { newUser ? 
      <Form className="col-md-5 m-auto" onSubmit={handleSubmit}>
        <h2>Create An Account</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="mt-3">Name</Form.Label>
          <Form.Control
            onBlur={handleBlur}
            className="form-style"
            type="name"
            placeholder=""
            name="name"
            required
          />
          <Form.Label className="mt-3">Email Address</Form.Label>
          <Form.Control
            onBlur={handleBlur}
            className="form-style"
            type="email"
            placeholder=""
            name="email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="mt-3">Password</Form.Label>
          <Form.Control
            onBlur={handleBlur}
            type="password"
            placeholder=""
            name="password"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="mt-3" required>
            Confirm Password
          </Form.Label>
          <Form.Control
            onBlur={handleBlur}
            type="password"
            placeholder=""
            name="confirmation"
            required
          />
        </Form.Group>
        <Button className="Submit-Button" variant="success" type="submit">
          Create An Account
        </Button>
        <div className="mt-3 already-account">
          <h6>
            Already Have An Account
            <span className="ml-2 login-here">
              <Link onClick={() => setNewUser(!newUser)}>Login</Link>
            </span>
          </h6>
        </div>
        <div className="sign-with-google">
          <h6>Or</h6>
          <Button
            onClick={handleFacebookSignIn}
            className="Google-Facebook-btn mt-3"
            variant="light"
          >
            Continue With Facebook
          </Button>
          <Button
            onClick={handleGoogleSignIn}
            className="Google-Facebook-btn mt-3 mb-3"
            variant="light"
          >
            Continue With Google
          </Button>
        </div>
      </Form>
     :
     <Form className="col-md-5 m-auto" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="mt-3">Email Address</Form.Label>
          <Form.Control
            onBlur={handleBlur}
            className="form-style"
            type="email"
            placeholder=""
            name="email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="mt-3">Password</Form.Label>
          <Form.Control
            onBlur={handleBlur}
            type="password"
            placeholder=""
            name="password"
            required
          />
        </Form.Group>
        <Button className="Submit-Button" variant="success" type="submit">
          Log In
        </Button>
        <div className="mt-3 already-account">
          <h6>
            Don't Have An Account
            <span className="ml-2 login-here">
              <Link onClick={() => setNewUser(!newUser)}>Create An Account</Link>
            </span>
          </h6>
        </div>
        <div className="sign-with-google">
          <h6>Or</h6>
          <Button
            onClick={handleFacebookSignIn}
            className="Google-Facebook-btn mt-3"
            variant="light"
          >
            Continue With Facebook
          </Button>
          <Button
            onClick={handleGoogleSignIn}
            className="Google-Facebook-btn mt-3 mb-3"
            variant="light"
          >
            Continue With Google
          </Button>
        </div>
      </Form>
     }  
    </div>
  );
};

export default Login;
