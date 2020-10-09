<template>
  <div class="container">
    <div class="login-heading">
      <h6 for>Willkommen beim Lipro-System 4.0</h6>
      <h5 for>Lischke Consulting GmbH</h5>
    </div>
    <div class="white-block">
      <md-field>
        <label>Login Name</label>
        <md-input v-model="loginname"></md-input>
        <div class="error" v-if="!$v.loginname.required ">Login Name is required</div>
        <div
          v-if="!$v.loginname.minLength"
          class="error"
          style="color: red;"
        >Login Name must have at least {{$v.loginname.$params.minLength.min}} letters.</div>
      </md-field>

      <md-field>
        <label>Password</label>
        <md-input type="password" v-model="password"></md-input>
        <div class="error" v-if="!$v.password.required">Password is required</div>
        <div
          v-if="!$v.password.minLength"
          class="error"
          style="color: red;"
        >Password must have at least {{$v.password.$params.minLength.min}} letters.</div>
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
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Login",

  data() {
    return {
      password: "",
      loginname: "",
      // submitStatus: "",
      loader: false,
    };
  },
  methods: {
    login() {
      this.loader = true;
      UserService.login(this.loginname, this.password)
        .then((res) => {
          this.loader = false;
          router.push(`/consultant_plan`);
          router.go();
          localStorage.setItem("userToken", res.token);
          localStorage.setItem("userName", res.user.firstname);
          localStorage.setItem("headerTitlePassed", "Consultant Plan");
        })
        .catch((e) => {
          this.loader = false;
          // this.submitStatus = "ERROR";
          console.log(e);
        });
    },
  },
  validations: {
    loginname: {
      required,
      minLength: minLength(2),
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
};
</script>