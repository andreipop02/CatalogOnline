import React, { useState } from "react";
import ReactDropdown from "react-dropdown";
import styles from "../App.module.scss";
import { addFeedback } from "../functions/firebase";

const FeedbackModule = () => {
  const [showFeedbackModal, setShowFeedbackModule] = useState<boolean>(false);
  const [nume, setNume] = useState<string>("");
  const [prenume, setPrenume] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [rol, setRol] = useState<string>("");

  return (
    <div className={styles.feedbackMainContainer}>
      <div
        className={styles.feedbackButton}
        onClick={() => setShowFeedbackModule(true)}
      >
        FEEDBACK
      </div>
      {showFeedbackModal ? (
        <div
         className={styles.feedbackModal}
        >
          <div style={{ alignSelf: "center" }}>TRIMITE FEEDBACK</div>
          <input
            placeholder="NUME"
            onChange={(nume) => setNume(nume.target.value)}
          />
          <input
            placeholder="PRENUME"
            onChange={(prenume) => setPrenume(prenume.target.value)}
          />
          <ReactDropdown
            value={"Selecteaza Rolul"}
            options={["Parinte", "Profesor", "Elev"]}
            onChange={(rol) => setRol(rol.value)}
          />
          <textarea
            placeholder="FEEDBACK"
            onChange={(feedback) => setFeedback(feedback.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div
              className={styles.addFeedbackButton}
              onClick={async () => {
                await addFeedback(nume, prenume, feedback, rol)
                  .then(() => alert("Feedback trimis cu succes"))
                  .catch((e) => alert(`A aparut o eroare (${e})`));
                setShowFeedbackModule(false);
              }}
            >
              TRIMITE
            </div>
            <div
              className={styles.cancelFeedbackButton}
              onClick={() => setShowFeedbackModule(false)}
            >
              ANULEAZA
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FeedbackModule;
