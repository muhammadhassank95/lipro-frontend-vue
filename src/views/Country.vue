<template>
  <div class="container-fluid">
    <div v-if="loader === false" class="md-layout md-gutter">
      <div class="md-layout-item md-medium-size-25 md-small-size-50 md-xsmall-size-100">
        <input
          id="bd-search-input"
          type="search"
          placeholder="Search..."
          class="form-control ds-input"
          @blur="filterCountry"
          v-model="search"
          style="position: relative; vertical-align: top; margin-top: 10px;"
        />
        <a href="javascript:void(0)" @click="onNewCountry">New Country</a>
        <hr />
        <ul class="list-group overflow-auto">
          <span v-if="emptySearchResults">Search result is empty.</span>
          <li v-else v-for="c in getAllCountries" :key="c._id" @click="onCountryFilled(c)">
            <a class="list-group-item">{{c.country}}</a>
          </li>
        </ul>
      </div>
      <div class="md-layout-item md-medium-size-70 md-small-size-50 md-xsmall-size-100">
        <md-field>
          <label>Country</label>
          <md-input v-model="country"></md-input>
          <div
            class="error"
            v-if="!$v.country.required && submitStatus === 'ERROR'"
          >Country Name is required</div>
          <div
            v-if="!$v.country.minLength && submitStatus === 'ERROR'"
            class="error"
          >Country Name must have at least {{$v.country.$params.minLength.min}} letters.</div>
          <div
            class="success-message"
            v-if="submitStatus === 'UPDATED' "
          >Country Updated successfully</div>
          <div class="success-message" v-if="submitStatus === 'ADDED' ">Country Added successfully</div>
          <div
            class="success-message"
            v-if="submitStatus === 'DELETED' "
          >Country Deleted successfully</div>
          <div class="error" v-if="submitStatus === 'UPDATION ERROR'">Invalid Country Name</div>
        </md-field>
        <md-card-actions v-if="showActionButtons">
          <md-button @click="updateCountry" type="submit" class="md-primary">Update</md-button>
          <md-button @click="deleteCountry" type="submit" class="md-primary">Delete</md-button>
        </md-card-actions>
        <md-card-actions v-else>
          <md-button @click="addNewCountry" type="submit" class="md-primary">Add Country</md-button>
        </md-card-actions>
      </div>
    </div>
    <div v-if="loader === true" class="loader">
      <vue-loaders-ball-clip-rotate color="blue" scale="1"></vue-loaders-ball-clip-rotate>
    </div>
  </div>
</template>

<script>
import GlobalService from "../services/global-service";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Country",
  data() {
    return {
      getAllCountries: undefined,
      country: undefined,
      showActionButtons: false,
      search: undefined,
      filtered: undefined,
      countryId: undefined,
      submitStatus: "",
      loader: false,
      errMsg: '',
      emptySearchResults: false
    };
  },
  async created() {
    this.fetchAllCountries();
  },
  methods: {
    filterCountry() {
      if (this.search.length > 0) {
        GlobalService.search('country', this.search).then((res) => {
          if (res.length === 0) {
              this.emptySearchResults = true
          } else {
              this.emptySearchResults = false
              this.getAllCountries = res;
          }
        });
      } else {
        this.emptySearchResults = false
        this.fetchAllCountries();
      }
    },
    fetchAllCountries() {
      this.loader = true;
      GlobalService.get('country')
        .then((res) => {
          this.loader = false;
          this.getAllCountries = res;
        })
        .catch(() => {
          this.loader = false;
        });
    },
    addNewCountry() {
      this.loader = true;
      let body = {
        country: this.country
      }
      GlobalService.add('country', body)
        .then(() => {
          this.loader = false;
          this.submitStatus = "ADDED";
          this.fetchAllCountries();
          this.country = "";
        })
        .catch(() => {
          this.loader = false;
          this.submitStatus = "ERROR";
        });
    },
    onNewCountry() {
      this.submitStatus = "";
      this.showActionButtons = false;
      this.country = "";
    },
    onCountryFilled(c) {
      this.showActionButtons = true;
      this.submitStatus = "";
      this.countryId = c._id;
      this.country = c.country;
    },
    updateCountry() {
      this.loader = true;
      let body = {
          country: this.country
      }
      GlobalService.update('country', this.countryId, body)
        .then(() => {
          this.loader = false;
          this.submitStatus = "UPDATED";
          this.fetchAllCountries();
        })
        .catch(() => {
          this.loader = false;
          this.submitStatus = "UPDATION ERROR";
        });
    },
    deleteCountry() {
      this.loader = true;
      GlobalService.delete('country', this.countryId)
        .then(() => {
          this.showActionButtons = false;
          this.loader = false;
          this.submitStatus = "DELETED";
          this.fetchAllCountries();
          this.country = "";
        })
        .catch(() => {
          this.loader = false;
          this.submitStatus = "ERROR";
        });
    },
  },
  validations: {
    country: {
      required,
      minLength: minLength(2),
    },
  },
};
</script>