import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuList from './interface/ListItems';
import {Route, Switch} from "react-router";
import Calculator from "./calculator/Calculator";
import CopyRight from "./CopyRight";
import {useStyles} from "../template/UseStyles";
import {ChevronLeft} from "@material-ui/icons";
import ProductList from "./product/ProductList";
import Account from "./user/profile";

export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h4" color="inherit" noWrap
                                className={clsx(classes.title)}>
                        Price Calculator
                    </Typography>
                    <Typography component="h1" variant="h6" color="inherit" noWrap
                                className={clsx(classes.title, !open && classes.menuButtonHidden)}>
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <Badge color="secondary">
                            <SettingsIcon/>
                        </Badge>
                    </IconButton>
                    <Link href={"/login"} color={"inherit"}>
                        <IconButton color="inherit">
                            <Badge color="secondary">
                                <ExitToAppIcon/>
                            </Badge>
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.appBarSpacer}>
                        <IconButton color="inherit" className={clsx(classes.toolbarIcon)} onClick={handleDrawerClose}>
                            <Badge color="secondary">
                                <ChevronLeft/>
                            </Badge>
                        </IconButton>
                </div>
                <Divider/>
                <MenuList/>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container fixed maxWidth="xl" className={classes.container}>
                    <Switch>
                        <Route exact path={"/dashboard/products"} component={ProductList}></Route>
                        <Route exact path={"/dashboard/calculator"} component={Calculator}></Route>
                        <Route exact path={"/dashboard/userProfile"} component={Account}></Route>
                        <Route path={"/dashboard"} component={ProductList}></Route>
                    </Switch>
                    <Box pt={4}>
                        <CopyRight/>
                    </Box>
                </Container>
            </main>
        </div>
    );
}