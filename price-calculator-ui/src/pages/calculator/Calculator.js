import React, {useEffect, useState, useRef} from 'react';
import {
    Typography,
    Paper,
    Button,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    TextareaAutosize, CircularProgress, Backdrop
} from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import {useHistory} from "react-router";
import {useStyles} from "../../template/FormControlStyle";
import * as yup from "yup";
import clsx from "clsx";
import axios from "axios";
import {APP_URL} from "../../apiUtils/UrlConstant";
import {useFormik} from "formik";
import {number} from "yup";
import ProductPriceDetailView from "./ProductPriceDetailView";

function preventDefault(event) {
    event.preventDefault();
}

export default function Calculator() {

    const validationSchema = yup.object({
        quantity: yup
            .number('Enter the Quantity')
            .required('Quantity is required'),
        product: yup
            .number('Select the Product')
            .required('Product is required'),
    });

    const classes = useStyles();
    const history = useHistory();
    const [ error , setError ] = useState(null);
    const [ option , setOption ] = useState([]);
    const [ selectedItem , setSelectedItem ] = useState(null);
    const isMounted = useRef(false);

    const checkPrice = (values) => {
        formik.setSubmitting(true);
            const priceRequest = {
                quantity: values.quantity,
                product: values.product
            };
            axios.get(`${APP_URL}price/${priceRequest.product}/${priceRequest.quantity}`)
                .then( (res) => {
                        formik.setSubmitting(false);
                        setSelectedItem(res.data);
                    }
                )
                .catch(error => {
                    setError(error.message);
                    formik.setSubmitting(false);
                    console.error('There was an error!', error);
                });


    }


    const formik = useFormik({
        initialValues: {
            quantity: 0,
            product: '1',
        },
        validationSchema: validationSchema,
        onSubmit: checkPrice,
    });

    const fetchData = async () => {
        await axios(
            `${APP_URL}product/list`,
        ).then((res) => {
            if(!isMounted.current) {
                if (res) setOption(res.data.productDtoList);
            }
        })
    };

    useEffect(() => {
            fetchData().then()
        return () => {
            isMounted.current = true;
        };
    }, []);

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={2} md={3} />
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                <div className={clsx(classes.paper , "text-left")}>
                    <Typography component="h1" variant="h5" >
                        Calculate Price
                    </Typography>
                    { error &&
                    <Alert severity="error">{error}</Alert> }
                    <form className={classes.form} onSubmit={formik.handleSubmit}>
                        <div style={{marginTop : "1em"}}>
                        <FormControl variant="outlined" className={classes.form}>
                            <InputLabel htmlFor="outlined-region-native-simple">Select Product</InputLabel>
                            <Select
                                native
                                displayEmpty = {true}
                                value={formik.values.product}
                                label="Select Product"
                                inputProps={{
                                    name: 'product',
                                    id: 'outlined-region-native-simple',
                                }}
                                onChange={(e)=> formik.setFieldValue( 'product' , e.target.value)}

                            >
                                <option aria-label="Please Select a Product " value="" />
                                { option && option.map((opt,index)=> {
                                    return(
                                        <option key={index} value={opt.id} > {opt.name} </option>
                                    );
                                }) }
                            </Select>
                            {formik.errors.product && formik.touched.product && (
                                <Alert severity="error">{formik.errors.product}</Alert>
                            )}
                        </FormControl>
                        </div>
                        <FormControl className={classes.form}>
                        <TextField
                            variant="outlined"
                            type={number}
                            margin="normal"
                            fullWidth
                            name="fileName"
                            label="Enter Quantity"
                            id="fileName"
                            value={formik.values.quantity}
                            onChange={(e)=> formik.setFieldValue( 'quantity' , e.target.value)}
                        />
                            {formik.errors.quantity && formik.touched.quantity && (
                                <Alert severity="error">{formik.errors.quantity}</Alert>
                            )}
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={formik.isSubmitting}
                        >
                           Check Price
                        </Button>
                    </form>
                </div>
                <Backdrop className={classes.backdrop} open={formik.isSubmitting}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Grid>
            { selectedItem && <ProductPriceDetailView selectedItem = {selectedItem}></ProductPriceDetailView> }
        </Grid>
    );
}