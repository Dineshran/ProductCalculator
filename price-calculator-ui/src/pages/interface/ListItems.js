import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";
import {AccountCircle, AddToQueue, Apps, AvTimer, Ballot, ViewList} from "@material-ui/icons";
import Title from "./Title";
import List from "@material-ui/core/List";
import {useStyles} from "../../template/UseStyles";
import clsx from "clsx";

export default function MenuList() {

    const [ selected , setSelected ] = useState("");
    const classes = useStyles();

    return (
        <List>
            <Link to={"/dashboard/products"}>
                <ListItem button onClick={()=>setSelected('productList')} className={`${selected === 'productList' ? classes.active : ""}`}>
                    <ListItemIcon>
                        <Ballot/>
                    </ListItemIcon>
                    <ListItemText> <Title> Products </Title> </ListItemText>
                </ListItem>
            </Link>
            <Link to={"/dashboard/calculator"} >
                <ListItem button onClick={()=>setSelected('calculator')} className={`${selected === 'calculator' ? classes.active : ""}`} >
                    <ListItemIcon>
                        <AddToQueue/>
                    </ListItemIcon>
                    <ListItemText> <Title> Calculator </Title> </ListItemText>
                </ListItem>
            </Link>
        </List>
    );
}