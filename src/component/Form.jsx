import { useEffect, useState } from "react";
import React from "react";
import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import { useUrlPosition } from "../hooks/useUrlPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext.jsx";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const inputBaseClasses =
  "w-full p-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-100 placeholder-gray-400 transition-all text-base";
const btnBaseClasses =
  "py-2 px-4 rounded-md font-semibold text-sm transition-colors duration-200";
const btnPrimaryClasses = `${btnBaseClasses} cursor-pointer bg-emerald-500 text-gray-900 hover:bg-emerald-600`;

function Form() {
  const { mapLat: lat, mapLng: lng } = useUrlPosition();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const { createCity, isLoading } = useCities();
  useEffect(
    function () {
      if (!lat && !lng) return;

      async function FetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );

          const data = await res.json();

          if (!data.countryCode) throw new Error("That's not a city! 😉");

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      FetchCityData();
    },
    [lat, lng]
  );

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng) return <Message message="Start by clicking on the map" />;

  if (geocodingError) return <Message message={geocodingError} />;

  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    createCity(newCity);

    navigate("/app/cities");
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-gray-700 rounded-lg p-5 px-5 w-full flex flex-col gap-3 ${
        isLoading
          ? "pointer-events-none bg-gray-200 border-gray-200 text-gray-400"
          : ""
      }`}
    >
      <div className="flex flex-col gap-1 relative">
        <label htmlFor="cityName" className="text-gray-300 font-medium text-sm">
          City name
        </label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          className={inputBaseClasses}
        />
        <span className="absolute right-3 top-[2.4rem] text-2xl">{emoji}</span>
      </div>

      <div className="flex flex-col gap-1 relative">
        <label htmlFor="date" className="text-gray-300 font-medium text-sm">
          When did you go to {cityName}?
        </label>
        <DatePicker
          id="for"
          className={inputBaseClasses}
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="DD/MM/yyyy"
        />
      </div>

      <div className="flex flex-col gap-1 relative">
        <label htmlFor="notes" className="text-gray-300 font-medium text-sm">
          Notes about your trip to {cityName}
        </label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
          rows="4"
          className={inputBaseClasses}
          placeholder="Share your thoughts..."
        />
      </div>

      <div className="flex justify-between mt-3">
        <Button type="primary" className={btnPrimaryClasses}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
