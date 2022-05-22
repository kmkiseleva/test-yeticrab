import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import RequestsList from "./pages/RequestsList";

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<RequestsList />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
