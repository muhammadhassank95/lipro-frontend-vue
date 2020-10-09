<template>
  <div class="container-fluid">
    <div class="md-layout md-gutter mt-4">
      <div
        v-if="loader === false"
        class="md-layout-item md-medium-size-30 md-small-size-50 md-xsmall-size-100"
      >
        <div class="card p-4 mb-3">
          <a href="javascript:void(0)" @click="onNewUser">New User</a>
          <hr />
          <ul class="list-group">
            <li v-for="users in getAllUsers" :key="users._id" @click="onUserFilled(users)">
              <a class="list-group-item">{{users.firstname}} {{users.lastname}}</a>
            </li>
          </ul>
        </div>
      </div>

      <div
        v-if="loader === false"
        class="md-layout-item md-medium-size-70 md-small-size-50 md-xsmall-size-100"
      >
        <div class="card p-4 mb-3">
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
              <div
                class="error"
                v-if="!$v.lastname.required && submitStatus === 'ERROR'"
              >Last Name is required</div>
              <div
                v-if="!$v.lastname.minLength"
                class="error"
                style="color: red;"
              >Last Name must have at least {{$v.lastname.$params.minLength.min}} letters.</div>
            </md-field>
            <md-field>
              <label>First Name</label>
              <md-input v-model="firstname"></md-input>
              <div
                class="error"
                v-if="!$v.firstname.required && submitStatus === 'ERROR'"
              >First Name is required</div>
              <div
                v-if="!$v.firstname.minLength"
                class="error"
                style="color: red;"
              >First Name must have at least {{$v.firstname.$params.minLength.min}} letters.</div>
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
              <div
                class="error"
                v-if="!$v.loginname.required && submitStatus === 'ERROR'"
              >First Name is required</div>
              <div
                v-if="!$v.loginname.minLength && submitStatus === 'ERROR'"
                class="error"
                style="color: red;"
              >First Name must have at least {{$v.loginname.$params.minLength.min}} letters.</div>
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
              <div
                class="error"
                v-if="!$v.categoryId.required && submitStatus === 'ERROR'"
              >User Category is required.</div>
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
              <div
                class="error"
                v-if="!$v.email.required && submitStatus === 'ERROR'"
              >Email is required.</div>
            </md-field>
            <md-field>
              <label>Consent of security</label>
              <md-input disabled></md-input>
            </md-field>
            <md-field>
              <label>Password</label>
              <md-input type="password" v-model="password"></md-input>
              <div
                class="error"
                v-if="!$v.password.required && submitStatus === 'ERROR'"
              >Password is required.</div>
              <div
                class="error"
                v-if="!$v.password.minLength && submitStatus === 'ERROR'"
              >Password must have at least {{ $v.password.$params.minLength.min }} letters.</div>
            </md-field>
            <md-field>
              <label>Confirm Password</label>
              <md-input type="password" v-model="confirm_password"></md-input>
              <div
                class="error"
                v-if="!$v.confirm_password.sameAsPassword"
              >Passwords must be identical.</div>
            </md-field>
            <div>
              <p class="error" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            </div>
            <md-card-actions>
              <md-button type="submit" class="md-primary">Create user</md-button>
            </md-card-actions>
          </form>
        </div>
      </div>
      <div v-if="loader === true" class="loader">
        <vue-loaders-ball-clip-rotate color="blue" scale="1"></vue-loaders-ball-clip-rotate>
      </div>
    </div>
  </div>
</template>
<script>
// import UserSideBar from "../components/UserSideBar";
// import UserMid from "../components/UserMid";
import UserService from "../services/user-service";
import GlobalService from "../services/global-service";
import moment from "moment";

import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  name: "User",
  components: {},
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
      submitStatus: null,
      loader: false,
    };
  },
  async mounted() {
    this.fetchAllUsers();
    this.countries = await GlobalService.getCountries();
    console.log(this.countries);
  },
  methods: {
    async fetchAllUsers() {
      this.loader = true;
      this.getAllUsers = await UserService.getUsers();
      this.loader = false;
    },
    onNewUser() {
      this.email = undefined;
      this.firstname = "";
      this.lastname = "";
      this.salutation = undefined;
      this.title = undefined;
      this.active = undefined;
      this.startdate = undefined;
      this.enddate = undefined;
      this.loginname = undefined;
      this.categoryId = undefined;
      this.consultant_function_id = undefined;
      this.countryId = undefined;
      this.street = undefined;
      this.zipCode = undefined;
      this.city = undefined;
      this.change_right = undefined;
      this.is_first_login = undefined;
      this.daclarationagreed = undefined;
      this.full_name = undefined;
      this.password = undefined;
      this.confirm_password = undefined;
    },
    onUserFilled(user) {
      this.email = user.mail;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.salutation = user.salutation;
      this.title = user.title;
      this.active = user.active;
      this.startdate = moment(user.startdate).format("YYYY-MM-DD");
      this.enddate = moment(user.enddate).format("YYYY-MM-DD");
      this.loginname = user.loginname;
      this.categoryId = user.categoryid;
      this.consultant_function_id = user.consultantfunctionid;
      this.countryId = user.countryid;
      this.street = user.street;
      this.zipCode = user.zipcode;
      this.city = user.city;
      this.change_right = user.change_right;
      this.is_first_login = user.is_first_login;
      this.daclarationagreed = user.daclarationagreed;
      this.full_name = user.full_name;
      this.password = user.password;
      this.confirm_password = user.confirm_password;
    },
    signup() {
      this.$v.$touch();
      this.full_name = `${this.firstname} ${this.lastname}`;
      this.loader = true;
      UserService.signup(
        this.email,
        this.firstname,
        this.lastname,
        this.salutation,
        this.title,
        this.active,
        this.startdate,
        this.enddate,
        this.loginname,
        this.categoryId,
        this.consultant_function_id,
        this.countryId,
        this.street,
        this.zipCode,
        this.city,
        (this.change_right = true),
        (this.is_first_login = true),
        this.daclarationagreed,
        this.full_name,
        this.password,
        this.confirm_password
      )
        .then((res) => {
          this.fetchAllUsers();
          this.loader = false;
          console.log(res);
        })
        .catch((e) => {
          this.loader = false;
          this.submitStatus = "ERROR";
          console.log(e);
        });
    },
  },
  validations: {
    firstname: {
      required,
      minLength: minLength(2),
    },
    lastname: {
      required,
      minLength: minLength(2),
    },
    loginname: {
      required,
      minLength: minLength(2),
    },
    email: {
      required,
    },
    categoryId: {
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    confirm_password: {
      sameAsPassword: sameAs("password"),
    },
  },
};
</script>