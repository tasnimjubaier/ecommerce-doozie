import { createSlice } from "@reduxjs/toolkit";
import { SortOptions, SortOrders } from "../../utils/types";

// this store stores search configuration.

const initialState = {
    searchKey: "",
	priceRange: [0, 10000000],
    sortBy: SortOptions.None,
    sortOrder: SortOrders.Ascending 
}


const slice = createSlice({
	name: 'searchConfig',
	initialState,
	reducers: {
        setSearchKey: (state, action) => { // {searchKey}
            state.searchKey = action.payload.searchKey
        },
        setPriceRange: (state, action) => { // {range: []}
            state.priceRange = action.payload.range
        },
        setSortConfig: (state, action) => { // {sortBy, sortOrder}
            state.sortBy = action.payload.sortBy
            state.sortOrder = action.payload.sortOrder
        },
        setSortBy: (state, action) => { // {sortBy}
            state.sortBy = action.payload.sortBy
        },
        setSortOrder: (state, action) => { // {sortOrder}
            state.sortOrder = action.payload.sortOrder
        },
        setAllConfig:(state, action) => { // {searchKey, sortBy, sortOrder, range}
            if(action.payload.searchKey) state.searchKey = action.payload.searchKey
            if(action.payload.range) state.priceRange = action.payload.range
            if(action.payload.sortBy) state.sortBy = action.payload.sortBy
            if(action.payload.sortOrder) state.sortOrder = action.payload.sortOrder
        },
	},
})

export const { setSearchKey, setPriceRange, setSortConfig, setSortBy, setSortOrder, setAllConfig } = slice.actions
export default slice.reducer