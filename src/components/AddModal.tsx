import React, { useState } from "react";
import styles from "../App.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactDropdown, { Option } from "react-dropdown";
import 'react-dropdown/style.css';
interface Props {
  Tip: string;
  Materie: string;
  isNota: boolean;
  setModalVisible: (arg: boolean) => void;
}

const AddModal = ({ Tip, Materie, isNota, setModalVisible }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  console.log(selectedGrade);
  return (
    <div className={styles.mainModalContainer}>
      <div className={styles.addModalContainer}>
        <div className={styles.titleTextModal}>Adauga {Tip}</div>
        <div className={styles.titleTextModal}>Materie: {Materie}</div>
        <div style={{ width: "100%", marginTop: 30, marginLeft: 20 }}>
          {isNota ? (
            <div>
              <div style={{ left: 0 }}>ALEGE NOTA</div>
              <ReactDropdown options={["1","2","3","4","5","6","7","8","9","10"]} className={styles.selectGrade} onChange={(grade) => setSelectedGrade(parseInt(grade.value))}/>
            </div>
          ) : null}
          <div style={{ left: 0 }}>ALEGE DATA</div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className={styles.calendarStyles}
            filterDate={(date: any) =>
              date.getDay() !== 6 && date.getDay() !== 0
            }
          />
        </div>
        <div style={{ display: "flex", marginTop: 30 }}>
          <div className={styles.addButton}>ADAUGA</div>
          <div
            className={styles.addButton}
            style={{ marginLeft: "10px" }}
            onClick={() => setModalVisible(false)}
          >
            RENUNTA
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
