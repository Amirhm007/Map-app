import { useReducer } from "react";
import React from "react";
import { createContext, useContext } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";
function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isloading, setIsloading] = useState(false);
  // const [currentCity, setCurrentCity] = useState(null);
  const initialState = {
    cities: [],
    isloading: false,
    currentCity: null,
    error: "",
  };
  function reducer(state, action) {
    switch (action.type) {
      case "city/loaded":
        return { ...state, isloading: false, currentCity: action.payload };

      case "loading":
        return { ...state, isloading: true };

      case "cities/loaded":
        return { ...state, isloading: false, cities: action.payload };

      case "city/created":
        return {
          ...state,
          isloading: false,
          cities: [...state.cities, action.payload],
          currentCity: action.payload,
        };

      case "city/deleted":
        return {
          ...state,
          isloading: false,
          cities: state.cities.filter((city) => city.id !== action.payload),
        };

      case "rejected":
        return { ...state, isloading: false, error: action.payload };
      default:
        throw new Error("error");
    }
  }
  const [{ cities, isloading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "rejected", payload: "error fetching cities data" });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === Number(currentCity.id)) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      console.error(err);
      dispatch({
        type: "rejected",
        payload: "there was an error loading the city...",
      });
    }
  }
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error creating the city...",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error deleting the city...",
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isloading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("CitiesContext was used outside the citiesprovider");
  }
  return context;
}
export { CitiesProvider, useCities };
