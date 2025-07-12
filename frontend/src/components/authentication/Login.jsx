import { useEffect, useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";

import Logo from "../Logo";
import styles from "./Login.module.css";
import useAuth from "../context/Auth";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { userLogin } = useAuth();
  const navigate = useNavigate();

  let onChangeValue = (e) => {
    setFormData((curr) => {
      return { ...curr, [e.target.name]: e.target.value };
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    const success = await userLogin(formData);
    if (success) {
      navigate("/home", { replace: true });
    } else {
      alert("User not found.")
    }
  };

  useEffect(() => {
    document.body.style.background =
      "url(/images/background2.jpg) center no-repeat fixed";
    document.body.style.backgroundSize = "cover";
  });
  return (
    <div className={styles.container}>
      <Logo />

      <h1 style={{ textAlign: "center", marginTop: "3rem" }}>
        Login into NoteAll
      </h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={onChangeValue}
              placeholder="Enter username"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onChangeValue}
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>
          <div className={styles.submit}>
            <button>Submit</button>
            <Link to="/signup">New to NoteAll</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
