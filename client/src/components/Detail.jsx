import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetail } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Detail(props) {
  console.log(props);
  // const [loading, setLoading] = useState(false)
  const myCharacter = useSelector((state) => state.detail);
  console.log(myCharacter);
  const dispatch = useDispatch();
  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getDetail(id));
    // return () =>
    //   dispatch({
    //     type: "GET_DETAILS",
    //     payload: [],
    //   });
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
            <h1>
              {myCharacter[0].name} ("{myCharacter[0].nickname}"){" "}
            </h1>
            <img src={myCharacter[0].img} alt="no hay imagen" />
            <h2>Status: {myCharacter[0].status}</h2>
            <h3>
              {" "}
              Birthday: <b> {myCharacter[0].birthday} </b>
            </h3>
            <h4>
              Occupations:{" "}
              <b>
                {!myCharacter[0].createdInDb
                  ? myCharacter[0].occupation + " "
                  : myCharacter[0].occupations.map((el) => el.name + " ")}
              </b>
            </h4>
          </div>
        ) : (
          <p>LOADING...</p>
        )}
        <Link to="/home">
          <button>Back</button>
        </Link>
      </div>
    );
  }
//   return (
//     <div>
//       <nav>
//         <Link to="/">
//           <h3>Breaking Bad</h3>
//         </Link>
//         <Link to="/home">
//           <button>Go home</button>
//         </Link>
//       </nav>
//       <div>
//         {myCharacter.length > 0 ? (
//           <div>
//             <div>
//               <img src={myCharacter[0].img} alt="Not found" />
//             </div>
//             <div>
//               <div>
//                 <h1>{myCharacter[0].name}</h1>
//               </div>
//               <div>
//                 <h3>Birthday:</h3>
//                 <h3>{myCharacter[0].birthday}</h3>
//               </div>
//               <div>
//                 <h3>Nickname:</h3>
//                 <h3>{myCharacter[0].nickname}</h3>
//               </div>
//             </div>
//             <div>
//               <div>
//                 <h4>Status:</h4>
//                 <h4>{myCharacter[0].status}</h4>
//               </div>
//               <div>
//                 <h4>Occupation:</h4>
//                 <h4>
//                   {myCharacter[0].occupation.map(
//                     (el) => el.toUpperCase() + ". "
//                   )}
//                 </h4>
//               </div>
//             </div>
//           </div>
//         ) : Object.values(myCharacter).length > 0 ? (
//           <div>
//             <div>
//               <img src={myCharacter.img} alt="Not found" />
//             </div>
//             <div>
//               <div>
//                 <h1>{myCharacter.name}</h1>
//               </div>
//               <div>
//                 <h3>Birthday:</h3>
//                 <h3>{myCharacter.birthday}</h3>
//               </div>
//               <div>
//                 <h3>Nickname:</h3>
//                 <h3>{myCharacter.nickname}</h3>
//               </div>
//             </div>
//             <div>
//               <div>
//                 <h4>Status:</h4>
//                 <h4>{myCharacter.status}</h4>
//               </div>
//               <div>
//                 <h4>Occupation:</h4>
//                 <h4>
//                   {myCharacter.occupations.map(
//                     (el) => el.name.toUpperCase() + ". "
//                   )}
//                 </h4>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// }
