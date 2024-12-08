import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import footerBg from "assets/images/footer/footer_bg.png";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Footer() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundImage: `url(${footerBg})`,
        height: 100,
        position: "relative ",
        left: 0,
        bottom: 0,
        width: "100%",
        marginTop:"50px"
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ textAlign: "center", paddingBottom: "10px" }}>
            {" "}
            <Typography>ما را در شبکه های اجتماعی دنبال کنید</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: 'space-around'}}>
            {" "}
            <TelegramIcon sx={{ color: blueGrey[100] }} />
            <InstagramIcon sx={{ color: blueGrey[100] }} />
            <TwitterIcon sx={{ color: blueGrey[100] }}/>
          </Box>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </Box>
  );
}
// export default function Footer() {
//   return (
//     <Box
//     sx={{
//       backgroundImage: `url(${footerBg})`,
//       height: 100,
//       position: "stiky",
//       bottom: 0,
//       width: "100%",
//     }}
//   >
//     <Container maxWidth="lg">
//     <Grid container spacing={3}>
//         <Grid item xs>
//           <Item>xs</Item>
//         </Grid>
//         <Grid item xs={6}>
//         <TelegramIcon />
//           <InstagramIcon />
//           <TwitterIcon />
//         </Grid>
//         <Grid item xs>
//           <Item>xs</Item>
//         </Grid>
//       </Grid>
//       </Grid>
//     </Container>
//   </Box>
//   );
// }
