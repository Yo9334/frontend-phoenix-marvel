// import { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// // import { tab } from "@testing-library/user-event/dist/tab";

const Favorite = ({ url }) => {
  // let [comics, setComics] = useState([]);
  // let [characters, setCharacters] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const id = Cookies.get("userId");

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${url}/user/favorite?id=${id}`);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   return [];
  // };

  // const fetchDataCM = async (comics) => {
  //   try {
  //     comics?.forEach(async (element) => {
  //       const comic = await axios.get(`${url}/comic/${element}`);
  //       let tab1 = [...comics];
  //       tab1.push(comic.data);
  //       setComics(tab1);
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const fetchDataCH = async (characters_x) => {
  //   try {
  //     characters_x?.forEach(async (element) => {
  //       const character = await axios.get(`${url}/character/${element}`);
  //       let tab2 = [...characters];
  //       tab2.push(character.data);
  //       setCharacters(tab2);
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   const fetchDataRR = async () => {
  //     const result = await fetchData();
  //     await fetchDataCM(result.comics);
  //     await fetchDataCH(result.characters);
  //     setLoading(false);
  //   };

  //   fetchDataRR();
  // }, [id]);

  return <p>Favorite</p>;
};

export default Favorite;
