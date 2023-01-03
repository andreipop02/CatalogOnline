import React, { useEffect, useState } from "react";
import "../App.module.scss";
import { getStudents, setElev } from "../functions/firebase";

interface StudentsProps {
  nume: string;
  prenume: string;
  CNP: string;
  nrMatricol: string;
  materii: object[];
}

const MainScreen = () => {
  const [students, setStudents] = useState<StudentsProps[]>([]);

  const getAllStudents = async () => {
    const studentsArray = await getStudents();
    setStudents(studentsArray);
  };

  useEffect(() => {
    getAllStudents();
  }, []);
  return (
    <div className="App">
      <table style={{ width: "100%" }}>
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
              <td>{index + 1}</td>
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
    </div>
  );
};

export default MainScreen;
