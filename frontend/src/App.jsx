import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import StartPoint from "./components/home/StartPoint";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import Home from "./components/home/Home";
import { AuthProvider } from "./components/context/Auth";
import { ProtectedRoute } from "../helper";
import View from "./components/pages/View";
import Create from "./components/pages/Create";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<StartPoint />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <Create />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/view/:id"
              element={
                <ProtectedRoute>
                  <View />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
