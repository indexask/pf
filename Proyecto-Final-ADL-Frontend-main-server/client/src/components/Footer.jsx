import { AppBar, Box, Typography, Container, Stack } from "@mui/material"

import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

import logo from "../assets/logo.png"

export default function Footer() {
  return (
    <>
      <AppBar
        position="static"
        component="footer"
        sx={{
          mt: "2rem",
          height: "auto",
          pb: "3rem",
          color: "black",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            margin: "0 auto",
            flexDirection: "row",
            justifyContent: { xs: "space-between", sm: "space-between" },
          }}
        >
          <Stack>
            <Box sx={{ flexGrow: 1, flexBasis: 0 }}>
              <Typography variant="h5" sx={{ my: 4 }} fontWeight="bold">
                <img src={logo} className="logo"></img>
              </Typography>
              <Typography variant="tbody1" sx={{ pr: 4 }} textAlign="center">
                Encuentra todos los productos que necesitas para tu mascota y
                conecta con otros usuarios en un sólo sitio.
              </Typography>
            </Box>
          </Stack>
          <Stack flexDirection="row" sx={{ gap: { xs: "5rem" } }}>
            <Box
              sx={{
                flexGrow: 1,
                flexBasis: 0,
                textAlign: { xs: "left", sm: "center" },
              }}
            >
              <Typography variant="h5" sx={{ my: 4 }} fontWeight="bold">
                Contactanos
              </Typography>
              <Typography variant="tbody1">info@miauguau.cl</Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                flexBasis: 0,
                textAlign: { xs: "left", sm: "right" },
              }}
            >
              <Typography variant="h5" sx={{ my: 4 }} fontWeight="bold">
                Siguenos
              </Typography>
              <Box sx={{ ml: 1 }}>
                <FacebookIcon />
                <LinkedInIcon />
                <InstagramIcon />
                <TwitterIcon />
              </Box>
            </Box>
          </Stack>
        </Container>
      </AppBar>
    </>
  )
}
