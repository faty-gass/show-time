<template>
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header text-center">Suggestions</div>
          <!-- Début de la card suggestion-->
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
                    <div class="font-weight-bold">{{concert.title}}</div>
                    <div class="row text center mx-3">
                      <div v-for="item in concert.bands" :key="item" class="mx-2">{{item}}</div>
                    </div>
                    <b-button variant="primary" :to="'/'">Voir</b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Fin de la card sugestion -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User.js";

export default {
  data() {
    return {
      id: "",
      suggestions: {}
    };
  },
  mounted() {
    User.auth().then(response => {
      this.id = response.data.id;
      User.getSuggestion(response.data.id).then(response => {
        this.suggestions = response.data;
      });
    });
  }
};
</script>
