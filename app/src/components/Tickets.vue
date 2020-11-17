<template>
  <div>
    <div class="container">
      <h3 class="mt-5">Mes Billets</h3>
      <div v-for="ticket in this.tickets" :key="ticket.id" class="d-flex flex-column my-4">
        <div class="d-flex flex-row flex-wrap">
          <img
            :src="ticket.concert.picture"
            class="align-self-start mr-3 tickets-img"
            :alt="ticket.concert.title"
          />
          <div class="d-flex flex-column">
            <router-link :to="{ name: 'RecapTicket', params: {ticketId: ticket.id } }">
              <h5 class="font-weight-bold">{{ticket.concert.title}}</h5>
            </router-link>
            <h6>{{ ticket.concert.place}}</h6>
            <h6>{{ ticket.concert.date | moment("dddd Do MMMM YYYY à H:mm") }}</h6>
            <h6>{{ ticket.concert.price}} &euro;</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Concert from "../apis/Concert";
import User from "../apis/User";
export default {
  data: () => ({
    userId: "",
    tickets: []
  }),
  mounted() {
    User.auth().then(response => {
      this.userId = response.data;
      Concert.getUserTickets(this.userId).then(ticketResponse => {
        ticketResponse.data.forEach(ticket => {
          Concert.getConcert(ticket.concert_id).then(concertResponse => {
            this.tickets.push({ id: ticket.id, concert: concertResponse.data });
          });
        });
      });
    });
  } /* ,
  xmethods: {
    saveUser() {
      User.saveUser(this.id, this.userForm)
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
    resetPassword() {
      User.resetPassword(this.id, this.passForm)
        .then(() => {
          localStorage.removeItem("token");
          this.$router.push({ name: "Login" });
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    }
  } */
};
</script>
