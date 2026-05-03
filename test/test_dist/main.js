"use strict";
(self["webpackChunkwebpack_project"] = self["webpackChunkwebpack_project"] || []).push([[792],{

/***/ 2855
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ./node_modules/.pnpm/simplified-fetch@0.6.1/node_modules/simplified-fetch/dist/index.esm.js + 17 modules
var index_esm = __webpack_require__(2463);
;// ./src/hashCollision.js


const util2 = async (a) => {
    console.log('c2518bdbbc54')
    console.log('0d15f7b1efab990d5848')
    console.log('hash collision')
} 

;// ./src/util.js




const temp = {}
const util = (a) => {
    temp.a = a + 1
    util2(temp.a)
    console.log(temp.a)
}

const api = index_esm/* default */.A.create({
    baseURL: '/',
}, {
    someApi: {
        urn: 'test',
    },
})
;// ./src/index.js


console.log("Hello This is a Javascript project.");

console.log(util(1))

const main = async () => {
    const res = await api.someApi()
    console.log(res)

    const dynamic = await __webpack_require__.e(/* import() */ 613).then(__webpack_require__.bind(__webpack_require__, 613))
    console.log(dynamic(1))
}

main()


/***/ }

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [463], () => (__webpack_exec__(2855)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);