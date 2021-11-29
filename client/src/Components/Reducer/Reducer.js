const initialState = {
  render: [],
  refresh: 0,
  filtrado: [],
  notFound: false,
  dog: {},
  temperamentosRender: [],
};

function AppReducer(state = initialState, action) {
  switch (action.type) {
    case "PRECARGA":
      return {
        ...state,
        render: [...action.payload.dogs],
        filtrado: [],
        temperamentosRender: action.payload.temperamentos,
        notFound: false,
      };
    case "ORDER_BY":
      if (action.payload === "peso")
        return {
          ...state,
          render: state.render.sort(function (a, b) {
            return parseInt(a.weight.metric) - parseInt(b.weight.metric);
          }),
          filtrado: state.filtrado.sort(function (a, b) {
            return parseInt(a.weight.metric) - parseInt(b.weight.metric);
          }),
          refresh: state.refresh + 1,
        };
      if (action.payload === "alfabeticamente")
        return {
          ...state,
          render: state.render.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
          }),
          filtrado: state.filtrado.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
          }),
          refresh: state.refresh + 1,
        };
      return state;
    case "FILTRAR_POR_TEMPERAMENTO":
      if (action.payload !== "temperamento")
        return {
          ...state,
          filtrado: state.render.filter((e) =>
            e.temperament
              .replace(/, /g, "")
              .toLocaleLowerCase()
              .includes(action.payload.toLocaleLowerCase())
          ),
        };
      return {
        ...state,

        filtrado: [],
      };
    case "FILTRAR_RAZA_O_CREADA":
      if (action.payload === "Razas") {
        return {
          ...state,
          filtrado: [...state.render.filter((e) => typeof e.id === "number")],
          notFound: false,
        };
      } else if (action.payload === "Creadas") {
        return state.render.some((e) => typeof e.id === "string")
          ? (state = {
              ...state,
              filtrado: state.render.filter((e) => typeof e.id === "string"),
            })
          : (state = {
              ...state,
              notFound: true,
            });
      }
      return {
        ...state,
        notFound: false,
        filtrado: [],
      };
    case "DETAIL_DOG":
      return {
        ...state,
        dog: action.payload,
      };
    case "NOT_FOUND":
      return {
        ...state,
        notFound: true,
      };
    default:
      return state;
  }
}
export default AppReducer;
