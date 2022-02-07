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

    case "FILTER_BY_STATUS":
      const allCharacters = state.allCharacters; //cdo vuelvo a hacer otro filtro vuelve a agarrar todos los personajes
      const statusFiltered =
        action.payload === "All"
          ? allCharacters
          : allCharacters.filter((el) => el.status === action.payload);
      return {
        ...state,
        characters: statusFiltered, //filtro el estado de personajes
      };
    case "FILTER_CREATED":
      // const allCharacters = state.allCharacters//
      const createdFilter =
        action.payload === "created"
          ? state.allCharacters.filter((el) => el.createdInDb)
          : state.allCharacters.filter((el) => !el.createdInDb);
      return {
        ...state,
        // characters: action.payload === "All" ? state.allCharacters : createdFilter//
        characters: createdFilter, //
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.characters.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.characters.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        characters: sortedArr,
      };

    default:
      return state;
  }
}

export default rootReducer;
