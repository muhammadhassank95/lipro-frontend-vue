import doRequest from "./index";
import { baseUrl } from "../common/Constant";

const UserService = {
    // a function to call login api
    login: (loginname, password) => {
        return doRequest(
            "post",
            `${baseUrl}/auth/login/`, {
                loginname: loginname,
                password: password
            },
        );
    },

    getUsers: () => {
        return doRequest(
            "get",
            `${baseUrl}/auth/users/`
        );
    },

    signupUserApi: (email,
        firstname,
        lastname,
        salutation,
        title,
        active,
        startdate,
        enddate,
        loginname,
        categoryId,
        consultant_function_id,
        countryId,
        street,
        zipCode,
        city,
        password
    ) => {
        return doRequest(
            "post",
            `${baseUrl}/auth/signup/`, {
                mail: email,
                firstname: firstname,
                lastname: lastname,
                salutation: salutation,
                title: title,
                active: active,
                startdate: startdate,
                enddate: enddate,
                loginname: loginname,
                categoryid: categoryId,
                consultantfunctionid: consultant_function_id,
                countryid: countryId,
                street: street,
                zipcode: zipCode,
                city: city,
                password: password
            }
        );
    },

    updateUserApi: (id, email,
        firstname,
        lastname,
        salutation,
        title,
        active,
        startdate,
        enddate,
        loginname,
        categoryId,
        consultant_function_id,
        countryId,
        street,
        zipCode,
        city,
        password
    ) => {
        return doRequest(
            "put",
            `${baseUrl}/auth/update-user/${id}`, {
                mail: email,
                firstname: firstname,
                lastname: lastname,
                salutation: salutation,
                title: title,
                active: active,
                startdate: startdate,
                enddate: enddate,
                loginname: loginname,
                categoryid: categoryId,
                consultantfunctionid: consultant_function_id,
                countryid: countryId,
                street: street,
                zipcode: zipCode,
                city: city,
                password: password
            }
        );
    },

    deleteUserApi(userId) {
        return doRequest(
            "delete",
            `${baseUrl}/auth/delete-user/${userId}`
        );
    }
};

export default UserService;