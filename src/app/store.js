import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../features/Items/itemSlice'
import searchConfigReducer from '../features/SearchConfig/searchConfigSlice'


export const store = configureStore({
	reducer: {
		items: itemReducer,
		searchConfig: searchConfigReducer
	},
})

