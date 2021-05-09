import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Axios from 'axios';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DoDelete = () => {
      Axios.delete("https://saunalogs.herokuapp.com/upload",{data:{id:props.id}}).then(()=>{
          Axios.get("https://saunalogs.herokuapp.com/upload",{params:localStorage.getItem("username")}
      ).then((res)=>{
          props.setList(res.data);
          setOpen(false)
      })})
    
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} fullWidth={true}>
        削除
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      > 
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          サログの削除
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            本当にこのサログを削除しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            やめる
          </Button>
          <Button onClick={DoDelete} color="primary">
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
