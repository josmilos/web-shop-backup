import { Fragment } from "react";
import PageContent from "../components/PageContent";
import { json } from "react-router-dom";
import { getAuthToken } from "../service/UserService/AuthService";
import AOrdersList from "../components/Admin/AOrdersList";

const content = {
    title:'All Created Orders',
    description: 'Here you can see all orders created on the website. This window can be seen only by admin.'
  }

const AllOrdersPage = () => {
    return (<Fragment>
        <PageContent content={content}/>
        <AOrdersList/>
    </Fragment>)
}

export default AllOrdersPage;

export async function loader({ request, params }) {
    const response = await fetch(
      "https://localhost:7068/api/orders/all",
      {
        headers: {
          "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}`,
        },
      }
    );
  
    if (!response.ok) {
      throw json(
        { message: "Could not fetch list of orders." },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();
      return resData;
    }
  }