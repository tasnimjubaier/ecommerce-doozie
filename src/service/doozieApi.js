
const baseUrl = "https://api.doozie.shop/v1"


export const getItems = async (searchKey, index) => {
    let arr = []
    for(let i = 1; i <= parseInt(searchKey); i++) arr.push(i)
    return arr
}

export const getItem = async (id) => {

}