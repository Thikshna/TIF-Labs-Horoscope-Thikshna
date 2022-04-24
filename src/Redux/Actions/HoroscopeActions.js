import axios from "axios";

export const HoroscopeActions = (payload) => {
  return { type: "DATA", payload };
};
export const fetchUserHoroscope = (payload) => {
  return { type: "GET_HOROSCOPE", payload };
};

export const updateReducer=(userData,horoscopeData)=>{

  return{type:"UPDATE_REDUCER" , payload:{userData,horoscopeData} }
}
export const setLoaderTrue=()=>{
return {type :"SET_LOADER_TRUE"}
}

export const fetchHoroscope = (sign,day) => {
  return async (dispatch) => {
    dispatch(setLoaderTrue())
    const options = {
      method: "POST",
      url: "https://sameer-kumar-aztro-v1.p.rapidapi.com/",
      params: { sign: sign, day: day },
      headers: {
        "X-RapidAPI-Host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        "X-RapidAPI-Key": "592ebf860fmshf7be26d28347bbdp10fdf2jsndc6b57a43da0",
      },
    };
    try {
      let res = await axios.request(options);
      let data = await res.data;
      dispatch(fetchUserHoroscope(data))
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
