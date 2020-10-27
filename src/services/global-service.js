import doRequest from "./index";
import { baseUrl } from "../common/Constant";

const GlobalService = {
    get: (toAppend) => {
        return doRequest(
            "get",
            `${baseUrl}/${toAppend}`
        );
    },

    add: (key, body) => {
        if(key === 'consultantFunction') {
            return doRequest(
                "post",
                `${baseUrl}/${key}/add-new-${key}`, {
                    _function: body,
                }
            );    
        } else {
            return doRequest(
                "post",
                `${baseUrl}/${key}/add-new-${key}`, {
                    [`${key}`]: body,
                }
            )
        }
    },

    addClassificationApi: (key, classfication, probability) => {
        return doRequest(
            "post",
            `${baseUrl}/${key}/add-new-${key}`, {
                [`${key}`]: classfication,
                probability: probability
            }
        )
    },

    updateClassificationApi: (key, id, classfication, probability) => {
        return doRequest(
            "put",
            `${baseUrl}/${key}/update-${key}/${id}`, {
                [`${key}`]: classfication,
                probability: probability
            }
        );    
    },

    update: (key, id, body) => {
        if(key === 'consultantFunction') {
            return doRequest(
                "put",
                `${baseUrl}/${key}/update-${key}/${id}`, {
                    _function: body,
                }
            );    
        } else {
            return doRequest(
                "put",
                `${baseUrl}/${key}/update-${key}/${id}`, {
                    [`${key}`]: body,
                }
            );
        }
    },

    delete: (key,countryId) => {
        return doRequest(
            "delete",
            `${baseUrl}/${key}/delete-${key}/${countryId}`
        );
    },

    
    search: (key, query) => {
        return doRequest(
            "get",
            `${baseUrl}/${key}/search-${key}/${query}`
        );
    },

    // searchCountry: (query) => {
    //     return doRequest(
    //         "get",
    //         `${baseUrl}/country/search-country/${query}`
    //     );
    // },

};

export default GlobalService;