import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOccupations, postCharacter } from "../redux/actions";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Completar el Campo Name";
  } else if (!input.nickname) {
    errors.nickname = "Completar el Campo Nickname";
  }
  return errors;
}

export default function CharacterCreated() {
  const dispatch = useDispatch();
  const history = useHistory();
  const occupations = useSelector((state) => state.occupations);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    nickname: "",
    birthday: "",
    status: "",
    occupations: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        status: e.target.value,
      });
    }
  }

  function handleSelect(e) {
    setInput({
      ...input,
      occupations: [...input.occupations, e.target.value],
    });
  }

  function handleDelete(el) {
    setInput({
      ...input,
      occupations: input.occupations.filter((occ) => occ !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postCharacter(input));
    alert("Character Created!!!");
    setInput({
      name: "",
      nickname: "",
      birthday: "",
      image: "",
      status: "",
      occupations: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getOccupations());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <h1>Create your character!!!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Nickname</label>
          <input
            type="text"
            value={input.nickname}
            name="nickname"
            onChange={(e) => handleChange(e)}
          />
          {errors.nickname && <p className="error">{errors.nickname}</p>}
        </div>
        <div>
          <label>Birthday</label>
          <input
            type="text"
            value={input.birthday}
            name="birthday"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Status:</label>
          <label>
            <input
              type="checkbox"
              value="Alive"
              name="Alive"
              onChange={(e) => handleCheck(e)}
            />
            Alive
          </label>
          <label>
            <input
              type="checkbox"
              value="Deceased"
              name="Deceased"
              onChange={(e) => handleCheck(e)}
            />
            Deceased
          </label>
          <label>
            <input
              type="checkbox"
              value="Unknown"
              name="Unknown"
              onChange={(e) => handleCheck(e)}
            />
            Unknown
          </label>
          <label>
            <input
              type="checkbox"
              value="Presumed dead"
              name="Presumed dead"
              onChange={(e) => handleCheck(e)}
            />
            Presumed dead
          </label>
        </div>
        <select onChange={(e) => handleSelect(e)}>
          {occupations.map((occ) => (
            <option value={occ.name}>{occ.name}</option>
          ))}
        </select>
        <ul>
          <li>{input.occupations.map((el) => el + " ,")}</li>
        </ul>
        <button type="submit">Create Character</button>{" "}
      </form>
      {input.occupations.map((el) => (
        <div className="divocc">
          <p>{el}</p>
          <button className="botonX" onClick={() => handleDelete(el)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}
