import React from "react";
import "../App.module.scss";
import styles from "../App.module.scss";
import AddModal from "../components/AddModal";

const StudentGrades = [
  {
    Materie: "Limba Romana",
    Note: [
      { nota: 5, data: "19.06.2022" },
      { nota: 3, data: "19.06.2022" },
      { nota: 7, data: "19.06.2022" },
      { nota: 10, data: "19.06.2022" },
    ],
    Medie: "nr",
    Absente: ["19.06.2022, 20.06.2022"],
  },
  {
    Materie: "Matematica",
    Note: [
      { nota: 5, data: "19.06.2022" },
      { nota: 3, data: "19.06.2022" },
      { nota: 7, data: "19.06.2022" },
      { nota: 10, data: "19.06.2022" },
    ],
    Medie: "nr",
    Absente: ["19.06.2022, 20.06.2022"],
  },
  {
    Materie: "Engleza",
    Note: [
      { nota: 5, data: "19.06.2022" },
      { nota: 3, data: "19.06.2022" },
      { nota: 7, data: "19.06.2022" },
      { nota: 10, data: "19.06.2022" },
    ],
    Medie: "nr",
    Absente: ["19.06.2022, 20.06.2022"],
  },
  {
    Materie: "Geografie",
    Note: [
      { nota: 5, data: "19.06.2022" },
      { nota: 3, data: "19.06.2022" },
      { nota: 7, data: "19.06.2022" },
      { nota: 10, data: "19.06.2022" },
    ],
    Medie: "nr",
    Absente: ["19.06.2022, 20.06.2022"],
  },
  {
    Materie: "Informatica",
    Note: [
      { nota: 5, data: "19.06.2022" },
      { nota: 3, data: "19.06.2022" },
      { nota: 7, data: "19.06.2022" },
      { nota: 10, data: "19.06.2022" },
    ],
    Medie: "nr",
    Absente: ["19.06.2022, 20.06.2022"],
  },
];

const StudentScreen = () => {
  return (
    <div>
      <table style={{ width: "100%" }}>
        <tr>
          <th style={{ backgroundColor: "#15acda" }}>Nr. Crt</th>
          <th style={{ backgroundColor: "#15acda" }}>Materie</th>
          <th style={{ backgroundColor: "#15acda" }}>Note</th>
          <th style={{ backgroundColor: "#15acda" }}>Media</th>
          <th style={{ backgroundColor: "#15acda" }}>Absente</th>
          <th style={{ backgroundColor: "#15acda" }}></th>
        </tr>
        {StudentGrades.map((grade, index) => {
          let sumaNote = 0;
          grade.Note.map((nota) => (sumaNote = sumaNote + nota.nota));
          const media = (sumaNote / grade.Note.length).toFixed(2);
          return (
            <tr>
              <td>{index}</td>
              <td>{grade.Materie}</td>
              <td>
                {grade.Note.map((nota) => (
                  <div>
                    {nota.nota} - {nota.data}
                  </div>
                ))}
              </td>
              <td>{media}</td>
              <td>
                {grade.Absente.map((absenta) => (
                  <div>{absenta}</div>
                ))}
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    alignItems: "space-between",
                  }}
                >
                  <div className={styles.mainButton}>ADAUGA NOTA</div>
                  <div className={styles.mainButton}>ADAUGA ABSENTA</div>
                </div>
              </td>
            </tr>
          );
        })}
      </table>
      <AddModal Tip={"nota"} Materie={"materie"} isNota={true} />
    </div>
  );
};

export default StudentScreen;
