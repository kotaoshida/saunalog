import React ,{useState}from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import GroupedSelect from"../select"
import "../dialog.css"
import Rating from '@material-ui/lab/Rating';
import Axios from "axios"
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    fontSize:"50px",
    

  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(5),

  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Edit(props) {
  const [open, setOpen] = React.useState(false);
  const [sauna,setSauna]=useState(props.sauna);
  const [waterBath,setWaterBath]=useState(props.waterbathrate);
  const [saunaRoom,setSaunaRoom]=useState(props.saunarate);
  const [wind,setWind]=useState(props.windrate);
  const [memo,setMemo]=useState(props.memo);
  const id =props.id
 const obj ={sauna:sauna,saunaroomrate:saunaRoom,waterbathrate:waterBath,windrate:wind}

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
      registLog();
    setOpen(false);
  };

  function setsauna (name) {
                setSauna(name);
  }

  const registLog = ()=>{
    Axios.put("https://saunalogs.herokuapp.com/upload",{
      sauna:sauna,
      saunaroomrate:saunaRoom,
      waterbathrate:waterBath,
      windrate:wind,
      id:id,
      memo:memo,
      username:localStorage.getItem("username")
    }).then(()=>{ Axios.get("https://saunalogs.herokuapp.com/upload",{params:localStorage.getItem("username")}
    ).then((res)=>{
        props.setList(res.data)
        console.log("a");
    })})

        
}


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} fullWidth={true}>
        編集
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="false">
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          サウナログ編集
        </DialogTitle>
        <DialogContent dividers>
        <Typography gutterBottom>
          {props.sauna}
          </Typography>
          <div className="saunaName">
          <h1>{sauna}</h1>
          </div>
          <div className="rate">
              <div className="eachRate">
            サ室の評価
          <Rating name="size-small" defaultValue={props.saunarate}  onChange={(e)=>{setSaunaRoom(e.target.value)}}/>
              </div>
          <div className="eachRate">
              水風呂の評価
          <Rating name="size-medium" defaultValue={props.waterbathrate} onChange={(e)=>{setWaterBath(e.target.value)}}/>
          </div>
          <div className="eachRate">
              ととのいスポットの評価
          <Rating name="size-large" defaultValue={props.windrate} onChange={(e)=>{setWind(e.target.value)}}/>
          </div>


          </div>
          <div className="memo">
          <TextField
          id="standard-textarea"
          label="ひとことメモ"
          placeholder={props.memo}
          multiline
          fullWidth={true}
          onChange={(e)=>{setMemo(e.target.value)}}
        />
            </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary" fullWidth={true}>
            編集する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
