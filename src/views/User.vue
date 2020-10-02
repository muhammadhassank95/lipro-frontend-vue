<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item">
      <UserSideBar></UserSideBar>
    </div>
    <div class="md-layout-item">
      <UserMid></UserMid>
    </div>
  </div>
</template>
<script>
import UserSideBar from "../components/UserSideBar";
import UserMid from "../components/UserMid";

export default {
  name: "User",
  components: {
    UserSideBar,
    UserMid,
  },
  data() {
    return {};
  },
};
</script>