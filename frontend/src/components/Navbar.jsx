import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "./Logo";
import useAuth from "./context/Auth";
import clsx from "clsx";

export default function Navbar() {
  const { user, isAuthenticated, userLogout } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.style.background =
      "url(/images/background1.avif) no-repeat fixed";
    document.body.style.backgroundSize = "cover";
  }, []);

  const handleLogout = async () => {
    let success = userLogout();
    if (success) {
      navigate("/");
    }
  };

  const handleResponsive = () => {
    setShow(!show);
  };

  return (
    <div className={styles.navbar}>
      <Logo />

      {isAuthenticated ? (
        <div className={styles.rightNavbar}>
          <div onClick={handleResponsive}>
            {show ? (
              <div className={styles.menu}>
                <div className={styles.menuLogo}>
                  <i className="fa fa-bars"></i>
                </div>
              </div>
            ) : (
              <div className={styles.menu}>
                <div className={styles.menuLogo}>
                  <i class="fa-solid fa-xmark"></i>
                </div>

                <div className={styles.menuOption}>
                  <p className={styles.menuLink}>{user}</p>
                  <p className={styles.menuLink}>
                    <Link to="/create" className={styles.menuCreate}>
                      Create
                    </Link>
                  </p>
                  <div className={styles.menuLink}>
                    <button className={styles.menuBtn} onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <p className={styles.link}>{user}</p>
          <Link to="/create" className={styles.link}>
            Create
          </Link>
          <button
            className={clsx(styles.link, styles.btn)}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        
        <div className={styles.rightNavbar}>
          <div onClick={handleResponsive}>
            {show ? (
              <div className={styles.menu}>
                <div className={styles.menuLogo}>
                  <i className="fa fa-bars"></i>
                </div>
              </div>
            ) : (
              <div className={styles.menu}>
                <div className={styles.menuLogo}>
                  <i class="fa-solid fa-xmark"></i>
                </div>

                <div className={styles.menuOption}>
                  <p className={styles.menuLink}>
                    <Link to="/login" className={styles.menuCreate}>
                      Login
                    </Link>
                  </p>
                  <p className={styles.menuLink}>
                    <Link to="/signup" className={styles.menuCreate}>
                      Signup
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className={styles.menu}>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
            <Link to="/signup" className={styles.link}>
              SignUp
            </Link>
          </div>

          <Link to="/login" className={styles.link}>
            Login
          </Link>
          <Link to="/signup" className={styles.link}>
            SignUp
          </Link>
        </div>
      )}
    </div>
  );
}
