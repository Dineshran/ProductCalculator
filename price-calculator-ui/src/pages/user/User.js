import React, {useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Button, LinearProgress, Typography} from "@material-ui/core";
import {StyledTableCell, StyledTableRow, useProgressStyle, useStyles} from "../../template/TableStyle";
import axios from "axios";
import Title from "../interface/Title";
import {APP_URL} from "../../apiUtils/UrlConstant";
import {useHistory} from "react-router";
import {queryStringify} from "../../apiUtils/Utils";

const useStylesProgress = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default function User() {

    const columns = [
        { id: 'userName', label: 'Username', minWidth: 120 },
        {
            id: 'fullName',
            label: 'Full Name',
            minWidth: 120,
            align: 'left',
            format: (value) => value && value.toLocaleString('en-US'),
        },
        {
            id: 'loginName',
            label: 'Login Name',
            minWidth: 120,
            align: 'left',
            format: (value) => value && value.toLocaleString('en-US'),
        },
        {
            id: 'role',
            label: 'User Role',
            minWidth: 120,
            align: 'left',
            format: (value) => value && value.toLocaleString('en-US'),
        },
        {
            id: 'action',
            label: 'Action',
            minWidth: 120,
            align: 'left',
            format: (value) => <Button onClick={()=> history.push("/dashboard/userProfile")} color="primary" variant="contained">View Details</Button>,
        }

    ];

    const history = useHistory();
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [isLoaded, setLoaded] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [size, setSize] = useState(30);
    const [ rows , setRows] = useState([]);

    const isMounted = useRef(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const fetchData = async (page , size) => {
        setLoaded(false);
        let query = queryStringify({page:page , size:size})
        await axios(
            `${APP_URL}users?${query}`,
        ).then((res) => {
            if (res) setRows(res.data);
            setLoaded(true);
        })
    };

    useEffect(() => {
        if(!isMounted.current) {
            fetchData(page,size).then()
        }
        return () => {
            isMounted.current = true;
        };
    }, []);

    return (
        <>
            <Title> User List </Title>
            <Paper className={classes.root}> { isLoaded ?
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <StyledTableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    let index = 0;
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            index = index+1;
                                            return (
                                                <StyledTableCell key={index} align={column.align}>
                                                    {column.format ? column.format(value) : value}
                                                </StyledTableCell>
                                            );
                                        })}
                                    </StyledTableRow>
                                );
                            })
                            }
                        </TableBody>
                    </Table>

                    <TablePagination
                        rowsPerPageOptions={[10, 15 , 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableContainer>
                :
                <div className={useStylesProgress.root}>
                    <LinearProgress />
                </div> }
            </Paper>
        </>
    );
}
