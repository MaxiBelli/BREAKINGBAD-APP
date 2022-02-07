import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDetail } from "../redux/actions";
import { useDispatch , useSelector } from "react-redux";


export default function Detail(props){
    console.log(props)
    // const [loading, setLoading] = useState(false)
    const myCharacter = useSelector ((state) => state.detail)
    const dispatch = useDispatch()
    const {id} = props.match.params;


    useEffect(() => {
        dispatch(getDetail(id));
        return () =>
          dispatch({
            type: "GET_DETAILS",
            payload: [],
          });
      }, [id, dispatch]);

    // useEffect(() => {
    //     dispatch(getDetail(id))
    //         setLoading(true)
    // }, [id, dispatch]);

    // useEffect(() => {
    //     dispatch(getDetail(props.match.params.id));
    // },[dispatch])




// const [loading, setLoading] = useState(false)
// const myCharacter = useSelector(i => i.detail);
// const dispatch = useDispatch();

// useEffect(() => {
//     dispatch(getDetail(props.match.params.id))
//         setLoading(true)
// }, [dispatch]);

// return (

//     <div>
//         {loading?
//         <div>

//                 <h1>{myCharacter[0].name}</h1>
//                 <img src= {myCharacter[0].img} alt= "no hay imagen"/>
//                 <h2>Status: {myCharacter[0].status}</h2>
//                 <p>Birthday: {myCharacter[0].birthday}</p>
               
//                 <h4>Occupations</h4>
//                 {myCharacter.occupation?.map(i => (
//                     <h5>{i}</h5>
//                 ))}

            
//         </div> : 
//         <div>Loading</div>
//         } 
//         </div>
//     )
// };

return (
    <div>
      {myCharacter.length > 0 ? (
        <div>
          <h1>I'm {myCharacter[0].name}</h1>
          <img src={myCharacter[0].img} alt= "no hay imagen"/>
          <h2>Status: {myCharacter[0].status}</h2>
          <p>
            {" "}
            Birthday:<b> {myCharacter[0].birthday} </b>
          </p>
          <h4>
            Ocupaciones:
            {!myCharacter[0].createdInDb
              ? myCharacter[0].occupation + " "
              : myCharacter[0].occupations.map((el) => el.name + " ")}
          </h4>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>Back</button>
      </Link>
    </div>
  );
}
