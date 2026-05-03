import API, { urnParser } from
    'simplified-fetch'
import { util2 } from "./hashCollision";
import "./index.css";

const temp = {}
export const util = (a) => {
    temp.a = a + 1
    util2(temp.a)
    console.log(temp.a)
}

export const api = API.create({
    baseURL: '/',
}, {
    someApi: {
        urn: 'test',
    },
})