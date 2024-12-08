
import React from "react";
import { Formik, useField, useFormikContext } from "formik";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { calendar } from "react-multi-date-picker";



const DateTimePicker = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      calendar={persian}
      locale={persian_fa}
        name="datepicker"
      inputClass="custom-input"
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue("datepicker", val.unix*1000,true);
        console.log(val)
      }}
    />
  );
};

export default DateTimePicker;
