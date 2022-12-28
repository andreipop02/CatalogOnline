import React from "react";
import "../App.module.scss";

const StudentsList = [
  {
    nume: "Pop",
    prenume: "Andrei",
    CNP: "5011202245025",
    NrMatricol: "213",
  },
  {
    nume: "Racz",
    prenume: "Catalin",
    CNP: "5011202245025",
    NrMatricol: "526",
  },
  {
    nume: "Pop",
    prenume: "Larisa",
    CNP: "5011202245025",
    NrMatricol: "765",
  },
  {
    nume: "Trif",
    prenume: "Patricia",
    CNP: "5011202245025",
    NrMatricol: "236",
  },
];

const MainScreen = () => {
  return (
    <div className="App">
      <table style={{ width: "100%" }}>
        <tr>
          <th style={{backgroundColor: "#15acda"}}>Nr. Crt</th>
          <th style={{backgroundColor: "#15acda"}}>Nume</th>
          <th style={{backgroundColor: "#15acda"}}>Prenume</th>
          <th style={{backgroundColor: "#15acda"}}>CNP</th>
          <th style={{backgroundColor: "#15acda"}}>Nr. Matricol</th>
          <th style={{backgroundColor: "#15acda"}}></th>
        </tr>
        {StudentsList.map((student, index) => {
          return (
            <tr>
              <td>{index}</td>
              <td>{student.nume}</td>
              <td>{student.prenume}</td>
              <td>{student.CNP}</td>
              <td>{student.NrMatricol}</td>
              <td onClick ={() => window.location.href = `/elev/${student.NrMatricol}`} style={{backgroundColor: "red", fontWeight: "bold", width: "150px", cursor: "pointer"}}>PAGINA ELEVULUI</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default MainScreen;
