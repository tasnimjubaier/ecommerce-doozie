import axios from "axios"
const baseUrl = "https://api.doozie.shop/v1"
const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
};



export const getItems = async (searchKey, index, maxItems) => {
    let url = baseUrl + "/items/search"
    let queryJson = getQuery(searchKey)
    
    try {
        let res = await axios.post(url, queryJson, {headers})
        return res.data.result
    } catch (error) {
        console.log("error occured fetching items")
        console.log(error)
        return []
    }
}



const getQuery = (key) => {
    let query = {
        rakuten_query_parameters: {
            keyword: "shirt",
            sort: "itemPrice",
            page: "1",
            hits: "5"
        },
        yahoo_query_parameters: {
            query: "shirt",
            sort: "-price",
            start: "1",
            result: "3"
        },
        from_scheduler: false
    }
    return JSON.stringify(query)
}