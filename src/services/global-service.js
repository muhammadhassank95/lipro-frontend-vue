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
        return doRequest(
            "post",
            `${baseUrl}/${key}/add-new-${key}`, body
        ); 
    },

    update: (key, id, body) => {
        return doRequest(
            "put",
            `${baseUrl}/${key}/update-${key}/${id}`, body
        );
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