<template>
  <div class="home">
    <div class="container">
      <h3 class="mt-5">Billet</h3>

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
            <div v-if="!booked" class="my-auto mx-auto">
              <button
                type="submit"
                @click.prevent="addTicket"
                class="btn btn-primary mt-4"
              >Confirmer l'achat du billet {{ concert.price}} &euro;</button>
            </div>
            <div class="my-auto mx-auto">
              <canvas id="canvas"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Concert from "../apis/Concert.js";
import User from "../apis/User.js";
import QRCode from "qrcode";
export default {
  name: "Home",
  data() {
    return {
      concert: {},
      concertId: "",
      user: {},
      booked: false
    };
  },
  mounted() {
    this.concertId = this.$route.params.concertId;

    Concert.getConcert(this.concertId).then(response => {
      this.concert = response.data;
    });
    User.auth().then(response => {
      this.user = response.data;
      this.isAdmin = this.user.role == "admin";
    });
  },
  methods: {
    addTicket() {
      Concert.createTicket(this.concertId, this.user.id).then(response => {
        this.booked = true;
        QRCode.toCanvas(
          document.getElementById("canvas"),
          "/my-ticket/" + response.data["new ticket created"],
          { toSJISFunc: QRCode.toSJIS },
          function(error) {
            if (error) console.error(error);
          }
        );
      });
    }
  }
};
</script>
