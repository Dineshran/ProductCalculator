import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 18
    },
    body: {
        fontSize: 16,
    },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
    root: {
        borderColor: "rgba(158, 158, 158, 0.88)",
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        "&:hover": {
            backgroundColor: `${"rgba(189, 189, 189, 0.4)"} !important`,
            color: `${theme.palette.common.white} !important`,
        }
    },
}))(TableRow);

export const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    div : {
        marginBottom: 1,
    }
});

export const useProgressStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));




