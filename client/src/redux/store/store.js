import { configureStore } from '@reduxjs/toolkit'
import purchaseSlice from "../stateSlice/purchaseSlice.js";
import salesSlice from "../stateSlice/salesSlice.js";
import returnSlice from "../stateSlice/returnSlice.js";

export default configureStore({
    reducer: {
        purchase : purchaseSlice,
        sales : salesSlice,
        returns : returnSlice
    },
})