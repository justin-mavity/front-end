import axiosWithAuth from "../../utils/axiosWithAuth";

export const FETCH_FUNDRAISERS_START = "FETCH_FUNDRAISERS_START";
export const FETCH_FUNDRAISERS_SUCCESS = "FETCH_FUNDRAISERS_SUCCESS";
export const FETCH_FUNDRAISERS_ERROR = "FETCH_FUNDRAISERS_ERROR";

export const fetchFundraisers = (id) => (dispatch) => {
  dispatch({ type: FETCH_FUNDRAISERS_START });
  axiosWithAuth()
    .get("api/fundraisers")
    .then((res) => {
      dispatch({
        type: FETCH_FUNDRAISERS_SUCCESS,
        payload: res.data.fundraisers,
      });
    })
    .catch((err) => {
      dispatch({ type: FETCH_FUNDRAISERS_ERROR, payload: err.message });
    });
};

export const FUNDRAISER_ADD = "FUNDRAISER_ADD";
export const FUNDRAISER_ADD_ERROR = "FUNDRAISER_ADD_ERROR";

export const addFundraiser = (
  newFundraiser,
  history,
  setFormValues,
  initialFormValues
) => (dispatch) => {
  axiosWithAuth()
    .post("api/fundraisers", newFundraiser)
    .then((res) => {
      console.log(res);
      dispatch({ type: FUNDRAISER_ADD, payload: res.data.fundraiser });
      history.push("/dashboard");
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FUNDRAISER_ADD_ERROR, payload: err.message });
    })
    .finally(() => {
      setFormValues(initialFormValues);
    });
};

export const FUNDRAISER_DELETE = "FUNDRAISER_DELETE";
export const FUNDRAISER_DELETE_ERROR = "FUNDRAISER_DELETE_ERROR";

export const deleteFundraiser = (id) => (dispatch) => {
  axiosWithAuth()
    .delete(`api/fundraisers/${id}`)
    .then((res) => {
      console.log(res);
      dispatch({ type: FUNDRAISER_DELETE, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FUNDRAISER_DELETE_ERROR, payload: err.message });
    });
};

export const FUNDRAISER_EDIT = "FUNDRAISER_EDIT";
export const FUNDRAISER_EDIT_ERROR = "FUNDRAISER_EDIT_ERROR";

export const editFundraiser = (id, data) => (dispatch) => {
  console.log(id, data);
  axiosWithAuth()
    .put(`api/fundraisers/${id}`, data)
    .then((res) => {
      console.log(res);
      dispatch({ type: FUNDRAISER_EDIT, payload: res.data.fundraiser });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FUNDRAISER_EDIT_ERROR, payload: err.stack });
    });
};
