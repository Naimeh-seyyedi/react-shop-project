import React, { useEffect } from "react";
import { formik, Form, Formik } from "formik";
import { Box, Grid, TextField } from "@mui/material";
import * as Yup from "yup";
import Textfield from "pages/checkoutPage/FormUi/TextFieldWrapper";
import WithOnlineShopLayout from "layout/WithOnlineShopLayout";
import Select from "pages/checkoutPage/FormUi/SelectWrapper";
import iranstates from "data/iranstates.json";
import DateTimePicker from "pages/checkoutPage/FormUi/DateTimePicker";
import Button from "pages/checkoutPage/FormUi/ButtonWrapper";
import { ApiAdmin } from "api/ApiAdmin";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import { useSelector } from "react-redux";
// console.log(Object.keys(iranstates))
const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  mobile: "",
  address: "",
  city: "",
};

//validation
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("نام کاربری را وارد کنید"),
  lastName: Yup.string().required("نام خانوادگی را وارد کنید"),
  mobile: Yup.number()
    .integer()
    .typeError("لطفا شماره موبایل معتبر وارد کنید ")
    .required("شماره موبایل لازم است"),
  address: Yup.string().required("لطفا آدرس خود را وارد کنید "),
  createdOn: Yup.date().default(function () {
    return new Date();
  }),
  city: Yup.string().required("شهر خود را وارد کنید"),
  // orderDate: Yup.date().required("تاریخ  سفارش  خود را وارد کنید "),
});

function Formcheckout() {
  const [getData, statGetData] = React.useState([]);
  const [reseiveDate, setReseiveDate] = React.useState(new Date());
  const cart = useSelector((state) => state.cart);

  return (
    <Box
      sx={{
        gap: 2,
        marginInline: 41.5,
        marginTop: "100px",
        padding: "30px",
        backgroundColor: "white",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Grid container>
        <container maxWidth="sm">
          <Formik
            initialValues={{ ...INITIAL_FORM_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={async (values) => {
              console.log(values);
            
            localStorage.setItem("userInfo", JSON.stringify(values))
              window.open("http://127.0.0.1:5501/index.html");
            }}
            
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      borderBottom: "5px groove  blue",
                      width: "100%",
                      paddingBottom: "10px",
                    }}
                  >
                    نهایی کردن خرید
                  </Grid>
                  <Grid item xs={6}>
                    <Textfield name="firstName" label="نام" />
                  </Grid>
                  <Grid item xs={6}>
                    <Textfield name="lastName" label="نام خانوادگی " />
                  </Grid>
                  <Grid item xs={12}>
                    آدرس
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield
                      name="address"
                      label="آدرس "
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      name="city"
                      label="شهر "
                      options={Object.keys(iranstates)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Textfield name="mobile" label="موبایل " />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePicker name="date" />
                  </Grid>

                  <Grid item xs={12}>
                    <Button variant="contained" color="success">
                      پرداخت
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </container>
      </Grid>
    </Box>
  );
}

export default WithOnlineShopLayout(Formcheckout);
