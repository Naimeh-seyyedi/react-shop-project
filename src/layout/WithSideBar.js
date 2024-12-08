
import { Grid } from '@mui/material';
import Header from './withonlineshoplayout/Header';
import Footer from './withonlineshoplayout/Footer';
import SideBar from './withSidebar/SideBar';

const WithSideBar = (Component) => {
  return (props) => (
    <>
      <Header />
      <Grid container>
        <Grid item  sm={0}  md={2.5} lg={2.5} xs={0}>
          <SideBar />
        </Grid>
        <Grid item xs={12} sm={12} lg={9} md={9}>
          <Component {...props} />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
};

export default WithSideBar;