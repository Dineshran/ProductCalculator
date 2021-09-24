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
import {Dialog, DialogTitle, LinearProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStylesProgress = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default function ProductPriceList(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open} = props;
    const [page, setPage] = useState(0);
    const [isLoaded, setLoaded] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [size, setSize] = useState(100);
    const [ rows , setRows] = useState([]);
    const header = ["Total Quantity" , "Total Price", "Discount"]

    const isMounted = useRef(false);


    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const fetchData = async (page , size) => {
        setLoaded(false);
        await axios(
            `${APP_URL}price/${selectedValue}`,
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
    }, [open]);

    return (
        <Dialog fullWidth onClose={handleClose} aria-labelledby="dialog-title" open={open}>
            <DialogTitle id="dialog-title">Product Price Detail</DialogTitle>
            <Title> Product List </Title>
            <Paper className={classes.root}> { isLoaded ?
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {header.map((column, index) => (
                                    <StyledTableCell
                                        key={index}
                                        align={'left'}
                                        style={{ minWidth: 120 }}
                                    >
                                        {column}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                let index = 0;
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        <StyledTableCell key={index} align={'left'}>
                                            {row.unitDto.totalQuantity}
                                        </StyledTableCell>
                                        <StyledTableCell key={index} align={'left'}>
                                            {row.priceDto.totalCost}
                                        </StyledTableCell>
                                        <StyledTableCell key={index} align={'left'}>
                                            {row.priceDto.discount}
                                        </StyledTableCell>
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
        </Dialog>
    );
}
