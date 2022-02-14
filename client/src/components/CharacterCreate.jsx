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
  const allOccupations = useSelector((state) => state.occupations);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    nickname: "",
    birthday: "",
    img: "",
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
    console.log("LLENANDO INPUT ", input);
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
      img: "",
      status: "",
      occupations: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getOccupations());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <h1>Create your character!!!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name</label>
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
            value={input.img}
            name="img"
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
          {allOccupations.map((occ) => (
            <option value={occ.name}>{occ.name}</option>
          ))}
        </select>
        <ul>
          <li>{input.occupations.map((el) => el + " ,")}</li>
        </ul>
        <button type="submit">Create Character</button>{" "}
      </form>
      {input.occupations.map((el) => (
        <div>
          <p>{el}</p>
          <button onClick={() => handleDelete(el)}>X</button>
        </div>
      ))}
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { postCharacter, getOccupations } from "../redux/actions";
// import { useDispatch, useSelector } from "react-redux";


// let validationCheck = false;

// function validate(input) {
//     let errors = {};
//     if (!input.name || !input.nickname || !input.birthday || !input.status){
//         errors.error = "Complete the fields with *"
//     }
//     return errors;
// }

// export default function CharacterCreate() {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const allOccupations = useSelector((state) => state.occupations)
//     const [errors, setErrors] = useState({})

//     const [input, setInput] = useState({
//         name: "",
//         nickname: "",
//         birthday: "",
//         status: "",
//         img: "",
//         occupation: []
//     })

//     useEffect(()=>{
//         dispatch(getOccupations())
//     }, [dispatch])

//     function handleChange(e){
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value
//         })
//         setErrors(validate({
//             ...input,
//             [e.target.name]: e.target.value
//         }))
//     }

//     function handleCheck(e) {
//         if (e.target.checked) {
//             if(validationCheck) {
//                 e.target.checked = false;
//                 return alert("Only one choice!")
//             }
//             validationCheck = true;
//             setInput({
//                 ...input,
//                 status: e.target.value
//             })
//         } else {
//             validationCheck = false;
//             setInput({
//                 ...input,
//                 status: ""
//             })
//         }
//     }

//     function handleSelect(e) {
//         if(!input.occupation.includes(e.target.value)){
//             setInput({
//                 ...input,
//                 occupation: [...input.occupation, e.target.value]
//             })
//         }
//     }

//     function handleSubmit(e) {
//         e.preventDefault();
//         if (input.name && input.nickname && input.birthday && input.status){
//             dispatch(postCharacter(input));
//             alert("Character created.");
//             setInput({
//                 name: "",
//                 nickname: "",
//                 birthday: "",
//                 status: "",
//                 img: "",
//                 occupation: []
//             })
//             validationCheck = false;
//             history.push("/home");
//         } else {
//             alert("Complete the fields with *")
//         }
//     }

//     function handleDelete(e){
//         setInput({
//             ...input,
//             occupation: input.occupation.filter(el => el !== e)
//         })
//     }

//     return (
//         <div >
//             <nav >

//                 <Link to = '/home'>
//                     <button >Go Home</button>
//                 </Link>
//             </nav>
//             <div >
//                 <h1>Create your character!</h1>
//                 <div >
//                     <form onSubmit={e=>handleSubmit(e)}>
//                         <div >
//                             <div>
//                                 <h4>Name*:</h4>
//                                 <input
//                                     type="text"
//                                     value={input.name}
//                                     name="name"
//                                     onChange={e => handleChange(e)}
//                                     />
//                             </div>
//                             <div>
//                                 <h4>Nickname*:</h4>
//                                 <input
//                                     type="text"
//                                     value={input.nickname}
//                                     name="nickname"
//                                     onChange={e => handleChange(e)}
//                                     />
//                             </div>
//                             <div>
//                                 <h4>Birthday*:</h4>
//                                 <input
//                                     type="text"
//                                     value={input.birthday}
//                                     name="birthday"
//                                     onChange={e => handleChange(e)}
//                                     />
//                             </div>
//                             <h4>Image URL:</h4>
//                             <input
//                                 type="text"
//                                 value={input.img}
//                                 name="img"
//                                 onChange={e => handleChange(e)}
//                                 />
//                         </div>
//                         <div >
//                                 <h4>Status*:</h4>
//                             <div >
//                                 <label><input
//                                     type="checkbox"
//                                     value="Alive"
//                                     name="Alive"
//                                     onChange={e => handleCheck(e)} />Alive</label>
//                                 <label><input
//                                     type="checkbox"
//                                     value="Deceased"
//                                     name="Deceased"
//                                     onChange={e => handleCheck(e)} />Deceased</label>
//                                 <label><input
//                                     type="checkbox"
//                                     value="Presumed dead"
//                                     name="Presumed dead"
//                                     onChange={e => handleCheck(e)} />Presumed dead</label>
//                                 <label><input
//                                     type="checkbox"
//                                     value="Unknown"
//                                     name="Unknown"
//                                     onChange={e => handleCheck(e)} />Unknown</label>
//                             </div>
//                             <h4>Occupations:</h4>
//                             <select onChange={e => handleSelect(e)}>
//                                 <option value="Occupations">Occupations</option>
//                                 {
//                                     allOccupations.sort((a, b) => {
//                                       if (a.name > b.name) {
//                                         return 1;
//                                       }
//                                       if (a.name < b.name) {
//                                         return -1;
//                                       }
//                                       return 0;
//                                     })
//                                     ?.map(el => (
//                                         <option key={el.id} value={el.name}>{el.name}</option>
//                                     ))
//                                 }
//                             </select>
//                         </div>
//                         <div >
//                             <button type='submit' >Create Character</button>
//                             {
//                                 errors.error && (
//                                     <p>{errors.error}</p>
//                                 )
//                             }
//                          </div>
//                     </form>
//                     <div>
//                         <h4>Occupations selected:</h4>
//                         <ul >
//                             {
//                                 input.occupation.map(el => (
//                                     <li>{el}<button type="button" onClick={() => handleDelete(el)} >X</button></li>
//                                 ))
//                             }
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
