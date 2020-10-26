<template>
    <div class="container-fluid">
        <div v-if="loader === false" class="md-layout md-gutter">
            <div class="md-layout-item md-medium-size-25 md-small-size-50 md-xsmall-size-100">
                <input 
                     id="bd-search-input"
                    type="search"
                    placeholder="Search..."
                    class="form-control ds-input"
                    @blur="filterFunction"
                    v-model="search"
                    style="position: relative; vertical-align: top; margin-top: 10px;"            
                />
                <a href="javascript:void(0)" @click="onNewFunction">New Function</a>
                    <hr />

                <ul class="list-group overflow-auto">
                    <span v-if="emptySearchResults">Search result is empty.</span>
                    <li v-else v-for="b in getAllFunctions" :key="b._id" @click="onFunctionFilled(b)">
                        <a class="list-group-item">{{b._function}}</a>
                    </li>
                </ul>
            </div>
            <div class="md-layout-item md-medium-size-70 md-small-size-50 md-xsmall-size-100">
                <md-field>
                    <label>Function</label>
                    <md-input v-model="func"></md-input>
                     <div
                        class="error"
                        v-if="!$v.func.required && submitStatus === 'ERROR'"
                        >Function Name is required</div>
                        <div
                            v-if="!$v.func.minLength && submitStatus === 'ERROR'"
                            class="error"
                        >Function Name must have at least {{$v.func.$params.minLength.min}} letters.</div>
                        <div
                            class="success-message"
                            v-if="submitStatus === 'UPDATED' "
                        >Function Updated successfully</div>
                        <div class="success-message" v-if="submitStatus === 'ADDED' ">Function Added successfully</div>
                        <div
                            class="success-message"
                            v-if="submitStatus === 'DELETED' "
                        >Function Deleted successfully</div>
                    <div class="error" v-if="submitStatus === 'UPDATION ERROR'">Invalid Function Name</div>            
                </md-field>
                <md-card-actions v-if="showActionButtons">
                    <md-button @click="updateFunction" type="submit" class="md-primary">Update</md-button>
                    <md-button @click="deleteFunction" type="submit" class="md-primary">Delete</md-button>
                    </md-card-actions>
                <md-card-actions v-else>
                    <md-button @click="addNewFunction" type="submit" class="md-primary">Add Function</md-button>
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
    name: "Function",
    data() {
        return {
            getAllFunctions: undefined,
            loader: false,
            func: undefined,
            showActionButtons: false,
            search: undefined,
            filtered: undefined,
            functionId: undefined,
            submitStatus: "",
            errMsg: '',
            emptySearchResults: false
        }
    },
    async created() {
        this.fetchAllFunctions();
    },
    methods: {
        filterFunction() {
            if (this.search.length > 1) {
                GlobalService.search('consultantFunction', this.search).then((res) => {
                    if (res.length === 0) {
                        this.emptySearchResults = true;
                    } else {
                        this.emptySearchResults = false;
                        this.getAllFunctions = res;
                    }
                });
            } else {
                this.emptySearchResults = false;
                this.fetchAllFunctions();
            }
        },
        onNewFunction() {
            this.submitStatus = "";
            this.showActionButtons = false;
            this.func = "";
        },
        fetchAllFunctions() {
            this.loader = true;
            GlobalService.get('consultantFunction')
                .then((res) => {
                    this.loader = false;
                    this.getAllFunctions = res;
                })
                .catch(() => {
                    this.loader = false;
                }
            );
        },
        addNewFunction() {
            this.loader = true;
            GlobalService.add('consultantFunction', this.func)
                .then(() => {
                    this.loader = false;
                    this.submitStatus = "ADDED";
                    this.fetchAllFunctions();
                    this.func = "";
                })
                .catch(() => {
                    this.loader = false;
                    this.submitStatus = "ERROR";
                }
            );
        },
        onFunctionFilled(b) {
            this.showActionButtons = true;
            this.submitStatus = "";
            this.functionId = b._id;
            this.func = b._function;
        },
        updateFunction() {
            this.loader = true;
            GlobalService.update('consultantFunction', this.functionId, this.func)
                .then(() => {
                    this.loader = false;
                    this.submitStatus = "UPDATED";
                    this.fetchAllFunctions();
                })
                .catch(() => {
                    this.loader = false;
                    this.submitStatus = "UPDATION ERROR";
                }
            );
        },
        deleteFunction() {
            this.loader = true;
            GlobalService.delete('consultantFunction', this.functionId)
                .then(() => {
                    this.showActionButtons = false;
                    this.loader = false;
                    this.submitStatus = "DELETED";
                    this.fetchAllFunctions();
                    this.func = "";
                })
                .catch(() => {
                    this.loader = false;
                    this.submitStatus = "ERROR";
                }
            );
        },
    },
    validations: {
        func: {
            required,
            minLength: minLength(2),
        },
    },
}
</script>