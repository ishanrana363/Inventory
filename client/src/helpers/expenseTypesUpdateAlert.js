import Swal from "sweetalert2";
import {updateCustomerApi} from "../apiRequest/customerApi/customerApi.js";
import {updateExpenseTypesApi} from "../apiRequest/expenseTypesApi/expenseTypesApi.js";

export function expenseTypesUpdateAlert (id,data) {
    return Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
        inputValue:data,
    }).then((result) => {
        if (result.isConfirmed) {
            return updateExpenseTypesApi(id,result.value).then((updateResult)=>{
                return updateResult
            })
        }
    });
}