<template>
  <div class="container-fluid">
    <div class="md-layout md-gutter mt-4">
      <div v-if="loader === false" class="md-layout-item md-medium-size-30 md-small-size-50 md-xsmall-size-100">
        <div class="card p-4 mb-3">
          <a href="javascript:void(0)" @click="onNewUser">New User</a>
          <hr />
          <ul>
            <li v-for="users in getAllUsers" :key="users._id" @click="onUserFilled(users)">
              <a class="list-group-item">{{users.loginname}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-if="loader === false"
        class="md-layout-item md-medium-size-70 md-small-size-50 md-xsmall-size-100"
      >
        <div class="card p-4 mb-3">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link" :class="{'active': isUserActive}" id="home-tab" data-toggle="tab" href="javascript:void(0)" @click="onUserTabClicked()" role="tab" aria-controls="home" aria-selected="true">Users</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{'active': isAccessRight, 'disabled': !isUpdateClick}" id="profile-tab" data-toggle="tab" href="javascript:void(0)" @click="onAccessRightsTabClicked()" role="tab" aria-controls="profile" aria-selected="false">Access Rights</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{'active': isCost, 'disabled': !isUpdateClick}" id="contact-tab" data-toggle="tab" href="javascript:void(0)" @click="onCostTabClicked()" role="tab" aria-controls="contact" aria-selected="false">Costs</a>
            </li>
          </ul>
          <div style="margin-top:10px" class="tab-content" id="myTabContent">
            <div class="tab-pane fade " :class="{ 'show active': isUserActive }" id="home" role="tabpanel" aria-labelledby="home-tab">
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
              <form class="md-layout">
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
                    <input class="mr-2" id="active_checkbox" type="checkbox" checked v-model="active" /> Active
                  </label>
                </div>
                <div class="row md-layout md-gutter">
                  <div class="col-md-12">
                    <label>Start Date</label>
                  </div>
                  <div class="col-md-12">
                    <md-datepicker v-model="startdate" />
                  </div>
                  <div class="col-md-12">
                    <label>End Date</label>
                  </div>
                  <div class="col-md-12">
                    <md-datepicker v-model="enddate" />
                  </div>
                </div>
                <md-field>
                  <label>Abbreviation</label>
                  <md-input v-model="loginname"></md-input>
                  <div
                    class="error"
                    v-if="!$v.loginname.required && submitStatus === 'ERROR'"
                  >Abbreviation is required</div>
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
                    v-if="!$v.email.required || submitStatus === 'ERROR'"
                  >Email is required.</div>
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
              </form>
              <div class="set w-100">
                <div>
                  <div v-if="submitStatus === 'ERROR'">Please fill the form correctly.</div>
                  <div class="success-message" v-if="submitStatus === 'UPDATED'">User Updated successfully.</div>
                  <div class="success-message" v-if="submitStatus === 'ADDED'">User Added successfully.</div>
                  <div class="success-message" v-if="submitStatus === 'DELETED' ">User Deleted successfully.</div>
                  <div class="error" v-if="submitStatus === 'UPDATION ERROR'">{{updationErr}}</div>
                </div>
                <md-card-actions v-if="showActionButtons">
                  <md-button @click="updateUser" type="submit" class="md-primary">Update</md-button>
                  <md-button @click="deleteUser" type="submit" class="md-primary">Delete</md-button>
                </md-card-actions>
                <md-card-actions v-else>
                  <md-button @click="signup" type="submit" class="md-primary">Create user</md-button>
                </md-card-actions>
              </div>
            </div>
            <div class="tab-pane fade" :class="{'show active': isAccessRight}"  id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <AccessRights/>
            </div>
            <div class="tab-pane fade" :class="{'show active': isCost}"  id="contact" role="tabpanel" aria-labelledby="contact-tab">
              <Costs />
            </div>
          </div>
        </div>
      </div>
      <div v-if="loader === true" class="loader">
        <vue-loaders-ball-clip-rotate color="blue" scale="1"></vue-loaders-ball-clip-rotate>
      </div>
    </div>
  </div>
</template>
<script>
import UserService from "../services/user-service";
import GlobalService from "../services/global-service";
import AccessRights from '../views/AccessRights';
import Costs from '../views/Costs';

import moment from "moment";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  name: "User",
  components: {
    AccessRights,
    Costs
  },
  data() {
    return {
      lastname: "",
      firstname: "",
      salutation: undefined,
      title: undefined,
      active: true,
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
      countries: undefined,
      getAllUsers: undefined,
      submitStatus: null,
      loader: false,
      showActionButtons: false,
      userId: undefined,
      isUserActive: true,
      isAccessRight: false,
      isCost: false,
      isUpdateClick: false,
      updationErr: ''
    };
  },
  async mounted() {
    this.fetchAllUsers();
    this.countries = await GlobalService.getCountries();
  },
  methods: {
    async fetchAllUsers() {
      this.loader = true;
      this.getAllUsers = await UserService.getUsers();
      this.loader = false;
    },
    onUserTabClicked() {
      this.isUserActive = true;
      this.isAccessRight = false;
      this.isCost = false;
    },
    onAccessRightsTabClicked() {
       this.isUserActive = false;
       this.isAccessRight = true;
       this.isCost = false;
    },
    onCostTabClicked() {
      this.isUserActive = false;
      this.isAccessRight = false;
      this.isCost = true;
    },
    onNewUser() {
      this.isUpdateClick = false;
      this.onUserTabClicked();
      this.showActionButtons = false;
      this.email = undefined;
      this.firstname = "";
      this.lastname = "";
      this.salutation = undefined;
      this.title = undefined;
      this.active = true;
      this.startdate = undefined;
      this.enddate = undefined;
      this.loginname = undefined;
      this.categoryId = undefined;
      this.consultant_function_id = undefined;
      this.countryId = undefined;
      this.street = undefined;
      this.zipCode = undefined;
      this.city = undefined;
      this.password = undefined;
      this.confirm_password = undefined;
    },
    onUserFilled(user) {
      this.isUpdateClick = true;
      this.userId = user._id;
      this.showActionButtons = true;
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
      this.password = user.password;
      this.confirm_password = user.confirm_password;
    },
    signup() {
      this.$v.$touch();
      this.loader = true;
      UserService.signupUserApi(
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
        this.password,
        this.confirm_password
      )
        .then(() => {
          this.isUpdateClick = true;
          this.loader = false;
          this.fetchAllUsers();
        })
        .catch((e) => {
          console.log(e)
          this.loader = false;
          this.submitStatus = "ERROR";
        });
    },
    updateUser() {
      // this.$v.$touch();
      this.loader = true;
      UserService.updateUserApi(
        this.userId,
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
        this.password
      )
        .then(() => {
          this.loader = false;
          this.isUpdateClick = true;
          this.submitStatus = "UPDATED";
          this.fetchAllUsers();
          this.onNewUser();
        })
        .catch((e) => {
          console.log(e)
          this.loader = false;
          this.submitStatus = "UPDATION ERROR";
          this.updationErr = e.body.message;
        });
    },
    deleteUser() {
      UserService.deleteUserApi(this.userId)
        .then(() => {
          this.showActionButtons = false;
          this.loader = false;
          this.submitStatus = "DELETED";
          this.fetchAllUsers();
          this.onNewUser();
        })
        .catch(() => {
          this.loader = false;
          this.submitStatus = "ERROR";
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