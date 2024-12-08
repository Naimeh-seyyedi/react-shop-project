
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ModalOrder from 'components/ModalOrder';


export default function DialogsOrder({ open, handleClose,getPosts,inOrder ,status}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         نمایش سفارش 
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <ModalOrder handleClose={handleClose} getPosts={getPosts} inOrder={inOrder} status={status}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
