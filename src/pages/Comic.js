import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comic = ({ url }) => {
  const location = useLocation();
  const { comic } = location.state;
  const [isActive, setIsActive] = useState(false);

  const id = Cookies.get("userId");
  // console.log("Comic - comic", comic);

  const handleFavorite = async (event) => {
    try {
      const response = await axios.post(url + "/user/favComics", {
        idUser: id,
        idComic: comic._id,
        active: !isActive,
      });
      console.log(response.data);
      setIsActive((current) => !current);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <div className="cc-bloc1">
        {comic !== null ? (
          <>
            <div className="cc-col1">
              <img
                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                alt={comic.title}
              />
              <span
                className={isActive ? "cc-fav fav-yellow" : "cc-fav fav-white"}
                onClick={handleFavorite}
              >
                <FontAwesomeIcon icon="star" />
              </span>
            </div>
            <div className="cc-col2">
              <h1>{comic.title}</h1>
              <p>{comic.description}</p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Comic;
