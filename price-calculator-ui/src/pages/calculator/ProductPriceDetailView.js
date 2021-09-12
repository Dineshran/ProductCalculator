import React from 'react';
import {useStyles} from "../../template/FormControlStyle";
import {CssBaseline, Grid, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

export default function ProductPriceDetailView(props) {
    const {selectedItem} = props;
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={2} md={3}/>
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                <div className={clsx(classes.paper, "text-left")}>
                    <Typography component="h1" variant="h5">
                        Calculated Price
                    </Typography>
                    <div style={{marginTop: "1em"}}>

                        Total Quantity : {selectedItem.unitDto.cartons} Cartons
                        And {selectedItem.unitDto.singleUnits} Units
                    </div>
                    <div style={{marginTop: "1em"}}>
                        Total Cost : Rs.{selectedItem.priceDto.totalCost}
                    </div>
                    <div style={{marginTop: "1em"}}>
                        Total Discount : Rs.{selectedItem.priceDto.discount}
                    </div>
                    <div style={{marginTop: "1em"}}>
                        Per Unit Cost : Rs.{selectedItem.priceDto.perUnitCost}
                    </div>
                    <div style={{marginTop: "1em"}}>
                        Per Carton Cost : Rs.{selectedItem.priceDto.cartonCost}
                    </div>
                    <div style={{marginTop: "1em"}}>
                        Units Per Carton : {selectedItem.unitDto.unitPerCarton}

                    </div>
                </div>
            </Grid>
        </Grid>
    );
}