import doRequest from "./index";
import { baseUrl } from "../common/Constant";

const GlobalService = {

    //Countries
    getCountries: () => {
        return doRequest(
            "get",
            `${baseUrl}/country`
        );
    },

    createCountry: (countryName) => {
        return doRequest(
            "post",
            `${baseUrl}/country/add-new-country`,
            {
                country: countryName,
            }
        )
    },

    updateCountry: (countryId, countryName) => {
        return doRequest(
            "put",
            `${baseUrl}/country/update-country/${countryId}`,
            {
                country: countryName,
            }
        );
    },

    deleteCountry: (countryId) => {
        return doRequest(
            "delete",
            `${baseUrl}/country/delete-country/${countryId}`
        );
    },

    searchCountry: (query) => {
        return doRequest(
            "get",
            `${baseUrl}/country/search-country/${query}`
        );
    },

};

export default GlobalService;
