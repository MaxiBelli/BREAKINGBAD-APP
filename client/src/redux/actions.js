import axios from "axios";

export function getCharacters() {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/characters", {});
    return dispatch({
      type: "GET_CHARACTERS",
      payload: json.data,
    });
  };
}

// export const getCharacters = () => {
//     return async(dispatch) => {
//         await axios.get("http://localhost:3001/characters")
//         .then(res => { dispatch
//             ({type: "GET_CHARACTERS", payload: res.data})})
//     }
//     }

export function getNameCharacters(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/characters?name=" + name
      );
      return dispatch({
        type: "GET_NAME_CHARACTERS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/characters/${id}`);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function filterCharactersByStatus(payload) {
  //lo q llega por payload es lo q le paso x componente. Es el value del imput
  return {
    type: "FILTER_BY_STATUS",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function getOccupations() {
  return async function (dispatch) {
    try {
      var info = await axios.get("http://localhost:3001/occupations", {});

      return dispatch({
        type: "GET_OCCUPATIONS",
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postCharacter(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/characters",
      payload
    );
    console.log(response);
    return {
      type: "POST_CHARACTER",
      response,
    };
  };
}
