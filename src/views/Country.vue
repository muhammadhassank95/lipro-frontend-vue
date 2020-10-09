<template>
  <div class="container-fluid">
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-medium-size-30 md-small-size-50 md-xsmall-size-100">
        <input
          id="bd-search-input"
          type="search"
          placeholder="Search..."
          autocomplete="off"
          aria-label="Search docs"
          class="form-control ds-input"
          spellcheck="false"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded="false"
          aria-owns="algolia-autocomplete-listbox-0"
          dir="auto"
          v-model="search"
          @blur="filterCountry()"
          style="position: relative; vertical-align: top; margin-top: 10px;"
        />
        <a href="javascript:void(0)" @click="onNewCountry">New Country</a>
        <hr />
        <ul class="list-group">
          <li v-for="c in getAllCountries" :key="c._id" @click="onCountryFilled(c)">
            <a class="list-group-item">{{c.country}}</a>
          </li>
        </ul>
      </div>
      <div class="md-layout-item md-medium-size-70 md-small-size-50 md-xsmall-size-100">
        <md-field>
          <label>Add New Country</label>
          <md-input v-model="country"></md-input>
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
  </div>
</template>

<script>
import GlobalService from "../services/global-service";

export default {
  name: "Country",
  data() {
    return {
      getAllCountries: undefined,
      country: undefined,
      showActionButtons: false,
      search: undefined,
      filtered: undefined,
    };
  },
  async created() {
    this.fetchAllCountries();
  },
  methods: {
    filterCountry() {
      // return this.postList.filter(post => {
      //         return post.title.toLowerCase().includes(this.search.toLowerCase())
      //       })
      //     }
      //   }

      // console.log(this.getAllCountries.length);
      this.filtered = this.getAllCountries.filter((c) => {
        return c.country.includes(this.search);
      });
      console.log(this.filtered);
    },
    updateCountry() {
      console.log("updated");
    },
    deleteCountry() {
      console.log("deleted");
    },
    async fetchAllCountries() {
      this.getAllCountries = await GlobalService.getCountries();
    },
    addNewCountry() {
      GlobalService.createCountry(this.country)
        .then(() => {
          this.fetchAllCountries();
        })
        .catch((e) => console.log(e));
    },
    onNewCountry() {
      this.country = "";
    },
    onCountryFilled(c) {
      this.showActionButtons = true;
      this.country = c.country;
    },
  },
};
</script>