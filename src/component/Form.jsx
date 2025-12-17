import { useState } from "react";
import React from "react";
import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import {useSearchParams } from "react-router-dom";

const inputBaseClasses =
  "w-full p-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-100 placeholder-gray-400 transition-all text-base";

const btnBaseClasses =
  "py-2 px-4 rounded-md font-semibold text-sm transition-colors duration-200";
const btnPrimaryClasses = `${btnBaseClasses} cursor-pointer bg-emerald-500 text-gray-900 hover:bg-emerald-600`;

function Form() {
  const [cityName, setCityName] = useState("");
  // const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [serachParms] = useSearchParams();
  const lat = serachParms.get("lat");
  const lng = serachParms.get("lng");
  return (
    <form className="bg-gray-700 rounded-lg p-5 px-5 w-full flex flex-col gap-3">
      <div className="flex flex-col gap-1 relative">
        <label htmlFor="cityName" className="text-gray-300 font-medium text-sm">
          City name
        </label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          className={inputBaseClasses}
          placeholder="Enter city name..."
        />
      </div>

      <div className="flex flex-col gap-1 relative">
        <label htmlFor="date" className="text-gray-300 font-medium text-sm">
          When did you go to {cityName}?
        </label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          className={inputBaseClasses}
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
