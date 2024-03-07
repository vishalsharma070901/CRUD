import { Route, Routes } from "react-router-dom";
import "./App.css";
import Update from "./Component/Update";
import Users from "./Component/Users";
import Create from "./Component/Create";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
