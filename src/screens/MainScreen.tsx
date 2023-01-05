import React, { useEffect, useState } from "react";
import ReactDropdown from "react-dropdown";
import "../App.module.scss";
import {
  getStudents,
  getStudentsByClass,
} from "../functions/firebase";
import styles from "../App.module.scss";
import FeedbackModule from "../components/FeedbackModule";

interface StudentsProps {
  nume: string;
  prenume: string;
  CNP: string;
  nrMatricol: string;
  materii: object[];
  clasa: number;
}

const MainScreen = () => {
  const [students, setStudents] = useState<StudentsProps[]>([]);
  const [clasa, setClasa] = useState<number>(-1);

  const getAllStudents = async () => {
    const studentsArray = await getStudents();
    setStudents(studentsArray);
  };

  const getStudentsByClassFB = async (classa: number) => {
    const studentsArray = await getStudentsByClass(classa);
    setStudents(studentsArray);
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  useEffect(() => {
    if (clasa > 0) getStudentsByClassFB(clasa);
  }, [clasa]);
  return (
    <div className="App">
      <table style={{ width: "100%" }}>
        <div>Selecteaza CLASA</div>
        <ReactDropdown
          options={["5", "6", "7", "8"]}
          className={styles.selectGrade}
          onChange={(grade) => setClasa(parseInt(grade.value))}
        />

        <tr style={{ backgroundColor: "#15acda" }}>
          <th>Nr. Crt</th>
          <th>Nume</th>
          <th>Prenume</th>
          <th>CNP</th>
          <th>Nr. Matricol</th>
          <th></th>
        </tr>
        {students.map((student, index) => {
          return (
            <tr>
              <td
                style={{
                  fontWeight: "bold",
                  width: "150px",
                  cursor: "pointer",
                }}
              >
                {index + 1}
              </td>
              <td>{student.nume}</td>
              <td>{student.prenume}</td>
              <td>{student.CNP}</td>
              <td>{student.nrMatricol}</td>
              <td
                onClick={() =>
                  (window.location.href = `/elev?${student.nrMatricol}`)
                }
                style={{
                  backgroundColor: "red",
                  fontWeight: "bold",
                  width: "150px",
                  cursor: "pointer",
                }}
              >
                PAGINA ELEVULUI
              </td>
            </tr>
          );
        })}
      </table>
      <FeedbackModule />
    </div>
  );
};

export default MainScreen;
