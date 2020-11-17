import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import AdminUsers from "../components/AdminUsers.vue";
import Concert from "../views/Concert.vue";
import AdminConcerts from "../components/AdminConcerts.vue";
import Admin from "../views/Admin.vue";
import EditConcert from "../components/EditConcert.vue";
import AdminStats from "../components/AdminStats.vue";
import Ticket from "../views/Ticket.vue";
import MyAccount from "../components/MyAccount.vue";
import Favorites from "../components/Favorites.vue";
import Tickets from "../components/Tickets.vue";
import RecapTicket from "../views/RecapTicket.vue";

/* function isLoggedIn () {
  return localStorage.getItem("token")
} */

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/concert",
    name: "Concert",
    component: Concert,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/editconcert/:concertId",
    name: "EditConcert",
    component: EditConcert
  },
  {
    path: "/ticket/:concertId",
    name: "Ticket",
    component: Ticket
  },
  {
    path: "/admin",
    component: Admin,
    children: [
      {
        name: "Admin",
        path: "",
        component: AdminUsers
      },
      {
        name: "AdminConcerts",
        path: "admin-concerts",
        component: AdminConcerts
      },
      {
        path: "/stats",
        name: "AdminStats",
        component: AdminStats
      }
    ]
  },
  {
    path: "/profile",
    component: Profile,
    children: [
      {
        name: "Profile",
        path: "",
        component: MyAccount
      },
      {
        name: "Favorites",
        path: "favorites",
        component: Favorites
      },
      {
        path: "tickets",
        name: "Tickets",
        component: Tickets
      }
    ]
  },
  {
    path: "/my-ticket/:ticketId",
    name: "RecapTicket",
    component: RecapTicket
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
