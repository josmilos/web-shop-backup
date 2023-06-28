import { CardMedia, Card, Container, Grid, CardContent, Typography, ButtonBase, Icon } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ContainerCardGrid = styled(Container)(({ theme }) => ({
  padding: "20px 0",
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const StyledIcon = styled(Icon)(({ theme }) => ({
  paddingTop: "56.25%",
  alignContent: "center",
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
}));
