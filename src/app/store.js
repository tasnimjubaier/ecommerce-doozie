import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../features/Items/itemSlice'


export const store = configureStore({
	reducer: {
		items: itemReducer
	},
})

