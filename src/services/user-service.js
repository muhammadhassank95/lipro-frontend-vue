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

  signup: (lastname,
    firstname,
    salutation,
    title,
    active,
    entry,
    exit,
    abbreviation,
    category,
    function1,
    land,
    road,
    postCode,
    email,
    password,
    confirm_password) => {
    return doRequest(
      "post",
      `${baseUrl}/auth/signup/`,
      {
        loginname: `${firstname}${lastname}`,
        password: password,
        firstname: firstname,
        lastname: lastname,
        title: title,
        email: email,
        active: active,
        entry: entry,
        exit: exit,
        abbreviation: abbreviation,
        category: category,
        function1: function1,
        land: land,
        road: road,
        postCode: postCode,
        salutation: salutation,
        confirm_password: confirm_password
      },
    );
  },
};

export default UserService;
