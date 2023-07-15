import { SortOptions, SortOrders } from "./types"


export const getComparator = (sortBy, sortOrder) => (a, b) => {

    if(sortBy == SortOptions.None) return 0

    if(sortBy == SortOptions.Price) {
        if(sortOrder == SortOrders.Ascending)
            return a.price - b.price
        else
            return b.price - a.price
    }
    else if(sortBy == SortOptions.ReviewAverage) {
        if(sortOrder == SortOrders.Ascending)
            return a.review_average - b.review_average
        else
            return b.review_average - a.review_average
    }
    else if(sortBy == SortOptions.ReviewCount) {
        if(sortOrder == SortOrders.Ascending)
            return a.review_count - b.review_count
        else
            return b.review_count - a.review_count
    }
}