import { createSlice } from '@reduxjs/toolkit'

export const pageNumberSlice = createSlice({
    name: 'pageNumber',
    initialState: {
        page: 0,
    },
    reducers: {
        changePageNumber: (state, action) => {
            state.page = action.payload.page;
        }
    }
})

export const { changePageNumber } = pageNumberSlice.actions
export default pageNumberSlice.reducer