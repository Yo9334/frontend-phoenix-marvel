import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const Home = ({ url, title }) => {
  console.log("Home -> title", title);

  const [loading, setLoading] = useState(true);
  const [comics, setComics] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/comics?skip=${skip}&limit=${limit}&title=${title}`
        );
        // console.log(response.data);
        setComics(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [skip, limit, title, url]);

  return (
    <div className="container">
      <div className="comics">
        {loading && <p>Loading...</p>}

        {!loading && (
          <div className="home-main">
            <div className="pagination">
              <Pagination
                skip={skip}
                setSkip={setSkip}
                limit={limit}
                setLimit={setLimit}
              />
            </div>

            <div className="wrapper-comics">
              {comics.results.map((comic, index) => {
                return (
                  <Link
                    to="/comic"
                    state={{ comic }}
                    key={index}
                    className="comic-item"
                  >
                    <img
                      src={
                        comic.thumbnail.path + "." + comic.thumbnail.extension
                      }
                      alt={comic.title}
                    />
                    <span>{comic.title}</span>
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

export default Home;
