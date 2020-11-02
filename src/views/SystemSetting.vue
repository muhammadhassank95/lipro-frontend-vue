<template>
  <div class="container">
    <br><br>
    <div v-if="!loader" class="white-block">
      <md-field>
        <label>Number of hours per standard day</label>
        <md-input v-model="hoursperday"></md-input>
        <md-icon>H</md-icon>
        <div
          class="error"
          v-if="!$v.hoursperday.required && submitStatus === 'ERROR'"
        >Hours required</div>
        <div
          class="error"
          v-if="!$v.hoursperday.between"
        >Hours should be between 0-24</div>        
      </md-field>
      <md-field>
        <label>Planning after X days in the past month (standard)</label>
        <md-input v-model="toleranceplaning"></md-input>
        <md-icon>D</md-icon>
        <div
          class="error"
          v-if="!$v.toleranceplaning.required && submitStatus === 'ERROR'"
        >Tolerance Planning required</div>
        <div
          class="error"
          v-if="!$v.toleranceplaning.between"
        >Tolerance Planning should be between -100-100</div> 
      </md-field>
      <md-field>
        <label>Hours recording booking after X days in the past month (standard)</label>
        <md-input  v-model="toleranceregistering"></md-input>
        <md-icon>D</md-icon>
        <div
          class="error"
          v-if="!$v.toleranceregistering.required && submitStatus === 'ERROR'"
        >Tolerance Registering required</div>
        <div
          class="error"
          v-if="!$v.toleranceregistering.between"
        >Tolerance Registering should be between 0-100</div> 
      </md-field>
      <md-field>
        <label>VAT rate</label>
        <md-input v-model="vatrate"></md-input>
        <md-icon>%</md-icon>
        <div
          class="error"
          v-if="!$v.vatrate.required && submitStatus === 'ERROR'"
        >vat Rate required</div>
        <div
          class="error"
          v-if="!$v.vatrate.between"
        >vat Rate be should between 0-100</div> 
      </md-field>
      <div
        class="success-form"
        v-if="submitStatus === 'UPDATED' "
      >Successfully Updated</div>
      <md-card-actions>
        <md-button @click="updateSystemSetting" type="submit" class="md-primary">Save</md-button>
        <md-button @click="onAbortOpen" type="submit" class="md-primary">Abort</md-button>
      </md-card-actions>
    </div>
    <md-dialog-confirm
      :md-active.sync="openModal"
      md-title="System Settings"
      md-content="Would you like to restore previously saved values?"
      md-confirm-text="Confirm"
      md-cancel-text="Abort"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
    />
    <div v-if="loader === true" class="loader">
      <vue-loaders-ball-clip-rotate color="blue" scale="1"></vue-loaders-ball-clip-rotate>
    </div>
  </div>
</template>

<script>
import GlobalService from '../services/global-service';
import { required, between } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      date: new Date(),
      hoursperday: undefined,
      toleranceplaning: undefined,
      toleranceregistering: undefined,
      vatrate: undefined,
      initialhoursperday: undefined,
      initialtoleranceplaning: undefined,
      initialtoleranceregistering: undefined,
      initialvatrate: undefined,
      systemId: undefined,
      getAllSystemSettings: undefined,
      loader: false,
      submitStatus: '',
      openModal: false,
      initialValues: undefined
    }
  },
  async created() {
    this.loader = true
    GlobalService.get('system-settings').then((system) => {
      system.filter((sys) => {
        this.loader = false;
        this.initialhoursperday = sys.hoursperday;
        this.initialtoleranceregistering = sys.toleranceregistering;
        this.initialtoleranceplaning = sys.toleranceplaning;
        this.initialvatrate = sys.vatrate;
        this.hoursperday = sys.hoursperday;
        this.toleranceregistering = sys.toleranceregistering;
        this.toleranceplaning = sys.toleranceplaning;
        this.vatrate = sys.vatrate;
        this.systemId = sys._id
      });
    });
  },
  methods: {
    updateSystemSetting() {
      this.loader = true
      let body = {
        lastarchiving: this.date,
        hoursperday: this.hoursperday,
        toleranceregistering: this.toleranceregistering,
        toleranceplaning: this.toleranceplaning,
        vatrate: this.vatrate
      }
      GlobalService.update('system-settings', this.systemId, body)
        .then((sys) => {
          this.submitStatus = "UPDATED"
          this.initialhoursperday = sys.hoursperday
          this.initialtoleranceregistering = sys.toleranceregistering
          this.initialtoleranceplaning = sys.toleranceplaning
          this.initialvatrate = sys.vatrate
          this.loader = false
        })
        .catch(() => {
          this.loader = false
          this.submitStatus = "ERROR"
        });
    },
    onConfirm() {
      let getData = localStorage.getItem('initial-system-settings')
      let parseData = JSON.parse(getData)
      this.hoursperday = parseData.hoursperday
      this.toleranceregistering = parseData.toleranceregistering
      this.toleranceplaning = parseData.toleranceplaning
      this.vatrate = parseData.vatrate
      localStorage.removeItem('system-settings')
      localStorage.removeItem('initial-system-settings')
    },
    onCancel() {
      let getData = localStorage.getItem('system-settings')
      let parseData = JSON.parse(getData)
      this.hoursperday = parseData.hoursperday
      this.toleranceregistering = parseData.toleranceregistering
      this.toleranceplaning = parseData.toleranceplaning
      this.vatrate = parseData.vatrate
      localStorage.removeItem('system-settings')
      localStorage.removeItem('initial-system-settings')
    },
    onAbortOpen() {
      this.openModal = true;
      let systemSettings = {
        hoursperday: this.hoursperday,
        toleranceregistering: this.toleranceregistering,
        toleranceplaning: this.toleranceplaning,
        vatrate: this.vatrate
      }

      let initailsystemSettings = {
        hoursperday: this.initialhoursperday,
        toleranceregistering: this.initialtoleranceregistering,
        toleranceplaning: this.initialtoleranceplaning,
        vatrate: this.initialvatrate
      }

      localStorage.setItem('system-settings', JSON.stringify(systemSettings));
      localStorage.setItem('initial-system-settings', JSON.stringify(initailsystemSettings));
    }
  },
  validations: {
    hoursperday: {
      required,
      between: between(0,24),
    },
    toleranceplaning: {
      required,
      between: between(-100,100),
    },
    toleranceregistering: {
      required,
      between: between(0,100),
    },
    vatrate: {
      required,
      between: between(0,100),
    },
  }
}
</script>