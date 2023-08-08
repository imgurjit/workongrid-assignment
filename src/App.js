import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import ReactGridLayout from "./component/ReactGridLayout/ReactGridLayout";
import CustomDropdownDemo from "./component/CustomDropdown/CustomDropdownDemo";

function App() {
  return (
    <div>
      <div className="App">
        <Link to="/q1">Click to view React Grid question Demo</Link>
        <Link to="/q2">Click to view Dropdown question Demo</Link>
      </div>
      <Routes>
        <Route
          path="/q1"
          element={
            <ReactGridLayout columns={3} noOfBoxes={20}></ReactGridLayout>
          }
        />
        <Route path="/q2" element={<CustomDropdownDemo></CustomDropdownDemo>} />
      </Routes>
    </div>
  );
}

export default App;
