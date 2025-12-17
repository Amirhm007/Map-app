import { useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { useCities } from "../contexts/CitiesContext";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isloading } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  const { cityName, emoji, date, notes } = currentCity || {};

  if (isloading) return <p>Loading...</p>;
  if (!currentCity) return <p>City not found.</p>;

  return (
    <div className="p-3 lg:p-7 max-h-[70vh] bg-gray-800 rounded-lg  w-full h-auto flex flex-col space-y-3">
      <div className="flex flex-col space-y-1">
        <h6 className="uppercase text-lg font-extrabold text-gray-300">
          City name {cityName}
        </h6>
        <h3 className="text-2xl flex items-center space-x-4">
          <span className="text-5xl leading-none">{emoji }</span> {cityName}
        </h3>
      </div>

      <div className="flex flex-col space-y-2">
        <h6 className="uppercase text-lg font-extrabold text-gray-300">
          You went to {cityName} on
        </h6>
        <p className="text-xl">{date ? formatDate(date) : "—"}</p>
      </div>

      {notes && (
        <div className="flex flex-col space-y-2">
          <h6 className="uppercase text-lg font-extrabold text-gray-300">
            Your notes
          </h6>
          <p className="text-xl">{notes}</p>
        </div>
      )}

      <div className="flex flex-col space-y-2 mt-4">
        <h6 className="uppercase text-lg font-extrabold text-gray-300">
          Learn more
        </h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
          className=" text-xl text-blue-400 hover:text-blue-500 transition-colors"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <BackButton />
    </div>
  );
}

export default City;
