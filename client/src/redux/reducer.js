const initialState = {
  characters: [],
  allCharacters: [], //siempre va a tener todos mis personajes para q me ayude al filtrado
  occupations: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CHARACTERS":
      return {
        ...state,
        characters: action.payload,
        allCharacters: action.payload,
      };

    case "GET_NAME_CHARACTERS":
      return {
        ...state,
        characters: action.payload, //
      };

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload, //
      };

    case "GET_OCCUPATIONS":
      return {
        ...state,
        occupations: action.payload, //
      };

    case "POST_CHARACTER":
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default rootReducer;
