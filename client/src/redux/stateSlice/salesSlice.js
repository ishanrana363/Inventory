import { createSlice } from '@reduxjs/toolkit'

export const salesSlice = createSlice ({
    name : "sales",
    initialState : {
        saleItemList : []
    },
    reducers : {
        setSaleItemList : (state,action) =>{
            state.saleItemList.push(action.payload)
        },
        removeSaleItemList : (state,action)=>{
            state.saleItemList.splice(action.payload,1)
        }
    }
});

export const {  setSaleItemList,removeSaleItemList } = salesSlice.actions;
export default salesSlice.reducer;
