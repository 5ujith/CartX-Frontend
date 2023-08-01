import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {},
    reducers: {
        addSearchResult : (state, action) => {
            state = Object.assign(state, action.payload);
        }
    }
})

export const {addSearchResult} = searchSlice.actions;
export default searchSlice.reducer;