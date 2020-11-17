<template>
  <div>
    <div class="container px-0 py-4" v-if="isAdmin">
      <nav class="nav nav-pills flex-column flex-sm-row nav-justified">
        <router-link :to="{ path: '/admin' }" class="flex-sm-fill text-center nav-link">Utilisateurs</router-link>
        <router-link
          :to="{ name: 'AdminConcerts' }"
          class="flex-sm-fill text-center nav-link"
        >Concerts</router-link>
        <router-link
          :to="{ name: 'AdminStats' }"
          class="flex-sm-fill text-center nav-link"
        >Statistiques</router-link>
      </nav>
      <router-view></router-view>
    </div>
    <div v-else class="my-5 text-center">Bien tenté!</div>
  </div>
</template>

<script>
import User from "../apis/User";

export default {
  data() {
    return {
      isAdmin: false
    };
  },
  mounted() {
    User.auth().then(response => {
      this.isAdmin = response.data.role == "admin";
    });
  }
};
</script>
