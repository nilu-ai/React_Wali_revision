import axios from "axios"
export const currentme=async()=>{
    try {
        const data= axios.get("https://api.technilesh.com/api/v1/user/login")
        if(!data) {
            throw "Data not found"
        }
    } catch (error) {
        console.log(error);
    }
}

