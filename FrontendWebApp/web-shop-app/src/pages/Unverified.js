import { Form } from "react-router-dom";
import PageContent from "../components/PageContent";
import { Button, Stack } from "@mui/material";
import { extractTokenData } from "../service/UserService/AuthService";

const contentNonVerified = {
  title: "Pending Verification",
  description:
    "Your account is not verified yet. Please wait for admin to approve your registration.",
};

const contentDenied = {
  title: "Verification Request Denied",
  description:
    "Your account has not been approved. You can not access the website.",
};

const Unverified = () => {
  const auth = extractTokenData();
  let userVerified = "";
  if (auth) {
    userVerified = auth["verification"];
  }

  return (
    <section>
      <PageContent content={userVerified === "processing" ? contentNonVerified : contentDenied} />
      <div className="flexGrow">
        <Stack direction="row" spacing={1} justifyContent="center">
          <Form action="/logout" method="post">
            <Button type="submit" variant="contained">Logout</Button>
          </Form>
        </Stack>
      </div>
    </section>
  );
};

export default Unverified;
