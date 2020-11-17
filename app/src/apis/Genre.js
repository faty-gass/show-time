import Api from "./Api";
export default {
  getGenre(txt) {
    return Api().get("/concerts/genre/search/" + txt)
  }
};
