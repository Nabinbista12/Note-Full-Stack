import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Create.module.css";
import clsx from "clsx";
import server from "../../environment";

export default function Create() {
  const [formData, setFormData] = useState({
    title: "",
    notes: [],
  });
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  const onChangeField = (e) => {
    e.preventDefault();
    setFormData((curr) => {
      return { ...curr, [e.target.name]: e.target.value };
    });
  };

  const sendNoteData = async (e) => {
    e.preventDefault();
    try {
      console.log(formData.notes);
      await axios.post(`${server.url}/api/v1/note/create`, formData, {
        withCredentials: true,
      });
      navigate("/home");
    } catch (err) {
      alert("Please don't leave the middle area blank.");
      console.log(err);
    }
  };

  const addNote = async () => {
    setCount((curr) => curr + 1);
  };

  const subNote = (e, idx) => {
    setCount((curr) => curr - 1);
    const deletedNote = [...formData.notes];
    deletedNote[idx] = e.target.value;
    setFormData({ ...formData, notes: deletedNote });
  };

  const handleNoteChange = (e, idx) => {
    const updateNotes = [...formData.notes];
    updateNotes[idx] = e.target.value;
    if (updateNotes) {
      setFormData({ ...formData, notes: updateNotes });
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.formContainer}>
        <form onSubmit={sendNoteData} className={styles.form}>
          <div className={styles.formInput}>
            <input
              type="text"
              className={`${styles.formTitle} ${styles.formField}`}
              name="title"
              value={formData.title}
              onChange={onChangeField}
              placeholder="Enter your title here..."
            />

            {[...Array(count)].map((_, i) => {
              return (
                <div className={styles.notes}>
                  <textarea
                    key={i}
                    type="text"
                    className={clsx(styles.formNotes, styles.formField)}
                    name={`notes-${i}`}
                    value={
                      Array.isArray(formData.notes)
                        ? formData.notes[i] || ""
                        : ""
                    }
                    onChange={(e) => handleNoteChange(e, i)}
                    placeholder="Enter your work..."
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

          <button className={styles.btnSubmit}>Create</button>
        </form>
        <button className={styles.btnCount} onClick={addNote}>
          +
        </button>
      </div>
    </>
  );
}
