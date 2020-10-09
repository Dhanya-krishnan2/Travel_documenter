import axios from "axios";

export default {

  //USER

  getUsers: function() {
    return axios.get("/api/user");
  },
  getUser: function(id) {
    return axios.get("/api/user/" + id);
  },
  deleteUser: function(id) {
    return axios.delete("/api/user/" + id);
  },
  updateUser: function(id, data) {
    return axios.put("/api/user/" + id, data);
  },

 //Trips

 uploadTrips: function(data){
    return axios.post("/api/trip/", data)
  },
  getTrips: function() {
    return axios.get("/api/trip/");
  },
  getTrip: function(id) {
    return axios.get("/api/trip/" + id);
  },
  updateTrip: function( data) {
    return axios.put("/api/trip/",data);
  },
  getTripsByUserId: function(id){
    return axios.get("/api/trip/userId/" + id)
  },
  deleteTrip: function(id) {
    return axios.delete("/api/trip/" + id);
  },
  
  
};
