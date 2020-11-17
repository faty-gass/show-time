<template>
  <div>
    <div class="container px-0 py-4">
      <nav class="nav nav-pills flex-column flex-sm-row nav-justified">
        <router-link :to="{ path: '/profile' }" class="flex-sm-fill text-center nav-link">Mon Compte</router-link>
        <router-link
          :to="{ name: 'Favorites' }"
          class="flex-sm-fill text-center nav-link"
        >Mes Favoris</router-link>
        <router-link :to="{ name: 'Tickets' }" class="flex-sm-fill text-center nav-link">Mes Billets</router-link>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>
