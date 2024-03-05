import Swal from "sweetalert2";
import {updateBrandApi} from "../apiRequest/brandApi/brandApi.js";
import {updateCategoryApi} from "../apiRequest/categoryApi/CategoryApi.js";

export function updateCategoryDataAlert (id,data) {
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
            return updateCategoryApi(id,result.value).then((updateResult)=>{
                return updateResult
            })
        }
    })
}