import React from "react";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, date, emoji, position, id } = city;

  // const itemClasses =
  //   "flex gap-4 items-center bg-gray-700 rounded-lg py-4 px-8 border-l-[5px] border-emerald-500 cursor-pointer text-inherit no-underline hover:border-l-[5px] hover:border-emerald-400";
  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`flex gap-4 items-center bg-gray-700 rounded-lg py-4 px-8 border-l-[5px] 
         border-emerald-500 cursor-pointer text-inherit no-underline hover:border-l-[5px] hover:border-emerald-400 ${
           id === currentCity?.id ? "border-2 border-green-500" : ""
         } `}
      >
        <span className="text-3xl leading-none">{emoji}</span>
        <h3 className="text-xl font-semibold mr-auto">{cityName}</h3>
        <time className="text-lg">({formatDate(date)})</time>
        <button
          onClick={handleDelete}
          className="h-8 aspect-square rounded-full border-none bg-gray-800 text-gray-200 text-base font-normal cursor-pointer transition-all duration-200 hover:bg-emerald-500 hover:text-gray-800"
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
