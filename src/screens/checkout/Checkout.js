import React from "react";
import 'fontsource-roboto';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Divider } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import StopIcon from '@material-ui/icons/Stop';
import './Checkout.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
  gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%',
        height: 350,
    },
}));

function TabPanel(props) {

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function getSteps() {
  return ['Delivery', 'Payment'];
}

function getStepContent(step) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [flat, setflat] = React.useState("");
  const [locality, setlocality] = React.useState("");
  const [city, setcity] = React.useState("");
  const [pincode, setpincode] = React.useState("");
  const [payment, setPayment] = React.useState("");

  const classes = useStyles();

  switch (step) {
    case 0:
      return (
        <div>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="EXISTING ADDRESS" {...a11yProps(0)} />
              <Tab label="NEW ADDRESS" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} className={classes.root}>
          <GridList cols={3} className={classes.gridList}>
          <GridListTile cellHeight={350}>
            <Typography>Jansi, 1603</Typography>
            <Typography>Jansi, 1603</Typography>
            <Typography>Jansi, 1603</Typography>
            <Typography>Jansi, 1603</Typography>
            <Typography>Jansi, 1603</Typography>
            <Typography>Jansi, 1603</Typography>
            <span className='CheckBox'><CheckCircleIcon /></span>
          </GridListTile>
          <GridListTile cellHeight={350}>
            <Typography>Jansi, 1603</Typography>
            <Typography>Jansi, 1603</Typography>
            <Typography>Jansi, 1603</Typography>
            <Typography>Jansi, 1603</Typography>
            <Typography>Jansi, 1603</Typography>
            <Typography>Jansi, 1603</Typography>
            <span className='CheckBox'><CheckCircleIcon /></span>
          </GridListTile>
          <GridListTile cellHeight={350}>
            <Typography>Jansi, 1603</Typography>
            <Typography>Jansi, 1603</Typography>
            <Typography>Jansi, 1603</Typography>
            <Typography>Jansi, 1603</Typography>
            <Typography>Jansi, 1603</Typography>
            <Typography>Jansi, 1603</Typography>
            <span className='CheckBox'><CheckCircleIcon /></span>
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
            <span className='CheckBox'><CheckCircleIcon /></span>
          </GridListTile>
          </GridList>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="CardStyle">
              <form noValidate autoComplete="off" className="CardStyle">
                <FormControl required >
                  <InputLabel htmlFor="Flat">Flat / Building No.</InputLabel>
                  <Input id="Flat" value={flat} onChange={e => setflat(e.target.value)} />
                </FormControl>
                <FormControl required >
                  <InputLabel htmlFor="Locality">Locality</InputLabel>
                  <Input id="Locality" value={locality} onChange={e => setlocality(e.target.value)} />
                </FormControl>
                <FormControl required >
                  <InputLabel htmlFor="City">City</InputLabel>
                  <Input id="City" value={city} onChange={e => setcity(e.target.value)} />
                </FormControl>
                <FormControl required className="formControl">
                  <InputLabel htmlFor="showDate">Choose Show Date:</InputLabel>
                  <Select></Select>
                </FormControl>
                <FormControl required >
                  <InputLabel htmlFor="Pincode">Pincode</InputLabel>
                  <Input id="Pincode" value={pincode} onChange={e => setpincode(e.target.value)} />
                </FormControl><br />
              </form>
            </div>
            <Button variant="contained" color="secondary" onClick="addAddressHandler">
              SAVE ADDRESS
              </Button>
          </TabPanel>
        </div>
      );
    case 1:
      return (
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Mode of Payment</FormLabel>
            <RadioGroup aria-label="payment" name="gender1" payment={payment} onChange={e => setPayment(e.target.payment)}>
              <FormControlLabel payment="COD" control={<Radio />} label="Cash on Delivery" />
              <FormControlLabel payment="Wallet" control={<Radio />} label="Wallet" />
              <FormControlLabel payment="NB" control={<Radio />} label="Net Banking" />
              <FormControlLabel payment="Cards" control={<Radio />} label="Debit/Credit" />
            </RadioGroup>
          </FormControl>
        </div>
      );
    default:
      return 'Unknown step';
  }
}


const Checkout = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClick = (message) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };


  return (
    <>
      <div className="container">
        <div className="flex-containerDetails">
          <div className="leftDetails">
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
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} >
                <Typography>View your order summary & place your order now!</Typography>
                <Button onClick={handleReset}>
                  Change
                </Button>
              </Paper>
            )}
          </div>
        </div>
        <div className="rightDetails">
          <Card>
            <CardContent>
            <Typography variant="h5" component="h2">
                Summary
              </Typography><br></br>
              <Typography variant="subtitle1" component="h6">Restraunt Name</Typography><br></br>
              <Avatar fontSize="small"><StopIcon /></Avatar><Typography color="textSecondary">Item Name</Typography>
              <Typography color="textSecondary">Item Name</Typography><br></br>
              <Divider /><br/>
              <Typography>New Amount:</Typography><br></br>
              <Button
                style={{"width" : "100%"}}
                variant="contained"
                color="primary"
                onClick={handleClick('Order placed successfully! Your order ID is {orderID}.')}>
                Place Order
              </Button>
              <Snackbar
                key={messageInfo ? messageInfo.key : undefined}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                onExited={handleExited}
                message={messageInfo ? messageInfo.message : undefined}
                action={
                  <React.Fragment>
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      onClick={handleClose}
                    >
                      <CloseIcon />
                    </IconButton>
                  </React.Fragment>
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Checkout;
