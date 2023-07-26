// sanityConfig.js
const { sanityClient } = require('@sanity/client');

let PROJECT_ID = "jylv2qqp";
let DATASET = "production";
let QUERY = encodeURIComponent('*');

// Compose the URL for your project's endpoint and add the query
let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
console.log(URL)