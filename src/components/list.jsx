import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import "./list.css"
import Edit from "./helper/dialog/edit/edit"
import DraggableDialog from "./helper/delete/delete"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
        {props.list.map((val)=>{
            return(
            <div>
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="https://maps.google.com/maps/contrib/107835050627179424062\" />
            </ListItemAvatar>
            <ListItemText
              primary={val.sauna}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                <div className="rate">
                 <div className="saunaroom">
                    サ室の評価
                 <Rating name="size-small" defaultValue={val.saunaroomrate} value={val.saunaroomrate}readOnly/>
                 </div>

                 <div className="saunaroom">
                     水風呂の評価
                 <Rating name="size-small" defaultValue={val.waterbathrate} value={val.waterbathrate} readOnly/>
                 </div>
                 <div className="saunaroom">
                     ととのいスポットの評価
                 <Rating name="size-small" defaultValue={val.windrate} value={val.windrate}readOnly/>
                 </div>
                    <Edit sauna={val.sauna}  saunarate={val.saunaroomrate} waterbathrate={val.waterbathrate} windrate={val.windrate} memo={val.memo} id={val.id} setList={props.setList}/>
                    <DraggableDialog id={val.id} setList={props.setList}/>
                 </div>
                  </Typography>
                  <h4 >ひとことメモ：{val.memo}</h4>
                </React.Fragment>
              }
            />
          </ListItem>

          <Divider variant="inset" component="li" />
          </div>)
        })}
      
      
    </List>
  );
}
