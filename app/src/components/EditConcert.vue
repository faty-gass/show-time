<template>
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header text-center">{{ editAction }} un Concert</div>
          <div class="card-body">
            <div class="form-group row">
              <label for="title" class="col-md-2 col-form-label text-md-right">Titre</label>
              <div class="col-md-10">
                <input
                  id="title"
                  type="text"
                  v-model="concert.title"
                  class="form-control"
                  required
                  autofocus
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="form-group row">
              <label for="description" class="col-md-2 col-form-label text-md-right">Description</label>
              <div class="col-md-10">
                <textarea
                  id="password"
                  type="password"
                  v-model="concert.description"
                  class="form-control"
                  required
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="form-group row">
              <label for="date" class="col-md-2 col-form-label text-md-right">Date</label>
              <div class="col-md-10">
                <datepicker v-model="concert.date" :language="fr" inline name="date"></datepicker>
              </div>
            </div>
            <div class="form-group row">
              <label for="place" class="col-md-2 col-form-label text-md-right">Lieu</label>
              <div class="col-md-10">
                <input id="place" type="text" v-model="concert.place" class="form-control" required />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="form-group row">
              <label for="capacity" class="col-md-2 col-form-label text-md-right">capacité</label>
              <div class="col-md-10">
                <input
                  id="capacity"
                  type="text"
                  v-model="concert.capacity"
                  class="form-control"
                  required
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="form-group row">
              <label for="genres" class="col-md-2 col-form-label text-md-right">Genres</label>
              <div class="col-md-10">
                <input
                  id="genres"
                  type="text"
                  v-model="concert.genres"
                  class="form-control"
                  required
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="form-group row">
              <label for="price" class="col-md-2 col-form-label text-md-right">Prix</label>
              <div class="col-md-10">
                <input id="price" type="text" v-model="concert.price" class="form-control" required />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="form-group row">
              <label for="bands" class="col-md-2 col-form-label text-md-right">Artistes</label>
              <div class="col-md-10">
                <input id="bands" type="text" v-model="concert.bands" class="form-control" required />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="form-group row">
              <label for="picture" class="col-md-2 col-form-label text-md-right">Image</label>
              <div class="col-md-10">
                <input
                  id="picture"
                  type="text"
                  v-model="concert.picture"
                  class="form-control"
                  required
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <button
                type="submit"
                @click.prevent="saveConcert"
                class="btn btn-primary mx-2"
              >Enregistrer</button>
              <button
                type="submit"
                @click.prevent="cancelEdit"
                class="btn btn-secondary mx-2"
              >Annuler</button>
              <button
                type="submit"
                @click.prevent="deleteConcert"
                class="btn btn-danger mx-2"
              >Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminConcert from "../apis/AdminConcert.js";
import Datepicker from "vuejs-datepicker";
import { en, fr } from "vuejs-datepicker/dist/locale";

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      editAction: "",
      concertId: "",
      concert: {},
      en: en,
      fr: fr
    };
  },
  mounted() {
    this.concertId = this.$route.params.concertId;

    if (this.concertId == "new") {
      this.editAction = "Ajouter";
      this.concert = {
        title: "",
        description: "",
        date: null,
        place: "",
        capacity: 0,
        genres: [],
        price: 0,
        bands: [],
        picture: ""
      };
    } else {
      this.editAction = "Modifier";
      AdminConcert.getConcert(this.concertId).then(response => {
        this.concert = response.data;
      });
    }
  },
  methods: {
    saveConcert() {
      if (!Array.isArray(this.concert.genres)) {
        this.concert.genres = this.concert.genres.split(",");
      }
      if (!Array.isArray(this.concert.bands)) {
        this.concert.bands = this.concert.bands.split(",");
      }

      if (this.concertId == "new") {
        AdminConcert.addConcert(this.concert).then(() => {
          this.$router.push({ name: "AdminConcerts" });
        });
      } else {
        AdminConcert.updateConcert({
          id: this.concert.id,
          data: this.concert
        }).then(() => {
          this.$router.push({ name: "AdminConcerts" });
        });
      }
    },
    deleteConcert() {
      AdminConcert.deleteConcert(this.concertId).then(() => {
        this.$router.push({ name: "AdminConcerts" });
      });
    },
    cancelEdit() {
      this.$router.push({ name: "AdminConcerts" });
    }
  }
};
</script>
