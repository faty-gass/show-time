<template>
  <div>
    <div class="d-flex flex-row justify-content-around flex-wrap mt-5">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 px-2">
        <!-- CARD FAVORITE -->
        <div class="card my-2">
          <div class="card-header text-center">
            <div>Mes Artistes Favoris</div>
          </div>
          <div class="card-body d-flex flex-column">
            <div class="d-flex flex-row flex-nowrap justify-content-center">
              <div>
                <input
                  v-model="favForm.newFav"
                  id="add-fav"
                  type="text"
                  class="mr-3"
                  required
                  placeholder="Ajouter un artiste"
                />
              </div>
              <div>
                <button type="submit" @click.prevent="saveFavorites" class="btn btn-primary">Ajouter</button>
              </div>
            </div>
            <div class="d-flex flex-column mt-4">
              <div
                v-for="(fav, idx) in favForm.favs"
                :key="idx"
                class="mx-3 d-flex flex-row flex-wrap justify-content-between"
              >
                <div>{{ fav }}</div>
                <div>
                  <button
                    type="submit"
                    @click.prevent="removeFav(idx)"
                    class="btn btn-primary mb-1"
                  >Retirer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- CARD SUGGESTIONS -->
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 px-2">
        <div class="card my-2">
          <div class="card-header text-center">
            <div>Suggestions de concerts</div>
          </div>
          <div class="card-body d-flex flex-column">
            <div class="d-flex flex-column flex-nowrap justify-content-center">
              <div
                class="column text-center my-3 p-2 border shadow bg-white rounded"
                v-for="concert in suggestions"
                :key="concert._id"
              >
                <div class="font-weight-bold my-2">{{concert.title}}</div>
                <div class="row text center mx-3 mb-2">
                  <div v-for="item in concert.bands" :key="item" class="mx-2">{{item}}</div>
                </div>
                <b-button variant="primary" :href="'/ticket/'+concert._id">Voir</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- FIN card Suggestion-->
    </div>
  </div>
</template>

<script>
import User from "../apis/User";
export default {
  data: () => ({
    id: "",
    suggestions: {},
    favForm: {
      newFav: "",
      favs: []
    }
  }),
  mounted() {
    User.auth().then(response => {
      this.id = response.data.id;
      this.favForm.favs = response.data.favorites;
      User.getSuggestion(response.data.id).then(response => {
        this.suggestions = response.data;
      });
    });
  },
  methods: {
    saveFavorites() {
      if (this.favForm.newFav !== "") {
        this.favForm.favs.push(this.favForm.newFav);
        User.saveFavorites(this.id, this.favForm.favs).then(() => {
          this.favForm.newFav = "";
          User.getSuggestion(this.id).then(response => {
            this.suggestions = response.data;
          });
        });
      }
    },
    removeFav(idx) {
      this.favForm.favs.splice(idx, 1);
      User.saveFavorites(this.id, this.favForm.favs);
      User.getSuggestion(this.id).then(response => {
        this.suggestions = response.data;
      });
    }
  }
};
</script>
