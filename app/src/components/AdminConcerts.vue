<template>
  <div>
    <div class="text-right my-4">
      <router-link
        class="btn btn-primary"
        :to="{ name: 'EditConcert', params: {concertId: 'new' } }"
      >Ajouter un Concert</router-link>
    </div>
    <div class="table-responsive mt-4">
      <table class="table table-borderless">
        <tr v-for="(concert, idx) in concerts" :key="idx" class="mx-3">
          <td>{{ concert.title}}</td>
          <td>{{ concert.place}}</td>
          <td>{{ concert.date | moment("D/M/Y") }}</td>
          <td>
            <router-link
              class="btn btn-success btn-sm"
              :to="{ name: 'EditConcert', params: {concertId: concert.id } }"
            >Modifier</router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import AdminConcert from "../apis/AdminConcert.js";

export default {
  data() {
    return {
      concerts: []
    };
  },
  mounted() {
    AdminConcert.getConcerts().then(response => {
      this.concerts = response.data;
    });
  },
  methods: {}
};
</script>
