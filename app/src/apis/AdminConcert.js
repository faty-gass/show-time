import Api from "./Api";
export default {

  getConcert(concertId) {
    return Api().get("/concerts/admin/" + concertId);
  },
  getConcerts() {
    return Api().get("/concerts/admin");
  },
  updateConcert(payload) {
    return Api().patch("/concerts/admin/" + payload.id, payload.data);
  },
  addConcert(payload) {
    return Api().post("/concerts/admin/", payload);
  },
  deleteConcert(concertId) {
    return Api().delete("/concerts/admin/" + concertId);
  }

};
