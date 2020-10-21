<template>
  <div class="page-container">
    <div class="header">
      <div class="left-side inner-side">
        <img src="/lipro-logo.png" width="100" alt="lirpo-log" />
      </div>
      <template v-if="isHeader">
        <div class="middle-side inner-side">
          <div class="text-center">{{headerTitle}}</div>
          <md-menu>
            <md-button md-menu-trigger>Data entry</md-button>
            <md-menu-content>
              <md-menu-item>Customer</md-menu-item>
              <md-menu-item>Projects</md-menu-item>
              <md-menu-item>Time Registration</md-menu-item>
              <md-menu-item>List of Leads</md-menu-item>
            </md-menu-content>
          </md-menu>
          <md-menu>
            <md-button md-menu-trigger>Overviews</md-button>
            <md-menu-content>
              <md-menu-item>6 Months Plan</md-menu-item>
              <md-menu-item @click="onHeaderItemPressed('consultantPlan')">Consultant Plan</md-menu-item>
              <md-menu-item>Year Overview Customers</md-menu-item>
              <md-menu-item>Year Overview Projects</md-menu-item>
              <md-menu-item>Year Overview Consultants</md-menu-item>
              <md-menu-item>Year Overview Themes</md-menu-item>
              <md-menu-item>Year Overview Leads</md-menu-item>
              <md-menu-item>Archive</md-menu-item>
            </md-menu-content>
          </md-menu>
          <md-menu>
            <md-button md-menu-trigger>Administration</md-button>
            <md-menu-content>
              <md-menu-item @click="onHeaderItemPressed('user')">Users</md-menu-item>
              <md-menu-item @click="onHeaderItemPressed('countries')">Countries</md-menu-item>
              <md-menu-item>Constultant Functions</md-menu-item>
              <md-menu-item>Classifications</md-menu-item>
              <md-menu-item>Branches</md-menu-item>
              <md-menu-item>Themes</md-menu-item>
              <md-menu-item>Public Holidays</md-menu-item>
              <md-menu-item>System Settings</md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
        <div class="right-side inner-side">
          <label class="md-menu-trigger" style="margin-bottom: 0;">{{ headerUserName }}</label>
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
    headerUserName: localStorage.getItem("userName"),
    headerTitle: localStorage.getItem("headerTitlePassed"),
  }),
  methods: {
    signout() {
      router.push("/");
      router.go();
      this.isHeader = '';
      this.headerUserName = '';
      this.headerTitle = '';
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("headerTitlePassed");
    },
    onHeaderItemPressed(item) {
      switch (item) {
        case "user":
          router.push("/users");
          this.headerTitle = "Users";
          localStorage.setItem("headerTitlePassed", "User");
          break;
        case "countries":
          router.push("/countries");
          localStorage.setItem("headerTitlePassed", "Country");
          this.headerTitle = "Countries";
          break;
        case "consultantPlan":
          router.push("/consultant_plan");
          localStorage.setItem("headerTitlePassed", "Consultant Plan");
          this.headerTitle = "Consultant Plan";
          break;
      }
    },
  },
};
</script>