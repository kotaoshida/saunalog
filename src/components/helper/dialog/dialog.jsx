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
import GroupedSelect from"./select"
import HoverRating from"./saunaroomrating"
import "./dialog.css"
import Rating from '@material-ui/lab/Rating';
import Axios from "axios"
import TextField from '@material-ui/core/TextField';
import ContainedButtons from"./place/place"
import RadioButtonsGroup from"../../totonoi"
import MaterialUIPickers from"./date"

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
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} fullWidth={true}>
          <CloseIcon/>
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


function formatDate(dt) {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth()+1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
}

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [sauna,setSauna]=useState(null);
  const [waterBath,setWaterBath]=useState(0);
  const [saunaRoom,setSaunaRoom]=useState(0);
  const [wind,setWind]=useState(0);
  const [memo,setMemo]=useState("");
  const [totonoi,setTotonoi]=useState(null)
  const [date,setDate]=useState(null)
 const obj ={sauna:sauna,saunaroomrate:saunaRoom,waterbathrate:waterBath,windrate:wind}

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
      registLog();
    setOpen(false);
  };

  const close = () => {
    
  setOpen(false);
};

  function setsauna (name) {
                setSauna(name);
  }

  const registLog = ()=>{

    Axios.post("http://localhost:3001/upload",{
        sauna:sauna,
        saunaroomrate:saunaRoom,
        waterbathrate:waterBath,
        windrate:wind,
        username:localStorage.getItem("username"),
        memo:memo,
        totonotta:Number(totonoi),
        date:date

        }).then(()=>{ Axios.get("http://localhost:3001/upload",{params:localStorage.getItem("username")}
        ).then((res)=>{
            props.setList(res.data);
            setSauna("")
        })})
        
}


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} fullWidth={true}>
        サウナを追加
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth={true} >
        <DialogTitle id="customized-dialog-title" onClose={close} fullWidth={true}>
          サウナログを追加しよう！
        </DialogTitle>
        <DialogContent dividers>
        <Typography gutterBottom>
            現在地からさがす
            <ContainedButtons setsauna={setsauna}/>
          </Typography>
          <Typography gutterBottom>
            都道府県からさがす
            <GroupedSelect setsauna={setsauna}/>
          </Typography>
          <div className="saunaName">
          <h1>{sauna}</h1>
          </div>
          <MaterialUIPickers setDate={setDate} date={date}/>
          <div className="rate">
                <div className="eachRate">
              サ室の評価
            <Rating name="size-small" defaultValue={2}  onChange={(e)=>{setSaunaRoom(e.target.value)}}/>
                </div>
            <div className="eachRate">
                水風呂の評価
            <Rating name="size-medium" defaultValue={2} onChange={(e)=>{setWaterBath(e.target.value)}}/>
            </div>
            <div className="eachRate">
                ととのいスポットの評価
            <Rating name="size-large" defaultValue={2} onChange={(e)=>{setWind(e.target.value)}}/>
            </div>
          </div>

            <div>
            <RadioButtonsGroup totonoi={totonoi} setTotonoi={setTotonoi}/>
            </div>

          <div className="memo">
          <TextField
          id="standard-textarea"
          label="ひとことメモ"
          placeholder="ととのいイスあり。など..."
          multiline
          fullWidth={true}
          onChange={(e)=>{setMemo(e.target.value)}}
        />
            </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary" fullWidth={true}>
            サログを追加
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}