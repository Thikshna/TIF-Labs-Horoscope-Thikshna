const initialState = { userData: [], userHoroscope: [], loading: false };
const HoroscopeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DATA":
      localStorage.setItem("User_Data", JSON.stringify(action.payload));
      return { ...state, userData: action.payload };

    case "GET_HOROSCOPE":
      localStorage.setItem("Horoscope_Data", JSON.stringify(action.payload));

      return { ...state, userHoroscope: action.payload , loading:false };
    case "UPDATE_REDUCER":
      return {
        ...state,
        userHoroscope: action.payload.horoscopeData,
        userData: action.payload.userData,
      };
    case "SET_LOADER_TRUE":
      return {...state , loading : true};
    default:
      return { ...state };
  }
};
export default HoroscopeReducer;
