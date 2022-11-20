import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ url, handleToken }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    if (errorMsg !== "") {
      setErrorMsg("");
    }

    try {
      const response = await axios.post(url + "/user/login", {
        email: email,
        password: password,
      });

      console.log(response.data);

      if (response.data.token) {
        handleToken(response.data.token, response.data._id);
        navigate("/");
      }
    } catch (error) {
      // console.log(error.message);
      if (error.response.status === 401 || error.response.status === 400) {
        setErrorMsg("L'email ou le mot de passe sont invalides !");
      } else {
        setErrorMsg(error.message);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="Login--form">
      <form onSubmit={handleSubmit}>
        <h2>Se connecter</h2>

        <input
          type="text"
          name="email"
          id="email"
          placeholder="Adresse email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          autoComplete="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

        <div className="Login--submit">
          <button type="submit" className="input-user">
            Se connecter
          </button>
        </div>
        <Link to="/signup">
          <span>Pas encore de compte ? Incris-toi !</span>
        </Link>
      </form>
    </div>
  );
};

export default Login;
