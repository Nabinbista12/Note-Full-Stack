import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";
import styles from "./Home.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import TimeAgo from "react-timeago";
import server from "../../environment";

export default function Home() {
  dayjs.extend(relativeTime);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const res = await axios.get(`https://note-full-stack-9lb9.onrender.com/api/v1/note`, {
          withCredentials: true,
        });
        // console.log((res.data.notes).reverse());
        setNotes(res.data.notes.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    getAllNotes();
  }, []);

  const deleteNote = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(`https://note-full-stack-9lb9.onrender.com/api/v1/note/delete/${id}`, {
        withCredentials: true,
      });
      console.log(res);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      alert(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.homeContainer}>
        {notes.map((val) => {
          return (
            <div key={val._id} className={styles.card}>
              <Link to={`/view/${val._id}`}>
                <div className={styles.cardNav}>
                  <h2 className={styles.title}>{val.title}</h2>

                  {/* <p>{dayjs(val.createdAt).fromNow()}</p> */}

                  {/* <TimeAgo date={val.createdAt} /> */}
                  {val.updatedAt ? (
                    // <p>{dayjs(val.updatedAt).fromNow()}</p>
                    <TimeAgo className={styles.cardDate} date={val.updatedAt} />
                  ) : (
                    <TimeAgo className={styles.cardDate} date={val.createdAt} />
                  )}

                  <button
                    type="button"
                    className={styles.cardDelete}
                    onClick={() => deleteNote(val._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
                <p className={styles.createdDate}>
                  {new Date(val.createdAt).toLocaleString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "2-digit",
                  })}
                </p>
                <ul className={styles.noteContainer}>
                  {val.notes.map((note, index) => {
                    return (
                      <li key={index}>
                        <span>{note}</span>
                      </li>
                    );
                  })}
                </ul>
                {/* <p>{val.userId}</p> */}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
