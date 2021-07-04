// import axios from 'axios';
const axios = require("axios");
// const qs = require('qs');

const CLIENT_ID =
  "AWMgvmA1ax39AmbhyJuNctlVksirOUOscznAG9q_pmiyYgAaThDFrC1bLPJ1BYZgEpIpFj2FMkJ-Q6K4";
const SECRET_KEY =
  "EIE-wzF6fqHK0valuoBoHhTdbceX-mOAxNbA_wiDq9OcBE_yMcmKObdyefh72yeOvYQKPGPEKwkNsuWF";
const baseUrl = "https://api.sandbox.paypal.com/";

const routeUrls = {
  PAYMENT_PAYOUTS: "v1/payments/payouts/",
  INVOICES: "v1/invoicing/invoices/",
  ORDERS: "v2/checkout/orders/",
  SUBSCRIPTIONS: (id) => "v1/billing/subscriptions/" + id,
};

async function getToken() {
  // let body = ;

  let options = {
    // `headers` are custom headers to be sent
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: CLIENT_ID,
      password: SECRET_KEY,
    },
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },
    params: { grant_type: "client_credentials" },
  };

  let response = await axios.post(
    "https://api.sandbox.paypal.com/v1/oauth2/token",
    null,
    options
  );

  let data = await response.data;

  // let bearer = await paypalBearer(data.access_token);

  return data.access_token;
}

async function post(route, token, dataBody = false) {
  let response;

  let options = {
    // `headers` are custom headers to be sent
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },
  };

  try {
    response = await axios.post(baseUrl + route, dataBody, options);
  } catch (e) {
    return console.log(e.response);
  }

  let data = await response.data;

  return data;
}

async function get(route, token) {
  let response;

  let options = {
    // `headers` are custom headers to be sent
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },
  };

  try {
    response = await axios.get(baseUrl + route, options);
  } catch (e) {
    return console.log(e.response);
  }

  let data = await response.data;

  return data;
}

module.exports = {
  get,
  post,
  getToken,
  routeUrls,
};
