import * as Yup from 'yup'
// import { AdminApis } from 'service/AdminApis';



export const validation = Yup.object().shape({
  username: Yup.string()
    .required('نام کاربری را وارد کنید')
    .min(5, 'نام کاربری باید 5 کاراکتر باشد'),
  password: Yup.string()
    .min(5,'رمز عبور باید 5 کاراکتر باشد')
    .required('رمز عبور را وارد کنید'),
})