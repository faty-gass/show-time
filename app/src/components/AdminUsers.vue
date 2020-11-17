<template>
  <div>
    <div class="table-responsive mt-4">
      <table class="table table-borderless">
        <tr v-for="(user, idx) in users" :key="idx" class="mx-3">
          <td>{{ user.name}}</td>
          <td>{{ user.email}}</td>
          <td>
            <div
              class="custom-switch custom-switch-xs custom-switch-label mt-1 d-flex flex-row flex-nowrap pl-0"
            >
              <div class="pr-2 pt-2">Admin</div>
              <input
                class="custom-switch-input"
                type="checkbox"
                :id="user.id"
                :checked="user.role=='admin'"
                :idx="idx"
                @click="toggleAdmin"
              />
              <label class="custom-switch-btn" v-bind:for="user.id"></label>
            </div>
          </td>
          <td>
            <button
              class="btn btn-danger btn-sm"
              :idx="idx"
              :id="user.id"
              @click="deleteUser"
            >Supprimer</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import AdminUser from "../apis/AdminUser.js";

export default {
  data() {
    return {
      users: []
    };
  },
  mounted() {
    AdminUser.getUsers().then(response => {
      this.users = response.data;
    });
  },
  methods: {
    toggleAdmin(e) {
      let role = e.target.checked ? "admin" : "user";
      AdminUser.setUser({ id: e.target.id, role: role }).then(() => {
        this.users[e.target.getAttribute("idx")].role = role;
      });
    },
    deleteUser(e) {
      AdminUser.deleteUser(e.target.id).then(() => {
        this.users.splice(e.target.getAttribute("idx"), 1);
      });
    }
  }
};
</script>
