
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ModalForm from './ModalForm';

export default function Dialogs({ open, handleClose,inEditMode,getPosts}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         افزودن/ویرایش کالا
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <ModalForm inEditMode={inEditMode} handleClose={handleClose} getPosts={getPosts}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
