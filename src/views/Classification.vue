<template>
    <div class="container-fluid">
        <div v-if="loader === false" class="md-layout md-gutter">
            <div class="md-layout-item md-medium-size-25 md-small-size-50 md-xsmall-size-100">
                <input 
                     id="bd-search-input"
                    type="search"
                    placeholder="Search..."
                    class="form-control ds-input"
                    @blur="filterClassification"
                    v-model="search"
                    style="position: relative; vertical-align: top; margin-top: 10px;"            
                />
                <a href="javascript:void(0)" @click="onNewClassification">New Classification</a>
                    <hr />

                <ul class="list-group overflow-auto">
                    <span v-if="emptySearchResults">Search result is empty.</span>
                    <li v-else v-for="b in getAllclassifications" :key="b._id" @click="onClassificationFilled(b)">
                        <a class="list-group-item">{{b.classification}}</a>
                    </li>
                </ul>
            </div>
            <div class="md-layout-item md-medium-size-70 md-small-size-50 md-xsmall-size-100">
                <md-field>
                    <label>Classification</label>
                    <md-input v-model="classification"></md-input>
                     <div
                        class="error"
                        v-if="!$v.classification.required && submitStatus === 'ERROR'"
                        >Classification Name is required</div>
                        <div
                            v-if="!$v.classification.minLength && submitStatus === 'ERROR'"
                            class="error"
                        >Classification Name must have at least {{$v.classification.$params.minLength.min}} letters.</div>
                </md-field>
                <md-field>
                    <label>Probability (%)</label>
                    <md-input v-model="probability"></md-input>
                    <md-icon>%</md-icon>
                    <div
                        class="error"
                        v-if="!$v.probability.required && submitStatus === 'ERROR'"
                        >Probability Name is required</div>
                    <div 
                        class="error"
                        v-if="!$v.probability.between"
                    >Probability must be number between 1-100
                    </div>
                    <div
                        class="success-message"
                        v-if="submitStatus === 'UPDATED' "
                    >Classification Updated successfully</div>
                    <div class="success-message" v-if="submitStatus === 'ADDED' ">Classification Added successfully</div>
                    <div
                        class="success-message"
                        v-if="submitStatus === 'DELETED' "
                    >Classification Deleted successfully</div>
                    <div class="error" v-if="submitStatus === 'UPDATION ERROR'">Invalid Classification Name</div>
                </md-field>
                <md-card-actions v-if="showActionButtons">
                    <md-button @click="updateClassification" type="submit" class="md-primary">Update</md-button>
                    <md-button @click="deleteClassification" type="submit" class="md-primary">Delete</md-button>
                    </md-card-actions>
                <md-card-actions v-else>
                    <md-button @click="addNewClassification" type="submit" class="md-primary">Add Classification</md-button>
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
import { required, minLength, between  } from "vuelidate/lib/validators";

export default {
    name: "Classification",
    data() {
        return {
            getAllclassifications: undefined,
            loader: false,
            classification: undefined,
            showActionButtons: false,
            search: undefined,
            filtered: undefined,
            classificationId: undefined,
            submitStatus: "",
            errMsg: '',
            emptySearchResults: false,
            probability: undefined
        }
    },
    async created() {
        this.fetchAllclassifications();
    },
    methods: {
        filterClassification() {
            if (this.search.length > 1) {
                GlobalService.search('classification', this.search).then((res) => {
                    if (res.length === 0) {
                        this.emptySearchResults = true;
                    } else {
                        this.emptySearchResults = false;
                        this.getAllclassifications = res;
                    }
                });
            } else {
                this.emptySearchResults = false;
                this.fetchAllclassifications();
            }
        },
        onNewClassification() {
            this.submitStatus = "";
            this.showActionButtons = false;
            this.classification = "";
            this.probability = "";

        },
        fetchAllclassifications() {
            this.loader = true;
            GlobalService.get('classification')
                .then((res) => {
                    this.loader = false;
                    this.getAllclassifications = res;
                })
                .catch(() => {
                    this.loader = false;
                }
            );
        },
        addNewClassification() {
            this.loader = true;
            GlobalService.addClassificationApi('classification', this.classification, this.probability)
                .then(() => {
                    this.loader = false;
                    this.submitStatus = "ADDED";
                    this.fetchAllclassifications();
                    this.classification = "";
                })
                .catch(() => {
                    this.loader = false;
                    this.submitStatus = "ERROR";
                }
            );
        },
        onClassificationFilled(b) {
            this.showActionButtons = true;
            this.submitStatus = "";
            this.classificationId = b._id;
            this.classification = b.classification;
            this.probability = b.probability;
        },
        updateClassification() {
            this.loader = true;
            GlobalService.updateClassificationApi('classification', this.classificationId, this.classification, this.probability)
                .then(() => {
                    this.loader = false;
                    this.submitStatus = "UPDATED";
                    this.fetchAllclassifications();
                })
                .catch(() => {
                    this.loader = false;
                    this.submitStatus = "UPDATION ERROR";
                }
            );
        },
        deleteClassification() {
            this.loader = true;
            GlobalService.delete('classification', this.classificationId)
                .then(() => {
                    this.showActionButtons = false;
                    this.loader = false;
                    this.submitStatus = "DELETED";
                    this.fetchAllclassifications();
                    this.classification = "";
                    this.probability = "";
                })
                .catch(() => {
                    this.loader = false;
                    this.submitStatus = "ERROR";
                }
            );
        },
    },
    validations: {
        classification: {
            required,
            minLength: minLength(2),
        },
        probability: {
            required,
            between: between(1, 100)
        }
    },
}
</script>