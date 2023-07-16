import axios from "axios"
import { SortOptions, SortOrders } from "../utils/types";

const baseUrl = "https://api.doozie.shop/v1"
const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
};

// all api calls are in this file


export const getItems = async (searchKey, minPrice, maxPrice, sortBy, sortOrder, pageNo) => {
    let url = baseUrl + "/items/search"
    let queryJson = getBasicQuery(searchKey, pageNo)
   
    try {
        let res = await axios.post(url, queryJson, {headers})
        return res.data.result
    } catch (error) {
        console.log("error occured fetching items")
        console.log(error)
        return []
    }
}


export const getItemsByConfig = async (searchKey, priceRange, sortBy, sortOrder) => {
    let url = baseUrl + "/items/search"
    let queryJson = getQuery(searchKey, priceRange, sortBy, sortOrder, 1)
    
    
    try {
        let res = await axios.post(url, queryJson, {headers})
        return res.data.result
    } catch (error) {
        console.log("error occured fetching items")
        console.log(error)
        return []
    }
}


export const getNextPage = async (searchKey, priceRange, sortBy, sortOrder) => {
    let url = baseUrl + "/items/search"
    let queryJson = getQuery(searchKey, priceRange, sortBy, sortOrder, 1)
    
    try {
        let res = await axios.post(url, queryJson, {headers})
        return res.data.result
    } catch (error) {
        console.log("error occured fetching items")
        console.log(error)
        return []
    }
}


export const getItemById = async (platform, itemId) => {
    let url = baseUrl + `/items/${platform}/${itemId}`
    
    try {
        let res = await axios.get(url, {headers})
        return res.data.item
    } catch (error) {
        console.log("error occured fetching items")
        console.log(error)
        return null
    }
}



const getQuery = (key, priceRange, sortBy, sortOrder, pageNo) => {
    let rakutenSort = (sortBy === SortOptions.Price ? "itemPrice" : 
                    sortBy === SortOptions.ReviewCount ? "reviewCount" : 
                    sortBy === SortOptions.None ? "standard" : "reviewAverage")
    let yahooSort = (sortBy === SortOptions.Price ? "price" : 
                sortBy === SortOptions.ReviewCount ? "review_count" : 
                sortBy === SortOptions.None ? "score" : "review_average")
    
    if(sortOrder === SortOrders.Descending) {
        rakutenSort = "-" + rakutenSort
        yahooSort = "-" + yahooSort
    }

    let items = 30
    let pageNumber = 1

    if(pageNo) pageNumber = pageNo


    let query = {
        rakuten_query_parameters: {
            keyword: key,
            sort: rakutenSort,
            page: pageNumber,
            hits: items
        },
        yahoo_query_parameters: {
            query: key,
            sort: yahooSort,
            start: items * pageNumber + 1,
            result: items,
            price_from: priceRange[0],
            price_to: priceRange[1],
        },
        from_scheduler: false
    }
    return JSON.stringify(query)
}


const getBasicQuery = (key, page) => {

    let query = {
        rakuten_query_parameters: {
            keyword: key,
            // sort: "-itemPrice",
            page: page,
            hits: "30"
        },
        yahoo_query_parameters: {
            query: key,
            // sort: "-price",
            start: page * 30 + 1,
            result: "30"
        },
        from_scheduler: false
    }
    return JSON.stringify(query)
}