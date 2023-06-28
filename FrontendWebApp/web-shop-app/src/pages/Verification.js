import { Fragment } from "react";
import PageContent from "../components/PageContent";
import SellersList from "../components/Admin/SellersList";
import { getAuthToken } from "../service/UserService/AuthService";
import { json } from "react-router-dom";

const content = {
    title:'Verify New Sellers',
    description: 'Check users and approve new sellers that are waiting for verification.'
  }

const VerificationPage = () => {
    return (<Fragment>
        <PageContent content={content}/>
        <SellersList/>
    </Fragment>)
}

export default VerificationPage;

export async function loader({request, params}) {
    const response = await fetch('https://localhost:7068/api/users/all', {
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${getAuthToken()}`
        }
    });
  
    
    if(!response.ok){
        throw json({message: 'Could not fetch list of unverified sellers.'}, {
            status: 500
          })
    }
    else{
        const resData = await response.json();
        return resData;
    }
  }