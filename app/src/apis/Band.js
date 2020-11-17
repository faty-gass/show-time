import Api from "./Api";
export default {
  getBand(txt) {
    return Api().get("/concerts/band/search/" + txt)
  }
};
