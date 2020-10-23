<template>
    <div class="container-fluid">
        <div v-if="loader === false" class="md-layout md-gutter">
            <div class="md-layout-item md-medium-size-25 md-small-size-50 md-xsmall-size-100">
                <input 
                     id="bd-search-input"
                    type="search"
                    placeholder="Search..."
                    class="form-control ds-input"
                    @blur="filterTheme"
                    v-model="search"
                    style="position: relative; vertical-align: top; margin-top: 10px;"            
                />
                <a href="javascript:void(0)" @click="onNewTheme">New Theme</a>
                    <hr />
                <ul class="list-group overflow-auto">
                    <li v-for="t in getAllThemes" :key="t._id" @click="onThemeFilled(t)">
                        <a class="list-group-item">{{t.theme}}</a>
                    </li>
                </ul>
            </div>
            <div class="md-layout-item md-medium-size-70 md-small-size-50 md-xsmall-size-100">
                <md-field>
                    <label>Theme</label>
                    <md-input v-model="theme"></md-input>
                     <div
                        class="error"
                        v-if="!$v.theme.required && submitStatus === 'ERROR'"
                        >Theme Name is required</div>
                        <div
                            v-if="!$v.theme.minLength && submitStatus === 'ERROR'"
                            class="error"
                        >Theme Name must have at least {{$v.theme.$params.minLength.min}} letters.</div>
                        <div
                            class="success-message"
                            v-if="submitStatus === 'UPDATED' "
                        >Theme Updated successfully</div>
                        <div class="success-message" v-if="submitStatus === 'ADDED' ">Theme Added successfully</div>
                        <div
                            class="success-message"
                            v-if="submitStatus === 'DELETED' "
                        >Theme Deleted successfully</div>
                    <div class="error" v-if="submitStatus === 'UPDATION ERROR'">Invalid Theme Name</div>            
                </md-field>
                <md-card-actions v-if="showActionButtons">
                    <md-button @click="updateTheme" type="submit" class="md-primary">Update</md-button>
                    <md-button @click="deleteTheme" type="submit" class="md-primary">Delete</md-button>
                    </md-card-actions>
                <md-card-actions v-else>
                    <md-button @click="addNewTheme" type="submit" class="md-primary">Add Theme</md-button>
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
    name: "Theme",
    data() {
        return {
            getAllThemes: undefined,
            loader: false,
            theme: undefined,
            showActionButtons: false,
            search: undefined,
            filtered: undefined,
            themeId: undefined,
            submitStatus: "",
            errMsg: ''
        }
    },
    async created() {
        this.fetchAllThemes();
    },
    methods: {
        filterTheme() {
            if (this.search.length > 1) {
                GlobalService.search('theme', this.search).then((res) => {
                const filtering = res.filter(filterRes => filterRes.confidenceScore > 3.5)
                this.getAllThemes = filtering;
                });
            } else {
                this.fetchAllCountries();
            }
        },
        onNewTheme() {
            this.submitStatus = "";
            this.showActionButtons = false;
            this.theme = "";
        },
        fetchAllThemes() {
            this.loader = true;
            GlobalService.get('theme')
                .then((res) => {
                    console.log(res)
                    this.loader = false;
                    this.getAllThemes = res;
                })
                .catch(() => {
                    this.loader = false;
                }
            );
        },
        addNewTheme() {
            this.loader = true;
            GlobalService.add('theme', this.theme)
                .then(() => {
                    this.loader = false;
                    this.submitStatus = "ADDED";
                    this.fetchAllThemes();
                    this.theme = "";
                })
                .catch(() => {
                    this.loader = false;
                    this.submitStatus = "ERROR";
                }
            );
        },
        onThemeFilled(t) {
            this.showActionButtons = true;
            this.submitStatus = "";
            this.themeId = t._id;
            this.theme = t.theme;
        },
        updateTheme() {
            this.loader = true;
            GlobalService.update('theme', this.themeId, this.theme)
                .then(() => {
                    this.loader = false;
                    this.submitStatus = "UPDATED";
                    this.fetchAllThemes();
                })
                .catch(() => {
                    this.loader = false;
                    this.submitStatus = "UPDATION ERROR";
                }
            );
        },
        deleteTheme() {
            this.loader = true;
            GlobalService.delete('theme', this.themeId)
                .then(() => {
                    this.showActionButtons = false;
                    this.loader = false;
                    this.submitStatus = "DELETED";
                    this.fetchAllThemes();
                    this.theme = "";
                })
                .catch(() => {
                    this.loader = false;
                    this.submitStatus = "ERROR";
                }
            );
        },
    },
    validations: {
        theme: {
            required,
            minLength: minLength(2),
        },
    },
}
</script>