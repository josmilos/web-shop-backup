import { json } from "react-router-dom";

export async function loader(){
const response = await fetch('https://localhost:7068/api/products/');

if(!response.ok){
    throw json({message: 'Could not fetch products.'}, {
        status: 500
      })
}
else {
    return response;
}
}
