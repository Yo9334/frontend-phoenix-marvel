import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const Characters = ({ url, name }) => {
  // console.log("Characters -> name", name);

  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [skip, setSkip] = useState(0);
  // const [limit, setLimit] = useState(100);
  const limit = 100;

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/characters?skip=${skip}&limit=${limit}&name=${name}`
        );
        console.log(response.data);
        setCharacters(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [skip, limit, name, url]);

  return (
    <div className="container">
      <div className="Characters">
        {loading && <p>Loading...</p>}
        {!loading && (
          <div className="characters-main">
            <div className="pagination">
              <Pagination skip={skip} setSkip={setSkip} limit={limit} />
            </div>

            <div className="wrapper-characters">
              {characters.results.map((character, index) => {
                return (
                  <Link
                    to="/character"
                    state={{ character }}
                    key={index}
                    className="character-item"
                  >
                    <img
                      src={
                        character.thumbnail.path +
                        "." +
                        character.thumbnail.extension
                      }
                      alt={character.name}
                    />
                    <span>{character.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Characters;
