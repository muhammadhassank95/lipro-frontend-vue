<template>
  <div class="md-layout-item md-medium-size-70 md-small-size-50 md-xsmall-size-100">
    <div class="d-flex align-items-center">
      <label class="mr-3 mb-0">User</label>
      <input
        type="text"
        class="form-control w-50"
        placeholder="Username"
        aria-label="Username"
        aria-describedby="basic-addon1"
        disabled
        :value="firstname + ' ' + lastname"
      />
    </div>

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
        <label for="salutation">Salutation</label>
        <md-select v-model="salutation" name="salutation" id="salutation">
          <md-option :value="1">MR</md-option>
          <md-option :value="2">Mrs</md-option>
        </md-select>
      </md-field>
      <md-field>
        <label>Title</label>
        <md-input v-model="title"></md-input>
      </md-field>
      <div class="my-2 w-100">
        <label for="active_checkbox" class="d-flex align-items-center">
          <input class="mr-2" id="active_checkbox" type="checkbox" v-model="active" /> Active
        </label>
      </div>

      <div class="row md-layout md-gutter">
        <div class="col-md-12">
          <label>Entry</label>
        </div>
        <div class="col-md-6">
          <md-datepicker v-model="startdate" />
        </div>
        <div class="col-md-6">
          <md-datepicker v-model="enddate" />
        </div>
      </div>
      <md-field>
        <label>Abbreviation</label>
        <md-input v-model="loginname"></md-input>
      </md-field>
      <md-field>
        <label>Country</label>
        <md-select v-model="countryId" name="countries" id="countries">
          <md-option v-for="c in countries" :key="c._id" :value="c._id">{{c.country}}</md-option>
        </md-select>
      </md-field>
      <md-field>
        <label>Category</label>
        <md-select v-model="categoryId" name="category" id="category">
          <md-option value="5f68c0fd7067ce9213ff1e7f">PM</md-option>
          <md-option value="5f68c0fd7067ce9213ff1e7f">BD</md-option>
        </md-select>
      </md-field>
      <md-field>
        <label>Function</label>
        <md-select
          v-model="consultant_function_id"
          name="consultant_function_id"
          id="consultant_function_id"
        >
          <md-option value="5f68c0fd7067ce9213ff1e7f">PM</md-option>
          <md-option value="2">BD</md-option>
          <md-option value="3">Partner</md-option>
          <md-option value="5f68c0fd7067ce9213ff1e7f">Student</md-option>
          <md-option value="5f68c0fd7067ce9213ff1e7f">Personal</md-option>
        </md-select>
      </md-field>

      <md-field>
        <label>Street</label>
        <md-input v-model="street"></md-input>
      </md-field>
      <md-field>
        <label>PostCode/Town</label>
        <md-input v-model="zipCode"></md-input>
      </md-field>
      <md-field>
        <label>City</label>
        <md-input v-model="city"></md-input>
      </md-field>
      <md-field>
        <label>Email</label>
        <md-input v-model="email"></md-input>
      </md-field>
      <md-field>
        <label>Consent of security</label>
        <md-input disabled></md-input>
      </md-field>
      <md-field>
        <label>Password</label>
        <md-input type="password" v-model="password"></md-input>
      </md-field>
      <md-field>
        <label>Confirm Password</label>
        <md-input type="password" v-model="confirm_password"></md-input>
      </md-field>
      <md-card-actions>
        <md-button type="submit" class="md-primary">Create user</md-button>
      </md-card-actions>
    </form>
  </div>
</template>

<script>
import UserService from "../services/user-service";
import GlobalService from "../services/global-service";
import moment from "moment";

export default {
  name: "UserMid",
  data() {
    return {
      full_name: undefined,
      lastname: "",
      firstname: "",
      salutation: undefined,
      title: undefined,
      active: undefined,
      categoryId: undefined,
      consultant_function_id: undefined,
      zipCode: undefined,
      email: undefined,
      password: undefined,
      confirm_password: undefined,
      loginname: undefined,
      startdate: undefined,
      enddate: undefined,
      street: undefined,
      countryId: undefined,
      city: undefined,
      daclarationagreed: undefined,
      countries: undefined,
      getAllUsers: undefined,
    };
  },
  async mounted() {
    this.fetchAllUsers();
    this.countries = await GlobalService.getCountries();
    console.log(this.countries);
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
