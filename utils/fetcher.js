
export default async function fetcher(...args) {
    const res = await fetch(...args)

    const json = await res.json()

    console.log("-----**")
    console.log(json)
    return json
}