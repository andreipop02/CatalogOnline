import React from "react";
import styles from "../App.module.scss";

interface Props {
  Tip: string;
  Materie: string;
  isNota: boolean;
}

const AddModal = ({ Tip, Materie, isNota }: Props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.7)",
        zIndex: 300,
        position: "fixed",
        top: 0,
      }}
    >
      <div className={styles.addModalContainer}>
        <div className={styles.titleTextModal}>Adauga {Tip}</div>
        <div className={styles.titleTextModal}>Materie: {Materie}</div>
        <div style={{ width: "100%", marginTop: 30, marginLeft: 20 }}>
          {isNota ? <div style={{ left: 0 }} >ALEGE NOTA</div> : null}
          <div style={{ left: 0 }}>ALEGE DATA</div>
        </div>
        <div style={{display : "flex", marginTop: "30px"}}>
          <div className={styles.addButton}>ADAUGA</div>
          <div className={styles.addButton} style={{marginLeft: "10px"}}>RENUNTA</div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
