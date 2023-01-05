import React, { useState } from "react";
import styles from "../App.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-dropdown/style.css";
import {
  stergeAbsenta,
  stergeNota,
} from "../functions/firebase";
import { DocumentData } from "firebase/firestore";

interface StudentsProps {
  nume: string;
  prenume: string;
  CNP: string;
  nrMatricol: string;
  materii: object[];
}
interface Props {
  Tip: string;
  Materie: number;
  isNota: boolean;
  setModalVisible: (arg: boolean) => void;
  setRefresh: (arg: boolean) => void;
  student: StudentsProps | DocumentData | undefined;
  refresh: boolean;
}

const DeleteModal = ({
  Tip,
  Materie,
  isNota,
  setModalVisible,
  student,
  setRefresh,
  refresh,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();

  const convert = (selected: Date | null) => {
    if (selected) {
      const day = selected?.getDate();
      const month =
        selected?.getMonth() >= 10
          ? selected?.getMonth() + 1
          : `0${selected?.getMonth() + 1}`;
      const year = selected?.getFullYear();

      return `${year}/${month}/${day}`;
    }
  };

  return (
    <div className={styles.mainModalContainer}>
      <div className={styles.addModalContainer}>
        <div className={styles.titleTextModal}>Sterge {Tip}</div>
        <div className={styles.titleTextModal}>
          Materie: {student?.materii[Materie].nume}
        </div>
        <div className={styles.dateAndGradeContainer}>
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
        <div className={styles.modalButtonsContainer}>
          <div
            className={styles.addButton}
            onClick={async () => {
              isNota
                ? await stergeNota(
                    student?.nrMatricol,
                    Materie,
                    //@ts-ignore
                    convert(selectedDate)
                  )
                    .then(() => {
                      setRefresh(!refresh);
                      alert("Nota stearsa cu succes!");
                    })
                    .catch((e) => {
                      alert(`A aparut o eroare! (${e})`);
                    })
                : await stergeAbsenta(
                    student?.nrMatricol,
                    Materie,
                    //@ts-ignore
                    convert(selectedDate)
                  )
                    .then(() => {
                      setRefresh(!refresh);
                      alert("Absenta stearsa cu succes!");
                    })
                    .catch((e) => {
                      alert(`A aparut o eroare! (${e})`);
                    });
            }}
          >
            STERGE
          </div>
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

export default DeleteModal;
