import { Typography, Button, Container, Box, Stack } from "@mui/material";

const PageContent = ({ content, children }) => {
  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {content.title}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            {content.description}
          </Typography>
          <Stack

            direction="row"
            spacing={1}
            justifyContent="center"
          >
          </Stack>
        </Container>
      </Box>
      {children}
    </main>
  );
};

export default PageContent;
