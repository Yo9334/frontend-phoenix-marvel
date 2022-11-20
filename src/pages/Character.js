import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Character = ({ url }) => {
  const location = useLocation();
  const { character } = location.state;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const id = Cookies.get("userId");
  // console.log("Character - character", character);

  const handleFavorite = async (event) => {
    try {
      const response = await axios.post(url + "/user/favCharacters", {
        idUser: id,
        idCharacter: character._id,
        active: !isActive,
      });
      console.log(response.data);
      setIsActive((current) => !current);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // console.log("Character -> id", character._id);
      try {
        const response = await axios.get(`${url}/comics/${character._id}`);
        // console.log("Character - data", response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [character._id, url]);

  return (
    <div className="container">
      <div className="cc-bloc">
        <div className="cc-bloc1">
          {character !== null ? (
            <>
              <div className="cc-col1">
                <img
                  src={
                    character.thumbnail.path +
                    "." +
                    character.thumbnail.extension
                  }
                  alt={character.name}
                />

                <span
                  className={
                    isActive ? "cc-fav fav-yellow" : "cc-fav fav-white"
                  }
                  onClick={handleFavorite}
                >
                  <FontAwesomeIcon icon="star" />
                </span>
              </div>
              <div className="cc-col2">
                <h1>{character.name}</h1>
                <p>{character.description}</p>
              </div>
            </>
          ) : null}
        </div>

        <div className="cc-bloc2">
          {loading && <p>Loading...</p>}
          {!loading && character && (
            <div className="caroussel">
              {data.comics.map((comic, index) => {
                return (
                  <img
                    key={index}
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt={comic.title}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Character;
