import React, { useReducer } from "react";
import axios from "axios";
export const mainContext = React.createContext();
const API = "http://localhost:8000/countries/";

const INIT_STATE = {
  posts: [],
  //countryToEdit: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_POSTES":
      return { ...state, posts: action.payload };
    //   case "GET_COUNTRY_TO_EDIT":
    //     return { ...state, countryToEdit: action.payload };
    default:
      return state;
  }
};

const MainContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  //   const getCountries = async (country) => {
  //     try {
  //       let res = await axios(API);
  //       dispatch({
  //         type: "GET_COUNTRIES",
  //         payload: res.data,
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   const editCountryPut = async (country) => {
  //     try {
  //       let res = await axios.put(API + country.id, country);
  //       dispatch({
  //         type: "GET_COUNTRY_TO_EDIT",
  //         payload: null,
  //       });
  //       getCountries();
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   const deleteCountry = async (id) => {
  //     try {
  //       let res = await axios.delete(API + id);
  //       dispatch({
  //         type: "GET_COUNTRY_TO_EDIT",
  //         payload: null,
  //       });
  //       getCountries();
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   const getCountryToEdit = async (id) => {
  //     try {
  //       let res = await axios(API + id);
  //       dispatch({
  //         type: "GET_COUNTRY_TO_EDIT",
  //         payload: res.data,
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   const addCountry = async (country) => {
  //     try {
  //       let res = await axios.post(API, country);
  //       getCountries();
  //     } catch (e) {
  //       console.log(e);
  //     }
  // };

  return (
    <mainContext.Provider value={{}}>{props.children}</mainContext.Provider>
  );
};

export default MainContextProvider;
