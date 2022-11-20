import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ url, handleToken }) => {
  console.log("url", url);
  console.log("handleToken", handleToken);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    if (errorMsg !== "") {
      setErrorMsg("");
    }

    try {
      const response = await axios.post(url + "/user/signup", {
        username: username,
        email: email,
        password: password,
      });

      console.log(response.data);

      if (response.data.token) {
        handleToken(response.data.token, response.data._id);
        navigate("/");
      } else {
        setErrorMsg("Error...");
      }
    } catch (error) {
      // console.log("error", error);
      //   if (error.response.status === 409) {
      //     setErrorMsg("Cet email existe déjà !");
      //   } else if (error.response.status === 400) {
      //     setErrorMsg("Veuillez remplir les champs.");
      //   } else {
      setErrorMsg(error.message);
      //   }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="Login--form">
      <form onSubmit={handleSubmit}>
        <h1>S'incrire</h1>

        <input
          type="text"
          name="username"
          id="username"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Adresse mail"
          value={email}
          required={true}
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
            S'incrire
          </button>
        </div>

        <Link to="/login">
          <span>Tu as déjà un compte ? Connecte-toi !</span>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
