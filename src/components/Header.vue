<template>
  <div class="page-container">
    <div class="header">
      <div class="left-side inner-side">
        <img src="/lipro-logo.png" width="100" alt="lirpo-log" />
      </div>
      <template v-if="isHeader">
        <div class="middle-side inner-side">
          <div class="text-center">Users</div>
          <md-menu md-direction="bottom-start">
            <md-button md-menu-trigger>Data entry</md-button>
            <md-menu-content>
              <md-menu-item>My Item 1</md-menu-item>
              <md-menu-item>My Item 2</md-menu-item>
              <md-menu-item>My Item 3</md-menu-item>
            </md-menu-content>
          </md-menu>
          <md-menu md-direction="bottom-end">
            <md-button md-menu-trigger>Ausgaben/Übersichten</md-button>

            <md-menu-content>
              <md-menu-item>My Item 1</md-menu-item>
              <md-menu-item>My Item 2</md-menu-item>
              <md-menu-item>My Item 3</md-menu-item>
            </md-menu-content>
          </md-menu>
          <md-menu md-direction="bottom-end">
            <md-button md-menu-trigger>Administration</md-button>

            <md-menu-content>
              <md-menu-item @click="click">User</md-menu-item>
              <md-menu-item>My Item 2</md-menu-item>
              <md-menu-item>My Item 3</md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
        <div class="right-side inner-side">
          <label class="md-menu-trigger">user Name</label>
          <md-button @click="signout">SignOut</md-button>
          <img src="../assets/logo3.png" width="100" alt="lischke-logo3" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "Header",
  data: () => ({
    isHeader: localStorage.getItem("userToken"),
  }),
  methods: {
    signout() {
      localStorage.removeItem("userToken");
      router.push("/");
      router.go();
    },
    click() {
      console.log("aaa");
      router.push("/users");
      router.go();
    },
  },
};
</script>