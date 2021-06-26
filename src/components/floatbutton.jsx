import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    position: "fixed",
    bottom: 0,
    right:0,
    zIndex:500,

  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    
  },
}));

export default function FloatingActionButtons(props) {
  const classes = useStyles();

  return (
    <div>
      <div>
        <Fab variant="extended" color="primary" aria-label="add" className={classes.margin} onClick={props.onclick}>
        <AddIcon />
          サログを追加する
        </Fab>
      </div>
    </div>
  );
}
