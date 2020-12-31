import React from "react";
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
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
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
  const [payment, setPayment] = React.useState('COD');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePayment = (e) => {
    setPayment(e.target.payment);
  };

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
    <TabPanel value={value} index={0}>
      ADDRESS
    </TabPanel>
    <TabPanel value={value} index={1}>
      NEW ADDRESS
    </TabPanel>
  </div>
      );
    case 1:
      return (
        <div>
          <FormControl component="fieldset">
      <FormLabel component="legend">Select Mode of Payment</FormLabel>
      <RadioGroup aria-label="payment" name="gender1" payment={payment} onChange={handlePayment}>
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

  const classes = useStyles();
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

  return (
    <>
      <div>
        <div className="flex-containerDetails">
          <div className="leftDetails">
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
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
                <Button onClick={handleReset} className={classes.button}>
                  Change
                </Button>
              </Paper>
            )}
          </div>
        </div>
        <div className="rightDetails">
          Summary
        </div>
      </div>
    </>
  );
};

export default Checkout;
