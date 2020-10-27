<template>
  <div class="container">
    <div class="login-heading">
      <h6>Fill in the Form to Reset Your Password</h6>
      <h5>Enter New Password</h5>
    </div>
    <div class="white-block">
      <md-field>
        <label>New Password</label>
        <md-input type="password" v-model="password"></md-input>
        <div
          class="error"
          v-if="!$v.password.required && submitStatus === 'ERROR'"
        >Password is required.</div>
        <div
          class="error"
          v-if="!$v.password.minLength"
        >Password must have at least {{ $v.password.$params.minLength.min }} letters.</div>
      
      </md-field>

      <md-field>
        <label>Confirm New Password</label>
        <md-input type="password" v-model="confirmPassword"></md-input>
        <div
          class="error"
          v-if="!$v.confirmPassword.sameAsPassword"
        >Passwords must be identical.</div>
      </md-field>
      <div v-if="submitStatus === 'SUCCESS' " class="success-form">
        {{ resetPasswordText }}
        <a href="/">Login Now</a>
      </div>
      <div v-if="submitStatus === 'ERROR' " class="error-form">{{ resetPasswordText }}</div>

      <div class="action-btn">
        <md-button @click="onSave" class="md-dense md-raised md-primary">Save</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user-service.js'
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "ResetPassword",
  data() {
    return {
      password: undefined,
      confirmPassword: undefined,
      submitStatus: '',
      resetPasswordText: ''
    }
  },
  props: {
    param: {
        type: undefined,
    }
  },
  mounted() {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("headerTitlePassed");
  },
  methods: {
    onSave() {
      UserService.resetPasswordApi(this.password, this.param.token)
        .then((res) => {
          this.submitStatus = 'SUCCESS'
          this.resetPasswordText = res.message;
        })
        .catch((e) =>{
          this.resetPasswordText = e.body.message;
          this.submitStatus = 'ERROR'
        })
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
    confirmPassword: {
      sameAsPassword: sameAs("password"),
    },
  },
}
</script>