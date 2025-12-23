import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default App;
