import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const getToken = ()=>{
  return localStorage.getItem('token') || null;
}

const ProtectedRoute=(props)=>{
    return getToken() ? <Outlet /> :<Navigate to='/authentication'/>
  }

export default ProtectedRoute


