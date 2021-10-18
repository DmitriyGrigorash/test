const initialState = {
  cities: [],
  error: null,
  loading: true,
};

export default function main(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CITY_WEATHER_SUCCESS':
      return {...state, cities: action.payload, loading: false};
    case 'FETCH_CITY_WEATHER_ERROR':
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
}
