import { useEffect } from "react"
import { SortOptions, SortOrders } from "./types"

const TitleLength = 11
const DescLength = 22
const HeadlineLength = 22



export const formatItems = (items, lastIndex) => {
    let formatted = items

    formatted = formatted.map((item, idx) => {
        item.id = idx + 1 + lastIndex
        item.title = (item.title?.length <= TitleLength ? 
            item.title : item.title?.substring(0, TitleLength) + '...')
            
        item.description = (item.description?.length <= DescLength ? 
            item.description : item.description?.substring(0, DescLength) + '...')
            
        item.headline = (item.headline?.length <= HeadlineLength ? 
            item.headline : item.headline?.substring(0, HeadlineLength) + '...')
        return item
    })

    return formatted
}

export const filterItems = (items, searchconfig, prevIndex) => {
    let filtered = items.filter(item => {
        return item.price >= searchconfig.minPrice && item.price <= searchconfig.maxPrice
    })

    let sortBy = searchconfig.sortBy
    let sortOrder = searchconfig.sortOrder
    

    filtered.sort((a, b) => {
        if(sortOrder == SortOrders.Ascending) {
            if(sortBy == SortOptions.Price) return a.price - b.price
            if(sortBy == SortOptions.ReviewCount) return a.review_count - b.review_count
            if(sortBy == SortOptions.ReviewAverage) return a.review_average - b.review_average
        }
        else {
            if(sortBy == SortOptions.Price) return -a.price + b.price
            if(sortBy == SortOptions.ReviewCount) return -a.review_count + b.review_count
            if(sortBy == SortOptions.ReviewAverage) return -a.review_average + b.review_average
        }
    })

    filtered = filtered.map((item, index) => {
        item.id = index + 1 + prevIndex
        return item 
    })

    return filtered
}


export const PageTitleFormatter = ({title}) => {
    useEffect(() => {
        document.title = title 
    }, [])
    return (<></>)
}