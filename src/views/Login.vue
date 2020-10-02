<template>
  <div class="container">
    <div style="text-align: center; padding: 10px;">
      <h5 for>Willkommen beim Lipro-System 4.0</h5>
      <h5 for>Lischke Consulting GmbH</h5>
    </div>
    <div class="white-block">
      <md-field>
        <label>Login Name</label>
        <md-input v-model="loginname"></md-input>
      </md-field>

      <md-field>
        <label>Password</label>
        <md-input type="password" v-model="password"></md-input>
      </md-field>
    </div>
    <div class="action-btn">
      <md-button @click="login" class="md-dense md-raised md-primary">Login</md-button>
      <md-button class="md-dense md-raised md-primary">Forgot Password`</md-button>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user-service";
import router from "../router";
export default {
  name: "Login",

  data() {
    return {
      password: "",
      loginname: "",
    };
  },
  methods: {
    login() {
      UserService.login(this.loginname, this.password)
        .then((res) => {
          router.push(`/consultant_plan`);
          router.go();
          localStorage.setItem("userToken", res.token);
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>