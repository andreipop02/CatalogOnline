import React, { useState } from "react";
import styles from "../App.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactDropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";
import { setNota } from "../functions/firebase";
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
  student: StudentsProps | DocumentData | undefined;
}

const AddModal = ({
  Tip,
  Materie,
  isNota,
  setModalVisible,
  student,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [selectedGrade, setSelectedGrade] = useState<number>(1);

  const convert = (selected: any) => {
    const day = selected.getDate();
    const month =
      selected.getMonth() >= 10
        ? selected.getMonth() + 1
        : `0${selected.getMonth() + 1}`;
    const year = selected.getFullYear();

    return `${year}/${month}/${day}`;
  };

  console.log(selectedDate);
  return (
    <div className={styles.mainModalContainer}>
      <div className={styles.addModalContainer}>
        <div className={styles.titleTextModal}>Adauga {Tip}</div>
        <div className={styles.titleTextModal}>Materie: {student?.materii[Materie].nume}</div>
        <div style={{ width: "100%", marginTop: 30, marginLeft: 20 }}>
          {isNota ? (
            <div>
              <div style={{ left: 0 }}>ALEGE NOTA</div>
              <ReactDropdown
                options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                className={styles.selectGrade}
                onChange={(grade) => setSelectedGrade(parseInt(grade.value))}
              />
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
            dateFormat="Pp"
          />
        </div>
        <div style={{ display: "flex", marginTop: 30 }}>
          <div
            className={styles.addButton}
            onClick={() =>
              setNota(student?.nrMatricol, Materie, selectedGrade, convert(selectedDate))
            }
          >
            ADAUGA
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

export default AddModal;
