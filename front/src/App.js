import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
