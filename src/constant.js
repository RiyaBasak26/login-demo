export const BASE_URL = "https://ottadmin.imboxocinema.com/api";

export const API = {
  SIGNUP: `${BASE_URL}/signup`,
  EMAIL_VERIFY: `${BASE_URL}/email-verify`,
  LOGIN: `${BASE_URL}/login`,
  GET_USER_DETAILS: (id) => `${BASE_URL}/user-details/${id}`,
  UPDATE_PROFILE:`${BASE_URL}/user-update`,
  GET_CITY_BY_STATE: (stateId) => `${BASE_URL}/city/${stateId}`,
  GET_STATE_BY_COUNTRY: (countryId) => `${BASE_URL}/state/${countryId}`,
  GET_COUNTRIES: `${BASE_URL}/country`,
};