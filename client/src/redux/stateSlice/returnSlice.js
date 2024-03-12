import { createSlice } from '@reduxjs/toolkit'

export const returnSlice = createSlice ({
    name : "returns",
    initialState : {
        returnItemList : []
    },
    reducers : {
        setReturnItemList: (state,action) =>{
            state.returnItemList.push(action.payload)
        },
        removeReturnItemList : (state,action)=>{
            state.returnItemList.splice(action.payload,1)
        }
    }
});

export const {  setReturnItemList,removeReturnItemList } = returnSlice.actions;
export default returnSlice.reducer;