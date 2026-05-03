import { api, util } from "./util";

console.log("Hello This is a Javascript project.");

console.log(util(1))

const main = async () => {
    const res = await api.someApi()
    console.log(res)

    const dynamic = await import('./dynamic')
    console.log(dynamic(1))
}

main()
