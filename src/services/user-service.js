import doRequest from "./index";
import { baseUrl } from "../common/Constant";

const UserService = {
  // a function to call login api
  login: (loginname, password) => {
    return doRequest(
      "post",
      `${baseUrl}/auth/login/`,
      {
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

  signup: (email,
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
    change_right,
    is_first_login,
    daclarationagreed,
    full_name,
    password
  ) => {
    console.log(startdate);
    return doRequest(
      "post",
      `${baseUrl}/auth/signup/`,
      {
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
        changeright: change_right,
        isfirstlogin: is_first_login,
        daclarationagreed: daclarationagreed,
        fullname: full_name,
        password: password
      }
    );
  },
};

export default UserService;