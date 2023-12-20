import axios from "axios";

export const publicAxios = axios.create({
    baseURL: "https://fdd1a65a-6bfe-4bdb-9757-9ec2dd598c43.mock.pstmn.io/api",
    responseType: 'json',
});