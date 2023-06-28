import { Fragment, useState } from "react";
import {
  ContainerCardGrid,
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
} from "../Buyer/ProductItemStyle";
import { Grid, Typography, ButtonBase, Icon, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ImageDecode } from "../../service/ImageConverter";
import { DecodedImage } from "../DecodedImage";
import { StyledAvatar } from "../Buyer/ProductItemStyle";

const SProductItem = ({ product }) => {
  const [image, setImage] = useState("");
  return (
    <Fragment>
      <ButtonBase component={RouterLink} to={`${product.productId}`}>
        <ContainerCardGrid maxWidth="md">
          <Grid container spacing={4}>
            <Grid item>
              <StyledCard>
                <StyledCardContent>
                  <StyledAvatar variant="square">
                    <DecodedImage base64String={product.image} />
                  </StyledAvatar>
                  <div style={{ textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                    >
                      {product.name}
                    </Typography>
                    <Typography style={{ marginBottom: "0.5rem" }}>{product.description}</Typography>
                    <Typography style={{ marginBottom: "0.5rem" }}>Price: ${product.price}</Typography>
                    <Typography style={{ marginBottom: "0.5rem" }}>Available: {product.quantity}</Typography>
                  </div>
                </StyledCardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </ContainerCardGrid>
      </ButtonBase>
    </Fragment>
  );
};

export default SProductItem;
