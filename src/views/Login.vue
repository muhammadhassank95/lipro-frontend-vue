<template>
  <div class="container">
    <div v-if="loader === false">
      <div class="login-heading">
        <h6 for>Willkommen beim Lipro-System 4.0</h6>
        <h5 for>Lischke Consulting GmbH</h5>
      </div>
      <div class="white-block">
        <md-field>
          <label>Login Name</label>
          <md-input v-model="loginname"></md-input>
          <div
            class="error"
            v-if="!$v.loginname.required && submitStatus === 'ERROR'"
          >Login Name is required</div>
          <div
            v-if="!$v.loginname.minLength && submitStatus === 'ERROR'"
            class="error"
          >Login Name must have at least {{$v.loginname.$params.minLength.min}} letters.</div>
        </md-field>

        <md-field>
          <label>Password</label>
          <md-input type="password" v-model="password"></md-input>
          <div
            class="error"
            v-if="!$v.password.required && submitStatus === 'ERROR'"
          >Password is required</div>
          <div
            v-if="!$v.password.minLength && submitStatus === 'ERROR'"
            class="error"
          >Password must have at least {{$v.password.$params.minLength.min}} letters.</div>
        </md-field>
      </div>
      <div v-if="submitStatus === 'ERROR'" class="error-form">{{ errorMessage }}</div>

      <div v-if="sendEmail && submitStatus === 'EMAIL SENT'" class="success-form"> {{ emailSentText }} </div>
      <div v-if="sendEmail && submitStatus === 'ERROR EMAIL SENT'" class="error-form"> {{ emailSentText }} </div>
      
      <md-dialog-prompt
        :md-active.sync="toOpenModal"
        v-model="sendEmail"
        md-title="Enter your Email Id"
        md-input-maxlength="50"
        md-input-placeholder="Type your Email..."
        @md-confirm="onConfirm"
        md-confirm-text="Send"
      />
      <div class="action-btn">
        <md-button @click="login" class="md-dense md-raised md-primary">Login</md-button>
        <md-button class="md-dense md-raised md-primary" @click="toOpenModal = true">Forgot Password</md-button>
      </div>
    </div>
    <div v-if="loader === true" class="loader">
      <vue-loaders-ball-clip-rotate color="blue" scale="1"></vue-loaders-ball-clip-rotate>
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
      submitStatus: "",
      loader: false,
      errorMessage: undefined,
      toOpenModal: false,
      sendEmail: undefined,
      emailSentText: undefined
    };
  },
  methods: {
    onConfirm() {
      UserService.forgotPasswordApi(this.sendEmail)
        .then((res)=> {
          this.emailSentText = res.message;
          this.submitStatus = 'EMAIL SENT';
        })
        .catch((e) => {
          console.log(e);
          this.submitStatus = 'ERROR EMAIL SENT';
          this.emailSentText = e.body.message;
        });
    },
    login() {
      this.loader = true;
      UserService.login(this.loginname, this.password)
        .then((res) => {
          this.loader = false;
          localStorage.setItem("userToken", res.token);
          localStorage.setItem("userName", res.user.firstname);
          localStorage.setItem("headerTitlePassed", "Consultant Plan");
          router.push(`/consultant_plan`);
          router.go();
        })
        .catch((e) => {
          this.loader = false;
          this.submitStatus = "ERROR";
          this.errorMessage = e.bodyText;
        });
    },
  },
  validations: {
    loginname: {
      required,
      minLength: minLength(2),
    },
    sendEmail: {
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