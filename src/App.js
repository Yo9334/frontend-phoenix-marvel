import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comic from "./pages/Comic";
import Comics from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favorite from "./pages/Favorite";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || 0);
  const [searchByTitle, SetSearchByTitle] = useState("");
  const [searchByName, SetSearchByName] = useState("");

  library.add(faStar);

  const handleToken = (token, id) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("userId", id, { expires: 7 });
    } else {
      setToken(null);
      Cookies.remove("token");
      Cookies.remove("UserId");
    }
  };

  // const url = "http://localhost:4000";
  const url = "https://site--phoenix-marvel--t9jv7l54vjwq.code.run";

  /* search by title OU Name */
  const handleSearchByTitle = (event) => {
    event.preventDefault();
    SetSearchByTitle(event.target.value);
  };

  const handleSearchByName = (event) => {
    event.preventDefault();
    SetSearchByName(event.target.value);
  };

  return (
    <div className="App">
      <Router>
        <Header
          handleSearchByTitle={handleSearchByTitle}
          handleSearchByName={handleSearchByName}
          userToken={token}
          handleToken={handleToken}
        />
        <Routes>
          <Route
            path="/"
            element={<Comics url={url} title={searchByTitle} />}
          />
          <Route path="/comic" element={<Comic url={url} />} />
          <Route
            path="/characters"
            element={<Characters url={url} name={searchByName} />}
          />
          <Route path="/character" element={<Character />} />

          <Route
            path="/login"
            element={<Login url={url} handleToken={handleToken} />}
          />
          <Route
            path="/signup"
            element={<Signup url={url} handleToken={handleToken} />}
          />
          <Route
            path="/favorite"
            element={<Favorite url={url} handleToken={handleToken} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
