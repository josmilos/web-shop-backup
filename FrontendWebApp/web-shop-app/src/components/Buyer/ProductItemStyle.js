import { styled } from "@mui/system";
import { Card, CardContent, CardMedia, Button, Avatar } from "@mui/material";

export const ContainerCardGrid = styled("div")({
  padding: "20px 0",

});

export const StyledCard = styled(Card)({
  height: "100%",
  
  
});

export const StyledCardMedia = styled(CardMedia)({
  paddingTop: "56.25%", // 16:9 aspect ratio
  
});

export const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  
});

export const StyledButton = styled(Button)({
  marginTop: "1rem",
});

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: "250px",
    height: "250px",
  }));
