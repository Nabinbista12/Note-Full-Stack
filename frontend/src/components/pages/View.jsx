import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import styles from "./View.module.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import clsx from "clsx";

export default function View() {
  const ref = useRef(null);
  const [note, setNote] = useState({
    _id: "",
    title: "",
    notes: [],
    updatedAt: "",
    createdAt: "",
    userId: "",
  });
  const { id } = useParams();
  const [count, setCount] = useState(1);

  useEffect(() => {
    let fetchNote = async () => {
      try {
        let response = await axios.get(`/v1/note/view/${id}`);
        console.log(response.data.notes);
        setNote({
          _id: response.data.notes._id,
          title: response.data.notes.title,
          notes: response.data.notes.notes,
          createdAt: response.data.notes.createdAt,
          updatedAt: response.data.notes.updatedAt,
          userId: response.data.notes.userId,
        });
        setCount(response.data.notes.notes.length);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNote();
  }, []);

  const updateTitle = (e) => {
    setNote((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  };

  const handleNote = (e, idx) => {
    const updatedNote = [...note.notes];
    updatedNote[idx] = e.target.value;
    setNote((curr) => {
      return { ...curr, notes: updatedNote.filter(item => item!= null) };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.patch(`/v1/note/view/${id}/edit`, note);
      console.log(response);
      alert("Successfully edited");
    } catch (err) {
      console.log(err);
    }
  };

  let incCount = () => {
    setCount((curr) => curr + 1);
  };

  return (
    <>
      <Navbar />

      <div className={styles.viewContainer}>
        {/* <p>{id}</p> */}
        {/* <h1 className={styles.viewHeader}>Your Note</h1> */}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formInput}>
            <input
              type="text"
              name="title"
              className={clsx(styles.formField, styles.formTitle)}
              value={`${note.title}`}
              onChange={updateTitle}
            />

            {[...Array(count)].map((_, key) => {
              return (
                <div className={styles.notes} key={key}>
                  <textarea
                    key={key}
                    type="text"
                    className={clsx(styles.formField, styles.formNotes)}
                    name={`note-${key}`}
                    value={
                      Array.isArray(note.notes) ? note.notes[key] || "" : ""
                    }
                    placeholder="Write here..."
                    onChange={(e) => handleNote(e, key)}
                  />

                  {/* <button
                    type="button"
                    className={styles.btnCountMinus}
                    onClick={(e) => subNote(e, i)}
                  >
                    -
                  </button> */}
                </div>
              );
            })}
          </div>

          <button className={styles.btnSubmit}>Edit</button>
        </form>

        <button className={styles.btnCount} onClick={incCount}>+</button>

        {/* <div>
          <p>{note.title}</p>
          <p>{note.id}</p>
          {Array.isArray(note.notes) &&
            note.notes.map((val, key) => {
              return <p key={key}>{val}</p>;
            })}
          <p>{note.createdAt}</p>
          <p>{note.userId}</p>
        </div> */}
      </div>
    </>
  );
}
