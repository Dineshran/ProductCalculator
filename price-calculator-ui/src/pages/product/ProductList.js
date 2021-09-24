import React, {useEffect, useRef, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {StyledTableCell, StyledTableRow, useStyles} from "../../template/TableStyle";
import axios from "axios";
import Title from "../interface/Title";
import {APP_URL} from "../../apiUtils/UrlConstant";
import {LinearProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ProductPriceList from "./ProductPriceList";

const columns = [
    { id: 'id', label: 'Product Id', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 120,
        format: (value) => value && value.toLocaleString('en-US'), },
    {
        id: 'price',
        label: 'Carton Price',
        minWidth: 130,
        align: 'left',
        format: (value) => value && value.toLocaleString('en-US'),
    },{
        id: 'nosPerCarton',
        label: 'Units Per Carton',
        minWidth: 130,
        align: 'left',
        format: (value) => value && value.toLocaleString('en-US'),
    }
];

const useStylesProgress = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default function ProductList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(1);
    const [page, setPage] = useState(0);
    const [isLoaded, setLoaded] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [size, setSize] = useState(100);
    const [ rows , setRows] = useState([]);

    const isMounted = useRef(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickOpen = (row) => {
        setOpen(true);
        setSelectedValue(row.id)
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    const fetchData = async (page , size) => {
        setLoaded(false);
        await axios(
            `${APP_URL}product/list`,
        ).then((res) => {
            if (res) setRows(res.data.productDtoList);
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
            <ProductPriceList selectedValue={selectedValue} open={open} onClose={handleClose}></ProductPriceList>
            <Title> Product List </Title>
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
                                        {columns.map((column, index) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell key={index} align={column.align} onClick={() => handleClickOpen(row)}>
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
