<template>
  <div class="home">
    <div class="container">
      <h3 class="my-5">Récapitulatif de votre billet</h3>
      <h5>Ticket n° {{ticket_id}}</h5>
      <!-- RECAP USER -->
      <div>
        <div>Nom : {{user.name}}</div>
        <div>Email : {{user.email}}</div>
      </div>
      <!-- RECAP USER -->
      <div class="d-flex flex-column my-4">
        <div class="d-flex flex-column">
          <h4 class="mt-4 font-weight-bold">{{concert.title}}</h4>
          <div class="d-flex flex-row flex-wrap justify-content-between">
            <h5>{{ concert.place}}</h5>
            <h5>{{ concert.date | moment("dddd Do MMMM YYYY à H:mm") }}</h5>
            <h4>{{ concert.price}} &euro;</h4>
          </div>
          <div class="mb-4">{{concert.description}}</div>
        </div>
        <div class="d-flex flex-row flex-wrap">
          <img
            :src="concert.picture"
            class="align-self-start mr-3 concert-img"
            :alt="concert.title"
          />
          <div class="text-primary font-weight-bold d-flex flex-column">
            <div
              v-for="(band, gidx) in concert.bands"
              :key="gidx"
              class="mx-2 text-nowrap d-flex flex-row"
            >
              <div>{{band}}</div>
            </div>
            <div class="text-secondary font-weight-bold d-flex flex-row">
              <div v-for="(genre, gidx) in concert.genres" :key="gidx" class="mx-2">{{genre}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Concert from "../apis/Concert.js";

export default {
  name: "Home",
  data() {
    return {
      ticket_id: "",
      concert: {},
      user: {}
    };
  },
  mounted() {
    this.ticket_id = this.$route.params.ticketId;

    Concert.getTicketInfo(this.$route.params.ticketId).then(response => {
      this.concert = response.data.concert_id;
      this.user = response.data.user_id;
    });
  },
  methods: {}
};
</script>
