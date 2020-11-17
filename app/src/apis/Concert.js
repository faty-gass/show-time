import Api from "./Api";
export default {
  searchConcert(txt) {
    return Api().get("/concerts/search/" + txt);
  },

  getConcerts() {
    return Api().get("/concerts");
  },
  getConcert(concertId) {
    return Api().get("/concerts/" + concertId);
  },
  createTicket(concertId, userId) {
    return Api().post("/tickets", { concert_id: concertId, user_id: userId, qr_code: "dummy" });
  },
  getUserTickets(userId) {
    return Api().get("/tickets", { user_id: userId });
  },

  getConcertByDate(txt) {
    return Api().get("/concerts/date/search/" + txt);
  },
  getTicketInfo(ticketId) {
    return Api().get("/tickets/" + ticketId);
  }
}
