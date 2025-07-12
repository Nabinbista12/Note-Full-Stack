import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../Logo";
import styles from "./SignUp.module.css";
import useAuth from "../context/Auth";

export default function SignUp() {
  let navigate = useNavigate();
  let [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  let [message, setMessage] = useState("");
  let [err, setErr] = useState("");
  const {userSignUp} = useAuth();


  let fieldData = (event) => {
    setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErr("");

    const success = await userSignUp(formData);
    console.log(success);
    if (success) {
      navigate("/home");
      console.log(e);
    } else {
      setErr("Signup failed. Please check you credentials");
    }
  };

  useEffect(() => {
    document.body.style.background =
      "url(/images/background2.jpg) center no-repeat fixed";
    document.body.style.backgroundSize = "cover";
  }, []);

  return (
    <div className={styles.container}>
      <Logo />

      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
        SignUp into NoteAll
      </h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {message && <p style={{ color: "blue" }}>{message}</p>}
          {err && <p style={{ color: "red" }}>{err}</p>}
          <div className={styles.field}>
            <label htmlFor="name">Full Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={fieldData}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={fieldData}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={fieldData}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={fieldData}
              autoComplete="current-password"
            />
          </div>
          <div className={styles.submit}>
            <button>Submit</button>
            <Link to="/login">Already has a account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
