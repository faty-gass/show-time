<template>
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header text-center">Statistiques</div>
          <div class="card-body">
            <div class="col-md-4 col-form-label text-md-left">Nombre de concerts : {{totalConcert}}</div>

            <div class="bloc-list" id="list_concert">
              <b-table striped hover :items="allConcerts" :fields="fields">
                <template v-slot:cell(sold)="data">{{data.item.capacity - data.item.seats}}</template>
                <template v-slot:cell(ratio)="data">
                  <b-progress
                    :value="(data.item.capacity - data.item.seats) / data.item.capacity *100"
                    :max="100"
                    variant="info"
                    show-value
                    class="mb-3"
                  ></b-progress>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Stats from "../apis/Stats.js";

export default {
  data() {
    return {
      allConcerts: [],
      fields: [
        {
          key: "title",
          label: "Concert",
          sortable: true,
          class: "text-center"
        },
        { key: "capacity", label: "Capacité", class: "text-center" },
        { key: "sold", label: "Vendus", class: "text-center" },
        { key: "seats", label: "Restants", class: "text-center" },
        {
          key: "ratio",
          label: "Ratio"
        }
      ],
      totalConcert: ""
    };
  },
  mounted() {
    Stats.getAll().then(response => {
      this.allConcerts = response.data;
      this.totalConcert = response.data.length;
    });
  }
};
</script>
