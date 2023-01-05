import { render  } from "@testing-library/react";
import StudentScreen from "./StudentScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/students?001",
  }),
}));

test("renders the student screen", () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/students?001" element={<StudentScreen />} />
      </Routes>
    </BrowserRouter>
  );
});
