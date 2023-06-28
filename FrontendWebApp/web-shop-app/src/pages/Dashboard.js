import {
  redirect,
  Link as RouterLink,
  useRouteLoaderData,
} from "react-router-dom";
import {
  ContainerCardGrid,
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledIcon,
} from "./styles/DashBoardStyle";
import { Grid, Typography, ButtonBase, Icon } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import PageContent from "../components/PageContent";
import { extractTokenData } from "../service/UserService/AuthService";

<link
  rel="stylesheet"
  href="fonts.googleapis.com/icon?family=Material+Icons"
/>;

const icons = {
  AccountCircle: <AccountCircleIcon />,
  Add: <AddIcon />,
  ShoppingCart: <ShoppingCartIcon />,
  History: <HistoryIcon />,
  VerifiedUser: <VerifiedUserIcon />,
  PendingActions: <PendingActionsIcon />,
  FormatListBulleted: <FormatListBulletedIcon />,
};

const cards = [
  {
    id: "profile",
    image: "",
    title: "My Profile",
    icon: "AccountCircle",
    priv: ["admin", "seller", "buyer"],
  },
  {
    id: "my-products",
    image: "",
    title: "Add New Product",
    icon: "Add",
    priv: ["seller"],
  },
  {
    id: "new-order",
    image: "",
    title: "Create New Order",
    icon: "ShoppingCart",
    priv: ["buyer"],
  },
  {
    id: "new-orders",
    image: "",
    title: "New Orders",
    icon: "PendingActions",
    priv: ["seller"],
  },
  {
    id: "order-history",
    image: "",
    title: "Order History",
    icon: "History",
    priv: ["buyer", "seller"],
  },
  {
    id: "verification",
    image: "",
    title: "User Verification",
    icon: "VerifiedUser",
    priv: ["admin"],
  },

  {
    id: "all-orders",
    image: "",
    title: "All Orders",
    icon: "FormatListBulleted",
    priv: ["admin"],
  },
];

const contentVerified = {
  title: "Dashboard",
  description:
    "Welcome to the dashboard. Choose one of the options listed below.",
};

const contentNonVerified = {
  title: "Pending Verification",
  description:
    "Your account is not verified yet. Please wait for admin to approve your registration.",
};

const contentDenied = {
  title: "Verification Rejected",
  description:
    "Your account registration has been rejected. Try creating a new one.",
};

const DashboardPage = () => {
  const token = useRouteLoaderData("root");
  let userRole = "";
  let userVerified = "";
  const userToken = extractTokenData();
  if (userToken) {
    userRole = userToken["role"];
    userVerified = userToken["verification"];
  }

  return (
    <>
      {userVerified === "denied" ? (
        <PageContent content={contentDenied} />
      ) : userVerified === "processing" ? (
        <PageContent content={contentNonVerified} />
      ) : (
        <>
          <PageContent content={contentVerified} />
          <ContainerCardGrid maxWidth="md">
            <Grid container spacing={4} sx={{ justifyContent: "center" }}>
              {cards.map((page) => {
                return userRole &&
                  page?.priv?.find((r) => userRole?.includes(r)) ? (
                  <Grid item key={page.id}>
                    <ButtonBase component={RouterLink} to={page.id}>
                      <StyledCard>
                        <span style={{ display: "flex", justifyContent: "center" }}>
                        {icons[page.icon]}
                        </span>
                        <StyledCardContent>
                          <Typography gutterBottom variant="h5">
                            {page.title}
                          </Typography>
                        </StyledCardContent>
                      </StyledCard>
                    </ButtonBase>
                  </Grid>
                ) : null;
              })}
            </Grid>
          </ContainerCardGrid>
        </>
      )}
      {!token && (
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          You must be logged in to see the content of this page. Please log in.
        </Typography>
      )}
    </>
  );
};

export default DashboardPage;
