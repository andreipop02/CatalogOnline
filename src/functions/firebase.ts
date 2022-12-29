import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import app from "../firebase";

const base = getFirestore(app);

export const getStudents = async () => {
  const currentCollection = collection(base, "students");
  const studentsArray = await getDocs(currentCollection);
  let studentsArrayData: any = [];
  studentsArray.forEach((student) => studentsArrayData.push(student.data()))
  return studentsArrayData;
};

export const getStudentById = async (id: string) => {
    const currentCollection = doc(base, "students", id);
    const studentsArray = await getDoc(currentCollection);
    const studentsArrayData = studentsArray.data();
    return studentsArrayData;
  };

export const setElev = async () => {
  const currentDoc = doc(base, "students", "001");
  const studentsArray = await getDoc(currentDoc);
  const studentsArrayData = studentsArray.data();
  const docId = await setDoc(
    doc(base, "students", "011"),
    studentsArrayData
  ).then((response) => response);
  return docId;
};
