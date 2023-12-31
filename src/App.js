import "./App.css";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Products from "./Products";
import Login from "./Login";
import CreateProduct from "./CreateProduct";
import ProductsEdit from "./ProductsEdit";
import Register from "./Register";
import Profile from "./Profile";
function App() {


  return (
    <>
      <Router>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/CreateProduct" element={<CreateProduct />} />
            <Route path="/productsedit" element={<ProductsEdit />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />

          </Routes>
        </div>
        <Footer />
      </Router>

    </>
  );
}

export default App;
