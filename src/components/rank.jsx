import React ,{useEffect,useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';



const useStyles = makeStyles((theme) => ({
  root: {
    width:400,
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    textAlign:"center",
    paddingLeft:'10%',
    fontSize:"20px",
  },
list:{
    display:"flex",
    justifyContent: "space-between",
    [theme.breakpoints.down('sm')]: {
       display:"flex",
       flexDirection:"column"
      },
}

}));



export default function InsetList(props) {
  const classes = useStyles();
  let a=0;
  let b=0; 
        return(
            <div className={classes.list}>
        <List className={classes.root}>
            <h3>行ったサウナランキング</h3>
            {props.ranking.map((val)=>{
                a+=1
                if(a>=4)return
                return(
                <div>
                <ListItem alignItems="flex-start">
                <ListItemText primary={`${a}位：${val.key}`} secondary={`行った回数：${val.value}回　ととのった回数：${val.totonoi}`}/>
              </ListItem>
              <Divider variant="inset" component="li" />
              </div>)
            })}
        </List>

         <List className={classes.root}>
         <h3>評価が高かったサウナ</h3>
         {props.totalrate.map((val)=>{
             b+=1
             if(b>=4)return
             return(
             <div>
             <ListItem alignItems="flex-start">
             <ListItemText primary={`${b}位：${val.sauna}`} secondary={
                 `サ室の評価：${val.saunaroomrate}
                 水風呂の評価：${val.waterbathrate}
                 ととのいスポットの評価：${val.windrate}`}/>
             
             
           </ListItem>
           <Divider variant="inset" component="li" />
           </div>)
         })}
     </List>
     </div>
        )
 
}