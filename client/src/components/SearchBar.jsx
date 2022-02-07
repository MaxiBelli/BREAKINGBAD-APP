import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCharacters } from "../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    //voy a guardar en mi estado local lo q vaya apareciendo en el input
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameCharacters(name)); //yo voy a ir guardando lo q esta tipeando el usuario en el estado local name
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search Character..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
