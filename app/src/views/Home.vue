<template>
  <div class="home">
    <div class="container">
      <h3 class="mt-5 mb-3">
        <img src="/SC_logo.png" alt="show cacao" />
      </h3>
      <div class="container">
        <div id="searchBand">
          <form v-on:submit.prevent="searchForConcert">
            <input
              type="text"
              class="form-control mb-2"
              id="formGroupExampleInput"
              v-model="searchfield"
              placeholder="Metal ... Lenny Kravitz ... MyShowTimeTour ..."
            />
          </form>
          <button @click.prevent="searchForConcert" class="btn btn-primary mr-2">Concert</button>
          <button @click.prevent="searchBand" class="btn btn-primary mr-2">Groupe</button>
          <button @click.prevent="searchGenre" class="btn btn-primary mr-2">Genre</button>
          <button
            id="show-modal"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#settings"
          >Date</button>
        </div>
      </div>
      <div v-for="(concert, idx) in concerts" :key="idx">
        <div class="d-flex flex-column my-4">
          <a :name="concert.id "></a>
          <div class="d-flex flex-column">
            <h4 class="mt-4 font-weight-bold">{{concert.title}}</h4>
            <div class="d-flex flex-row flex-wrap justify-content-between">
              <h5>{{ concert.place}}</h5>
              <h5>{{ concert.date | moment("dddd Do MMMM YYYY à H:mm") }}</h5>
              <h4>
                {{ concert.price}} &euro;
                <router-link
                  :to="{ name: 'Ticket', params: {concertId: concert.id } }"
                  v-if="isLoggedIn"
                  class="ml-4 text-primary"
                >Acheter un billet</router-link>
              </h4>
            </div>
            <div class="mb-4">{{concert.description}}</div>
          </div>
          <div class="d-flex flex-row flex-wrap">
            <img
              :src="concert.picture"
              class="align-self-start mr-3 concert-img"
              :alt="concert.title"
            />
            <div class="d-flex flex-column">
              <div
                v-for="(band, gidx) in concert.bands"
                :key="gidx"
                class="mx-2 text-nowrap d-flex flex-row"
              >
                <div class="font-weight-bold text-primary">{{band}}</div>
                <div v-if="isLoggedIn" class="ml-2 text-info pointer" @click="addFavorite(band)">
                  <i class="fa fa-heart"></i>
                </div>
              </div>
              <div class="text-secondary font-weight-bold d-flex flex-row">
                <div v-for="(genre, gidx) in concert.genres" :key="gidx" class="mx-2">{{genre}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="settings"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-group row">
              <div class="col-12">
                <Datepicker v-model="date" :language="fr" inline name="date"></Datepicker>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="searchByDate"
              data-dismiss="modal"
            >Sélectionner</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Concert from "../apis/Concert.js";
import Band from "../apis/Band.js";
import Genre from "../apis/Genre.js";
import User from "../apis/User.js";
import Datepicker from "vuejs-datepicker";
import { fr } from "vuejs-datepicker/dist/locale";

export default {
  name: "Home",
  components: {
    Datepicker
  },
  data() {
    return {
      searchfield: "",
      isLoggedIn: false,
      concerts: [],
      user: {},
      date: "",
      fr: fr
    };
  },
  methods: {
    searchForConcert() {
      let txt = this.searchfield;
      txt
        ? Concert.searchConcert(txt).then(response => {
            this.concerts = response.data;
          })
        : Concert.getConcerts().then(response => {
            this.concerts = response.data;
          });
    },

    searchBand() {
      let txt = this.searchfield;
      txt
        ? Band.getBand(txt).then(response => {
            this.concerts = response.data;
          })
        : Concert.getConcerts().then(response => {
            this.concerts = response.data;
          });
    },

    searchGenre() {
      let txt = this.searchfield;
      txt
        ? Genre.getGenre(txt).then(response => {
            this.concerts = response.data;
          })
        : Concert.getConcerts().then(response => {
            this.concerts = response.data;
          });
    },

    searchByDate() {
      let jsonDate = this.date.toJSON();
      this.searchfield = jsonDate.substring(0, 10);
      Concert.getConcertByDate(this.searchfield).then(response => {
        this.concerts = response.data;
      });
    },

    addFavorite(band) {
      let favs = this.user.favorites;
      favs.push(band);
      User.saveFavorites(this.user.id, favs).then(() => {});
    }
  },
  mounted() {
    Concert.getConcerts().then(response => {
      this.concerts = response.data;
    });
    this.isLoggedIn = !!localStorage.getItem("token");
    User.auth().then(response => {
      this.user = response.data;
      this.isAdmin = this.user.role == "admin";
    });
  }
};
</script>
