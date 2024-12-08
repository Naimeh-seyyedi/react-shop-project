import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {validation} from 'pages/authentication/validation/ValidationLogin'
import {Link} from 'react-router-dom'
import { ApiAdmin } from 'api/ApiAdmin';

const Authentication = () => {
  const [user, setUserState] = useState({});
  const navigate = useNavigate();
  const inputChangeHandler = (e) => {
    const _user = { ...user, [e.target.name]: e.target.value }
    setUserState(_user)
  };



  const {values, errors,touched ,handleChange, handleSubmit,handleBlur} = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validation,
    
    onSubmit: async (user) => {
      try{
        localStorage.removeItem('token')
      let response = await ApiAdmin.login(user)
      localStorage.setItem('token', response.data.token)
      console.log(response.data.token)
      navigate('/admin-dashboard')
      }
      catch{
        alert("رمز عبور یا نام کاربری صحیح نمی باشد")
      }
    },
    
  });

  return (
    <div className="form-body">
      <div className="container1">
      <h1>ورود به پنل مدیریت</h1>
        <form className="form" onSubmit={handleSubmit} autocomplete="off">
          <input
            placeholder='نام کاربری'
            id="username"
            name="username"
            type="text"
            onBlur={handleBlur}
            onChange={(e) => {
              handleChange(e)
              inputChangeHandler(e)
            }}
            value={values.username}
            className={errors.username && touched.username ? "input-error input-style" : "input-style"}
          />
          {errors.username && touched.username && <p className='error'>{errors.username}</p>}
          <input
            onBlur={handleBlur}
            placeholder='رمز عبور'
            id="password"
            name="password"
            type="password"
            onChange={(e) => {
              handleChange(e)
              inputChangeHandler(e)
            }}
            value={values.password}
            className={errors.password && touched.password ? "input-error input-style" : "input-style"}
          />
           {errors.password && touched.password && <p className='error'>{errors.password}</p>}
          <button className='button1' type="submit">ورود</button>
        </form>
        <Link className='link-form' to={'/'}>صفحه اصلی</Link>
      </div>
    </div>
  )
}

export default Authentication