<template>
  <div>
    <form class="md-layout" @submit.prevent="signup">
      <md-field>
        <label>Last Name</label>
        <md-input v-model="lastname"></md-input>
      </md-field>
      <md-field>
        <label>First Name</label>
        <md-input v-model="firstname"></md-input>
      </md-field>
      <md-field>
        <label>Salutation</label>
        <md-input v-model="salutation"></md-input>
      </md-field>
      <md-field>
        <label>Title</label>
        <md-input v-model="title"></md-input>
      </md-field>
      <md-field>
        <label>Active</label>
        <md-input v-model="active"></md-input>
      </md-field>
      <md-field>
        <label>Entry</label>
        <md-input v-model="entry"></md-input>
      </md-field>
      <md-field>
        <label>Exit</label>
        <md-input v-model="exit"></md-input>
      </md-field>
      <md-field>
        <label>Abbreviation</label>
        <md-input v-model="abbreviation"></md-input>
      </md-field>
      <md-field>
        <label>Category</label>
        <md-input v-model="category"></md-input>
      </md-field>
      <md-field>
        <label>Entry</label>
        <md-input v-model="entry"></md-input>
      </md-field>
      <md-field>
        <label>Function</label>
        <md-input v-model="function1"></md-input>
      </md-field>
      <md-field>
        <label>Land</label>
        <md-input v-model="land"></md-input>
      </md-field>
      <md-field>
        <label>Road</label>
        <md-input v-model="road"></md-input>
      </md-field>
      <md-field>
        <label>PostCode/Town</label>
        <md-input v-model="postCode"></md-input>
      </md-field>
      <md-field>
        <label>Email</label>
        <md-input v-model="email"></md-input>
      </md-field>
      <md-field>
        <label>Consent of security</label>
        <md-input></md-input>
      </md-field>
      <md-field>
        <label>Password</label>
        <md-input v-model="password"></md-input>
      </md-field>
      <md-field>
        <label>Confirm Password</label>
        <md-input v-model="confirm_password"></md-input>
      </md-field>
      <md-card-actions>
        <md-button type="submit" class="md-primary">Create user</md-button>
      </md-card-actions>
    </form>
  </div>
</template>

<script>
import UserService from "../services/user-service";
export default {
  name: "UserMid",
  data() {
    return {
      lastname: undefined,
      firstname: undefined,
      salutation: undefined,
      title: undefined,
      active: undefined,
      entry: undefined,
      exit: undefined,
      abbreviation: undefined,
      category: undefined,
      function1: undefined,
      land: undefined,
      road: undefined,
      postCode: undefined,
      email: undefined,
      password: undefined,
      confirm_password: undefined,
    };
  },
  methods: {
    signup() {
      UserService.signup(
        this.lastname,
        this.firstname,
        this.salutation,
        this.title,
        this.active,
        this.entry,
        this.exit,
        this.abbreviation,
        this.category,
        this.function1,
        this.land,
        this.road,
        this.postCode,
        this.email,
        this.password,
        this.confirm_password
      )
        .then((res) => {
          console.log(res);
          // router.push(`/consultant_plan`);
          // router.go();
          // localStorage.setItem("userToken", res.token);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
