import React from "react";
import hotalImage from '../../common/images/hotal.jpg';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import AddIcon from '@material-ui/icons/Add';

import './Details.css';

const isVeg = false;

const Details = () => {
  const generate = (Component) => {
    let GeneratedComp = [];
    for (let i = 0; i < 4; i++) {
      GeneratedComp.push(Component)
    }

    return GeneratedComp
  }

  const HotalDetailRenderer = () => {
    return (
      <div className='detail-container'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3'>
              <img className='hotal-img img-fluid' src={hotalImage} alt='hotal' />
            </div>
            <div className='col-lg-5'>
              <div className='name-container'>
                <h2>Loud Silence</h2>
                <h6 className='mb-3'>CDE-BELAPUR</h6>
                <p><small>Chaines continantal indian snacks</small></p>
                <p className='mb-0'><StarIcon style={{ fontSize: '18px' }} /> 4.4</p>
                <p className='text-muted w-25 rating-desc'><small>Average rate by 658 customers</small></p>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='rate-container'>
                <p className='mb-0'><i className="fa fa-inr mr-1" aria-hidden="true"></i>600 Rs</p>
                <p className='mb-4 text-muted w-25 rating-desc'><small>Average rate by 658 customers</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const CheckoutCardRenderer = () => {
    return (
      <Card className='mt-4'>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <Badge className='mr-3' badgeContent={4} color="primary">
              <ShoppingCartIcon />
            </Badge>
            My Cart
        </Typography>
          <ul className='cart-list p-0 mb-0'>
            {
              generate(
                <li>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-lg-5 d-flex'>
                        <i
                          className='fa fa-stop-circle-o pt-1'
                          style={{ color: isVeg ? 'green' : 'red' }}
                          aria-hidden="true"></i>
                        <p className='text-muted ml-3 mb-0'>
                          <small>
                            Chicken Wrap
                            </small>
                        </p>
                      </div>
                      <div className='col-lg-4 text-right'>
                        <IconButton aria-label="delete" size="small">
                          <i className="fa fa-minus text-dark" aria-hidden="true"></i>
                        </IconButton>
                        <span className='px-2'>
                          2
                        </span>
                        <IconButton aria-label="delete" size="small">
                          <i className="fa fa-plus text-dark" aria-hidden="true"></i>
                        </IconButton>
                      </div>
                      <div className='col-lg-3 p-0 text-right'>
                        <p className='text-muted mb-0'>
                          <small>
                            <i className="fa fa-inr mr-1" aria-hidden="true"></i>
                            645.00
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              )
            }
          </ul>
        </CardContent>
        <div className='d-flex px-4 justify-content-between'>
          <Typography variant="subtitle2" gutterBottom>
            Total Amount
            </Typography>
          <Typography variant="subtitle2" gutterBottom>
            <i className="fa fa-inr mr-1" aria-hidden="true"></i>648
            </Typography>
        </div>
        <CardActions className='p-0'>
          <Button className='m-3 w-100' variant="contained" color="primary">
            Checkout
        </Button>
        </CardActions>
      </Card>
    );
  }

  return (
    <>
      <HotalDetailRenderer />
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6'>
            <List>
              <Typography style={{ fontSize: '12px' }} variant="button" display="block" gutterBottom>
                CHINESE
            </Typography>
              <Divider />
              {generate(
                <ListItem>
                  <FiberManualRecordIcon
                    style={{ color: isVeg ? 'green' : 'red' }}
                    className='mr-3' />
                  <ListItemText
                    primary="Chicken wrap"
                  />
                  <ListItemText
                    primary={<><i className="fa fa-inr mr-1" aria-hidden="true"></i><span>{'245'}</span></>}
                    className='ml-5 text-center'>

                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <AddIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
            <List>
              <Typography style={{ fontSize: '12px' }} variant="button" display="block" gutterBottom>
                CHINESE
            </Typography>
              <Divider />
              {
                generate(
                  <ListItem>
                    <FiberManualRecordIcon
                      style={{ color: isVeg ? 'green' : 'red' }}
                      className='mr-3' />
                    <ListItemText
                      primary="Chicken wrap"
                    />
                    <ListItemText
                      primary={<><i className="fa fa-inr mr-1" aria-hidden="true"></i><span>{'245'}</span></>}
                      className='ml-5 text-center'>

                    </ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <AddIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              }
            </List>
          </div>
          <div className='col-lg-5 offset-lg-1'>
            <CheckoutCardRenderer />
          </div>
        </div>
      </div>

    </>
  );
};

export default Details;
