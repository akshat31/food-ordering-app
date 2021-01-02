import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { capitalizeFirstLetter } from "../../common/utils";
import { commonGetFetch } from "../../common/api";
import { makePreciseValue } from "../../common/utils";

// CSS
import "./Checkout.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Checkout = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [value, setValue] = useState(0);
  const [address, setAddress] = useState({
    flat: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
    payment: ''
  });
  const [stateList, setStateList] = useState({});
  const [paymentType, setPaymentType] = useState({});
  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const steps = ["Delivery", "Payment"];
  const {
    location: { state },
  } = useHistory();
  const { itemList, restaurant, totalPrice } = state;

  useEffect(
    () => {
      if (snackPack.length && !messageInfo) {
        // Set a new snack when we don't have an active one
        setMessageInfo({ ...snackPack[0] });
        setSnackPack((prev) => prev.slice(1));
        setOpen(true);
      } else if (snackPack.length && messageInfo && open) {
        // Close an active snack when a new one is added
        setOpen(false);
      }

      commonGetFetch('states').then((response) => {
        setStateList(response);
      });

      commonGetFetch('payment').then((response) => {
        setPaymentType(response);
      });
    },
    [snackPack, messageInfo, open]
  );

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClick = (message) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const getStateArrayList = () => {
    return (stateList.states || []).map((res) => {
      return res.state_name;
    })
  }

  const getPaymentMethodArrayList = () => {
    return (paymentType.paymentMethods || []).map((res) => {
      return res.payment_name;
    })
  }

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const getStepContent = (step) => {
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleAddress = (e) => {
      setAddress({
        ...address,
        [e.target.name]: e.target.value,
      });
    };

    switch (step) {
      case 0:
        return (
          <div>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="EXISTING ADDRESS" {...a11yProps(0)} />
                <Tab label="NEW ADDRESS" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} className={classes.root}>
              <GridList
                cols={3}
                cellHeight={"auto"}
                className={classes.gridList}
              >
                <GridListTile cellHeight={350}>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <span className="CheckBox">
                    <CheckCircleIcon />
                  </span>
                </GridListTile>
                <GridListTile cellHeight={350}>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <span className="CheckBox">
                    <CheckCircleIcon />
                  </span>
                </GridListTile>
                <GridListTile cellHeight={350}>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <span className="CheckBox">
                    <CheckCircleIcon />
                  </span>
                </GridListTile>
                <GridListTile cellHeight={350}>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <Typography>Jansi, 1603</Typography>
                  <span className="CheckBox">
                    <CheckCircleIcon />
                  </span>
                </GridListTile>
              </GridList>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div>
                <form noValidate autoComplete="off">
                  <div className="CardStyle">
                    <FormControl required>
                      <InputLabel htmlFor="Flat">
                        Flat / Building No.
                      </InputLabel>
                      <Input
                        id="Flat"
                        name="flat"
                        value={address.flat}
                        onChange={handleAddress}
                      />
                      <FormHelperText className="invisible">
                        <span className="red">required</span>
                      </FormHelperText>
                    </FormControl>
                    <FormControl required>
                      <InputLabel htmlFor="Locality">Locality</InputLabel>
                      <Input
                        name="locality"
                        value={address.locality}
                        onChange={handleAddress}
                      />
                      <FormHelperText className="invisible">
                        <span className="red">required</span>
                      </FormHelperText>
                    </FormControl>
                    <FormControl required>
                      <InputLabel htmlFor="City">City</InputLabel>
                      <Input
                        name="city"
                        value={address.city}
                        onChange={handleAddress}
                      />
                      <FormHelperText className="invisible">
                        <span className="red">required</span>
                      </FormHelperText>
                    </FormControl>
                    <FormControl required className="formControl">
                      <InputLabel htmlFor="showDate">Choose State:</InputLabel>
                      <Select
                        name='state'
                        value={address.state}
                        onChange={handleAddress}
                      >
                        {
                          (getStateArrayList() || []).map((res) => {
                            return(
                              <MenuItem value={res}>{res}</MenuItem>
                            )
                          })
                        }
                      </Select>
                      <FormHelperText className="invisible">
                        <span className="red">required</span>
                      </FormHelperText>
                    </FormControl>
                    <FormControl required>
                      <InputLabel htmlFor="Pincode">Pincode</InputLabel>
                      <Input
                        name="pincode"
                        value={address.pincode}
                        onChange={handleAddress}
                      />
                      <FormHelperText className="invisible">
                        <span className="red">
                          Pincode must contain only numbers and must be 6 digits
                          long
                        </span>
                      </FormHelperText>
                    </FormControl>
                    <br />
                  </div>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick="addAddressHandler"
                  >
                    SAVE ADDRESS
                  </Button>
                  <FormHelperText className="invisible">
                    <span className="red">required</span>
                  </FormHelperText>
                </form>
              </div>
            </TabPanel>
          </div>
        );
      case 1:
        return (
          <div>
            <FormControl component="fieldset">
              <FormLabel className='text-primary my-3 pt-3' component="legend">Select Mode of Payment</FormLabel>
              <RadioGroup
                aria-label="payment"
                name="payment"
                payment={address.payment}
                onChange={handleAddress}
              >
                {
                  (getPaymentMethodArrayList() || []).map((res) => {
                      return (
                        <FormControlLabel
                          value={res}
                          control={<Radio />}
                          label={res}
                        />
                      )
                  })
                }
              </RadioGroup>
            </FormControl>
          </div>
        );
      default:
        return "Unknown step";
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-9">
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                    <div>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0}>
                <Typography>
                  View your order summary & place your order now!
                </Typography>
                <Button onClick={handleReset}>Change</Button>
              </Paper>
            )}
          </div>
          <div className="col-lg-3">
            <Card className="summaryCard">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Summary
                </Typography>
                <Typography className="my-3" variant="p" component="p">
                  {restaurant}
                </Typography>
                <ul className="cart-list p-0 mb-0">
                  {itemList && itemList.length > 0
                    ? itemList.map((item, index) => {
                        return (
                          <li key={index}>
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-5 col-5 d-flex">
                                  <i
                                    className="fa fa-stop-circle-o pt-1"
                                    style={{
                                      color:
                                        item.item.item_type === "VEG"
                                          ? "green"
                                          : "red",
                                    }}
                                    aria-hidden="true"
                                  />
                                  <p className="text-muted ml-3 mb-0">
                                    <small>
                                      {capitalizeFirstLetter(
                                        item.item.item_name
                                      )}
                                    </small>
                                  </p>
                                </div>
                                <div className="col-lg-4 col-4 text-right">
                                  <span className="px-2">{item.quantity}</span>
                                </div>
                                <div className="col-lg-3 col-3 p-0 text-right">
                                  <p className="text-muted mb-0">
                                    <small>
                                      <i
                                        className="fa fa-inr mr-1"
                                        aria-hidden="true"
                                      />
                                      {makePreciseValue(item.totalItemPrice)}
                                    </small>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })
                    : null}
                </ul>
                <Divider className="my-3" />
                <div className="d-flex justify-content-between mb-4">
                  <Typography variant="p" component="h6">
                    New Amount
                  </Typography>
                  <Typography variant="p" component="h6">
                    <i className="fa fa-inr mr-1" aria-hidden="true" />
                    {totalPrice}
                  </Typography>
                </div>
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  color="primary"
                  onClick={handleClick(
                    "Order placed successfully! Your order ID is {orderID}."
                  )}
                >
                  Place Order
                </Button>
                <Snackbar
                  key={messageInfo ? messageInfo.key : undefined}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  onExited={handleExited}
                  message={messageInfo ? messageInfo.message : undefined}
                  action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                      >
                        <CloseIcon />
                      </IconButton>
                  }
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
