import Header from "layout/withonlineshoplayout/Header";
import Footer from "layout/withonlineshoplayout/Footer";


const WithOnlineShopLayout = (Component) => {
  return (props) => (
    <div>
      <Header />
      <Component {...props}/>
      <Footer />
    </div>
  );
};

export default WithOnlineShopLayout;
