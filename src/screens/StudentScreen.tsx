import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.module.scss";
import styles from "../App.module.scss";
import AddModal from "../components/AddModal";
import DeleteModal from "../components/DeleteModal";
import FeedbackModule from "../components/FeedbackModule";
import { getStudentById } from "../functions/firebase";

interface StudentsProps {
  nume: string;
  prenume: string;
  CNP: string;
  nrMatricol: string;
  materii: object[];
  clasa: number;
}

const StudentScreen = () => {
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<number>(0);
  const [isNota, setIsNota] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [student, setStudent] = useState<
    StudentsProps | DocumentData | undefined
  >();
  const location = useLocation();
  const documentId = location.search.substring(1);

  const getStudentData = async () => {
    const studentData = await getStudentById(documentId);
    if (studentData) setStudent(studentData);
  };

  useEffect(() => {
    getStudentData();
  }, [refresh, addModalVisible]);

  return (
    <div>
      <h1>
        {student?.nume} {student?.prenume}
      </h1>
      <table style={{ width: "100%" }}>
        <tr style={{ backgroundColor: "#15acda" }}>
          <th>Nr. Crt</th>
          <th>Materie</th>
          <th>Note</th>
          <th>Media</th>
          <th>Absente</th>
          <th></th>
        </tr>
        {student?.materii.map((materie: any, index: number) => {
          let sumaNote = 0;
          materie.note.map((nota: any) => (sumaNote = sumaNote + nota.valoare));
          const media = (sumaNote / materie.note.length).toFixed(2);
          return (
            <tr>
              <td>{index}</td>
              <td>{materie.nume}</td>
              <td>
                {materie.note.map((nota: any) => (
                  <div>
                    {nota.valoare} - {nota.data}
                  </div>
                ))}
              </td>
              <td>{media}</td>
              <td>
                {materie.absente.map((absenta: any) => (
                  <div>{absenta}</div>
                ))}
              </td>
              <td>
                <div className={styles.buttonsContainer}>
                  <div
                    className={styles.mainButtonAdd}
                    onClick={() => {
                      setSelectedClass(index);
                      setType("Nota");
                      setIsNota(true);
                      setAddModalVisible(true);
                    }}
                  >
                    ADAUGA NOTA
                  </div>
                  <div
                    className={styles.mainButtonAdd}
                    onClick={() => {
                      setSelectedClass(index);
                      setType("Absenta");
                      setIsNota(false);
                      setAddModalVisible(true);
                    }}
                  >
                    ADAUGA ABSENTA
                  </div>
                  <div
                    className={styles.mainButtonDelete}
                    onClick={() => {
                      setSelectedClass(index);
                      setType("Nota");
                      setIsNota(true);
                      setDeleteModalVisible(true);
                    }}
                  >
                    STERGE NOTA
                  </div>
                  <div
                    className={styles.mainButtonDelete}
                    onClick={() => {
                      setSelectedClass(index);
                      setType("Absenta");
                      setIsNota(false);
                      setDeleteModalVisible(true);
                    }}
                  >
                    STERGE ABSENTA
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </table>
      {addModalVisible ? (
        <AddModal
          student={student}
          Tip={type}
          Materie={selectedClass}
          isNota={isNota}
          setModalVisible={setAddModalVisible}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ) : null}
      {deleteModalVisible ? (
        <DeleteModal
          student={student}
          Tip={type}
          Materie={selectedClass}
          isNota={isNota}
          setModalVisible={setDeleteModalVisible}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ) : null}
      <FeedbackModule />
    </div>
  );
};

export default StudentScreen;
