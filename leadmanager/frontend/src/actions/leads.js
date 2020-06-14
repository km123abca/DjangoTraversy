import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS } from "./types";

//GET LEADS
export const getLeads = () => (dispatch) => {
  axios
    .get("/leads/api/leads/")
    .then((res) => {
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    })
    // .catch((err) => {
    //   console.log("there was an error"); // why isnt the code below not working
    //   const errors = { msg: err.response.data, status: err.response.status };
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: errors,
    //   });
    // });
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//DELETE LEAD
export const deleteLead = (id) => (dispatch) => {
  axios
    .delete(`/leads/api/leads/${id}/`)
    .then((res) => {
      dispatch(createMessage({ leadDeleted: "lead Deleted" }));
      dispatch({
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch((err) => {
      console.log("there was an error");
      const errors = { msg: err.response.data, status: err.response.status };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

//ADD LEAD
export const addLead = (lead) => (dispatch) => {
  axios
    .post("/leads/api/leads/", lead)
    .then((res) => {
      dispatch(createMessage({ leadAdded: "lead Added" }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    // .catch((err) => {
    //   console.log("there was an error");
    //   const errors = { msg: err.response.data, status: err.response.status };
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: errors,
    //   });
    // });
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
