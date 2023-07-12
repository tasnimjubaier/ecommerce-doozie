import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	items: [], 
	state: 'idle',
	error: null 
}


const slice = createSlice({
	name: 'items',
	initialState,
	reducers: {
        setItems: (state, action) => { // {items}
            state.items = action.payload.items 
        }
	},
})

export const { setItems } = slice.actions
export default slice.reducer