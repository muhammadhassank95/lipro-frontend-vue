<template>
    <div class="container-fluid">
        <div v-if="loader === false" class="md-layout md-gutter">
            <div class="md-layout-item md-medium-size-25 md-small-size-50 md-xsmall-size-100">
                <input 
                     id="bd-search-input"
                    type="search"
                    placeholder="Search..."
                    class="form-control ds-input"
                    @blur="filterBranch"
                    v-model="search"
                    style="position: relative; vertical-align: top; margin-top: 10px;"            
                />
                <a href="javascript:void(0)" @click="onNewBranch">New Branch</a>
                    <hr />
                <ul class="list-group overflow-auto">
                    <li v-for="b in getAllBranches" :key="b._id" @click="onBranchFilled(b)">
                        <a class="list-group-item">{{b.branch}}</a>
                    </li>
                </ul>
            </div>
            <div class="md-layout-item md-medium-size-70 md-small-size-50 md-xsmall-size-100">
                <md-field>
                    <label>Branch</label>
                    <md-input v-model="branch"></md-input>
                     <div
                        class="error"
                        v-if="!$v.branch.required && submitStatus === 'ERROR'"
                        >Branch Name is required</div>
                        <div
                            v-if="!$v.branch.minLength && submitStatus === 'ERROR'"
                            class="error"
                        >Branch Name must have at least {{$v.branch.$params.minLength.min}} letters.</div>
                        <div
                            class="success-message"
                            v-if="submitStatus === 'UPDATED' "
                        >Branch Updated successfully</div>
                        <div class="success-message" v-if="submitStatus === 'ADDED' ">Branch Added successfully</div>
                        <div
                            class="success-message"
                            v-if="submitStatus === 'DELETED' "
                        >Branch Deleted successfully</div>
                    <div class="error" v-if="submitStatus === 'UPDATION ERROR'">Invalid Branch Name</div>            
                </md-field>
                <md-card-actions v-if="showActionButtons">
                    <md-button @click="updateBranch" type="submit" class="md-primary">Update</md-button>
                    <md-button @click="deleteBranch" type="submit" class="md-primary">Delete</md-button>
                    </md-card-actions>
                <md-card-actions v-else>
                    <md-button @click="addNewBranch" type="submit" class="md-primary">Add Branch</md-button>
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
    name: "Branch",
    data() {
        return {
            getAllBranches: undefined,
            loader: false,
            branch: undefined,
            showActionButtons: false,
            search: undefined,
            filtered: undefined,
            branchId: undefined,
            submitStatus: "",
            errMsg: ''
        }
    },
    async created() {
        this.fetchAllBranches();
    },
    methods: {
        filterBranch() {
            if (this.search.length > 1) {
                GlobalService.search('branch', this.search).then((res) => {
                const filtering = res.filter(filterRes => filterRes.confidenceScore > 3.5)
                this.getAllBranches = filtering;
                });
            } else {
                this.fetchAllCountries();
            }
        },
        onNewBranch() {
            this.submitStatus = "";
            this.showActionButtons = false;
            this.branch = "";
        },
        fetchAllBranches() {
            this.loader = true;
            GlobalService.get('branch')
                .then((res) => {
                    this.loader = false;
                    this.getAllBranches = res;
                })
                .catch(() => {
                    this.loader = false;
                }
            );
        },
        addNewBranch() {
            this.loader = true;
            GlobalService.add('branch', this.branch)
                .then(() => {
                    this.loader = false;
                    this.submitStatus = "ADDED";
                    this.fetchAllBranches();
                    this.branch = "";
                })
                .catch(() => {
                    this.loader = false;
                    this.submitStatus = "ERROR";
                }
            );
        },
        onBranchFilled(b) {
            this.showActionButtons = true;
            this.submitStatus = "";
            this.branchId = b._id;
            this.branch = b.branch;
        },
        updateBranch() {
            this.loader = true;
            GlobalService.update('branch', this.branchId, this.branch)
                .then(() => {
                    this.loader = false;
                    this.submitStatus = "UPDATED";
                    this.fetchAllBranches();
                })
                .catch(() => {
                    this.loader = false;
                    this.submitStatus = "UPDATION ERROR";
                }
            );
        },
        deleteBranch() {
            this.loader = true;
            GlobalService.delete('branch', this.branchId)
                .then(() => {
                    this.showActionButtons = false;
                    this.loader = false;
                    this.submitStatus = "DELETED";
                    this.fetchAllBranches();
                    this.branch = "";
                })
                .catch(() => {
                    this.loader = false;
                    this.submitStatus = "ERROR";
                }
            );
        },
    },
    validations: {
        branch: {
            required,
            minLength: minLength(2),
        },
    },
}
</script>