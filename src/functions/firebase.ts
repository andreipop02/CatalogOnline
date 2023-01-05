import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";

import app from "../firebase";

const base = getFirestore(app);

export const getStudentsByClass = async (clasa: number) => {
  const currentCollection = collection(base, "students");
  const q = query(currentCollection, where("clasa", "==", clasa));
  const studentsArray = await getDocs(q);
  let studentsArrayData: any = [];
  studentsArray.forEach((student) => studentsArrayData.push(student.data()));
  return studentsArrayData;
};

export const getStudents = async () => {
  const currentCollection = collection(base, "students");
  const studentsArray = await getDocs(currentCollection);
  let studentsArrayData: any = [];
  studentsArray.forEach((student) => studentsArrayData.push(student.data()));
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

export const setNota = async (
  nrMatricol: string,
  materie: number,
  nota: number,
  date: Date | null | undefined
) => {
  const currentDoc = doc(base, "students", nrMatricol);
  const studentArray = await getDoc(currentDoc);
  const studentArrayData = studentArray.data();
  studentArrayData?.materii[materie].note.push({ data: date, valoare: nota });
  await updateDoc(doc(base, "students", nrMatricol), studentArrayData);
};

export const setAbsenta = async (
  nrMatricol: string,
  materie: number,
  date: Date | null | undefined
) => {
  const currentDoc = doc(base, "students", nrMatricol);
  const studentArray = await getDoc(currentDoc);
  const studentArrayData = studentArray.data();
  studentArrayData?.materii[materie].absente.push(date);
  await updateDoc(doc(base, "students", nrMatricol), studentArrayData);
};

export const stergeNota = async (
  nrMatricol: string,
  materie: number,
  date: Date | null | undefined
) => {
  const currentDoc = doc(base, "students", nrMatricol);
  const studentArray = await getDoc(currentDoc);
  let studentArrayData = studentArray.data();
  const filteredStudentArray = studentArrayData?.materii[materie].note.filter(
    (item: any) => item.data != date
  );
  if (studentArrayData)
    studentArrayData.materii[materie].note = filteredStudentArray;
  await updateDoc(doc(base, "students", nrMatricol), studentArrayData);
};

export const stergeAbsenta = async (
  nrMatricol: string,
  materie: number,
  date: Date | null | undefined
) => {
  const currentDoc = doc(base, "students", nrMatricol);
  const studentArray = await getDoc(currentDoc);
  const studentArrayData = studentArray.data();
  console.log(studentArrayData);
  const filteredStudentArray = studentArrayData?.materii[
    materie
  ].absente.filter((item: any) => item != date);
  if (studentArrayData)
    studentArrayData.materii[materie].absente = filteredStudentArray;
  await updateDoc(doc(base, "students", nrMatricol), studentArrayData);
};

export const addFeedback = async (
  nume: string,
  prenume: string,
  feedback: string,
  rol: string
) => {
  const docId = await addDoc(collection(base, "feedback"), {
    nume: nume,
    prenume: prenume,
    rol: rol,
    feedback: feedback,
  })
    .then((response) => response)
    .catch((e) => {
      throw e;
    });
  return docId;
};
