
const TitleLength = 11
const DescLength = 22
const HeadlineLength = 22



export const formatItems = (items) => {
    let formatted = items

    formatted = formatted.map((item, idx) => {
        item.id = idx + 1
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