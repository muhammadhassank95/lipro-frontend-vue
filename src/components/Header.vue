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
            <md-menu-content style="min-height:400px">
              <md-menu-item @click="onHeaderItemPressed('user')">Users</md-menu-item>
              <md-menu-item @click="onHeaderItemPressed('countries')">Countries</md-menu-item>
              <md-menu-item>User Categories</md-menu-item>
              <md-menu-item @click="onHeaderItemPressed('consultant funtions')">Constultant Functions</md-menu-item>
              <md-menu-item @click="onHeaderItemPressed('classification')">Classifications</md-menu-item>
              <md-menu-item @click="onHeaderItemPressed('branches')">Branches</md-menu-item>
              <md-menu-item @click="onHeaderItemPressed('themes')">Themes</md-menu-item>
              <md-menu-item>Public Holidays</md-menu-item>
              <md-menu-item @click="onHeaderItemPressed('system')">System Settings</md-menu-item>
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
          localStorage.setItem("headerTitlePassed", "User");
          router.push("/users");
          this.headerTitle = "User";
          break;
        case "countries":
          localStorage.setItem("headerTitlePassed", "Country");
          router.push("/countries");
          this.headerTitle = "Country";
          break;
        case "consultantPlan":
          localStorage.setItem("headerTitlePassed", "Consultant Plan");
          router.push("/consultant_plan");
          this.headerTitle = "Consultant Plan";
          break;
        case "branches":
          localStorage.setItem("headerTitlePassed", "Branch");
          router.push("/branch");
          this.headerTitle = "Branch";
          break;
        case "themes":
          localStorage.setItem("headerTitlePassed", "Theme");
          router.push("/theme");
          this.headerTitle = "Theme";
          break;
        case "consultant funtions":
          localStorage.setItem("headerTitlePassed", "Consultant Funtions");
          router.push("/consultant_funtions");
          this.headerTitle = "Consultant Funtions";
          break;
        case "classification":
          localStorage.setItem("headerTitlePassed", "Classifications");
          router.push("/classification");
          this.headerTitle = "Classifications";
          break;
        case "system":
          localStorage.setItem("headerTitlePassed", "System Settings");
          router.push("/system-settings");
          this.headerTitle = "System Settings";
          break;
      }
    },
  },
};
</script>