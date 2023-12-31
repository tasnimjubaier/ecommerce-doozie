import { createSlice } from "@reduxjs/toolkit";
import { ItemLoadingState } from "../../utils/types";
import { getComparator } from "../../utils/comparators";

// this one is for maintaining items in the store

const initialState = {
	items: [],
	page: 1,
	phase: ItemLoadingState.NotSearced
}

const slice = createSlice({
	name: 'items',
	initialState,
	reducers: {
        setItems: (state, action) => { // {items}
            state.items = action.payload.items 
        },
		addItems: (state, action) => { // {items}
            state.items = [...state.items, ...action.payload.items]
			state.page = state.page + 1 
        },
		setSearchPhase: (state, action) => { // {phase}
            state.phase = action.payload.phase 
        },
		sortItems: (state, action) => { // {sortBy, sortOrder}
            let sortBy = action.payload.sortBy 
			let sortOrder = action.payload.sortOrder

			if(sortBy == null) return 
			
			state.phase = ItemLoadingState.Loading

			state.items = state.items.sort(getComparator(sortBy, sortOrder))

			state.phase = ItemLoadingState.Searched
        },
		filterByPrice: (state, action) => { // {priceRange}
            let minPrice = action.payload.priceRange[0]
			let maxPrice = action.payload.priceRange[1]

			state.items = state.items.filter(item => {
				return item.price >= minPrice && item.price <= maxPrice
			})
        }
	},
})

export const { setItems,addItems, setSearchPhase, sortItems, filterByPrice } = slice.actions
export default slice.reducer