import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// // import { tab } from "@testing-library/user-event/dist/tab";

const Favorite = ({ url }) => {
  let [comics, setComics] = useState([]);
  let [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = Cookies.get("userId");

  /*
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/user/favorite?id=${id}`);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchDataCM = async (comics) => {
    const myData = await Promise.all(
      comics?.map(async (element) => {
        const comic = await axios.get(`${url}/comic/${element}`);
        return comic.data;
      })
    );

    console.log("rr", myData);
    setComics(myData);
  };

  const fetchDataCH = async (characters) => {
    const myData = await Promise.all(
      characters?.map(async (element) => {
        const character = await axios.get(`${url}/character/${element}`);
        return character.data;
      })
    );
    console.log("rr", myData);
    setCharacters(myData);
  };

  // useEffect(() => {
  //   const fetchDataRR = async () => {
  //     const result = await fetchData();
  //     await fetchDataCM(result.comics);
  //     await fetchDataCH(result.characters);
  //     setLoading(false);
  //   };
  //   fetchDataRR();
  // }, [id]);
*/

  useEffect(() => {
    const fetchDataRR = async () => {
      const response = await axios.get(`${url}/user/favorite?id=${id}`);
      const myData = await Promise.all(
        response.data.comics?.map(async (element) => {
          const comic = await axios.get(`${url}/comic/${element}`);
          return comic.data;
        })
      );
      // console.log("rr", myData);
      setComics(myData);

      const myData2 = await Promise.all(
        response.data.characters?.map(async (element) => {
          const character = await axios.get(`${url}/character/${element}`);
          return character.data;
        })
      );
      // console.log("rr", myData2);
      setCharacters(myData2);

      setLoading(false);
    };

    fetchDataRR();
  }, [id, url]);

  return (
    <div className="container">
      <div className="cc-bloc1">
        {loading && <p>Loading...</p>}
        {!loading && (
          <div className="favorite">
            <h1>Your characters</h1>
            <div className="fav-row">
              {characters.map((elem, index) => {
                return (
                  <div key={index}>
                    <img
                      key={index}
                      src={elem.thumbnail.path + "." + elem.thumbnail.extension}
                      alt={elem.name}
                    />
                  </div>
                );
              })}
            </div>
            <h1>Your comics</h1>
            <div className="fav-row">
              {comics.map((elem, index) => {
                return (
                  <div key={index}>
                    <img
                      key={index}
                      src={elem.thumbnail.path + "." + elem.thumbnail.extension}
                      alt={elem.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
