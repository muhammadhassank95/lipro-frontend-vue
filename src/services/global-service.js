import doRequest from "./index";
import { baseUrl } from "../common/Constant";

const GlobalService = {
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
    }
};

export default GlobalService;
