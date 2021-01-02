import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

// Material UI
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import HotalDetailSection from "./Hotal-Detail-Section";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";

import { capitalizeFirstLetter } from "../../common/utils";
import { getRestaurantById } from "../../common/api";
import { makePreciseValue } from "../../common/utils";

// CSS
import "./Details.css";

const Details = () => {
  const { id } = useParams();
  const history = useHistory();
  const [restaurant, setRestaurant] = useState({});
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [cartItem, setCartItem] = useState({
    restaurant: restaurant.restaurant_name || '',
    itemList: [],
    totalPrice: 0,
    totalItemCount: 0,
  });

  useEffect(
    () => {
      getRestaurantById(id).then((res) => {
        setRestaurant(res);
      });
    },
    [id]
  );

  const getCategory = (resCategory) => {
    const categoryName = resCategory.map((res) => res.category_name);
    return categoryName.join(", ");
  };

  //SnackBar handler both open and close function
  const snackBarHandler = (message) => {
    setSnackBarMessage(message);
    setSnackBarOpen(true);
  };

  const addToCart = (item, category) => {
    const myCartItem = cartItem || {
      restaurant: restaurant.restaurant_name || '',
      itemList: [],
      totalPrice: 0,
      totalItemCount: 0,
    };
    let findIndex = null;
    myCartItem.restaurant = restaurant.restaurant_name || '';
    //If the item is new, not already added into the list, then insert newly
    let findItem = myCartItem.itemList.find((cartItemCurrent, index) => {
      if (cartItemCurrent.item.id === item.id) {
        findIndex = index;
        return cartItemCurrent;
      }
      return undefined;
    });
    // If item already exists, only increment item quantiyt and price
    if (findItem) {
      findItem.quantity = findItem.quantity + 1;
      findItem.totalItemPrice = findItem.totalItemPrice + item.price;
      myCartItem.itemList[findIndex] = findItem;
      findIndex = null;
      myCartItem.totalPrice = myCartItem.totalPrice + item.price;
      myCartItem.totalItemCount = myCartItem.totalItemCount + 1;
    } else {
      // If not already added then creating temp object and doing other calculations
      const currentCartItem = {
        quantity: 1,
        categoryName: category.category_name,
        categoryId: category.id,
        item: item,
        totalItemPrice: item.price,
      };
      myCartItem.totalPrice = myCartItem.totalPrice + item.price;
      myCartItem.totalItemCount = myCartItem.totalItemCount + 1;
      // Push items to cart
      myCartItem.itemList.push(currentCartItem);
    }
    snackBarHandler("Item added to cart!");
    setCartItem({ ...myCartItem });
  };

  // Removing item from cart
  const removeAnItemFromCart = (index) => {
    const myCartItem = cartItem;
    // Match item based on index
    let findItem = myCartItem.itemList[index];
    // Update matched item based on index
    findItem.quantity = findItem.quantity - 1;
    findItem.totalItemPrice = findItem.totalItemPrice - findItem.item.price;
    myCartItem.totalPrice = myCartItem.totalPrice - findItem.item.price;
    myCartItem.totalItemCount = myCartItem.totalItemCount - 1;

    // Remove that item from cart - if the  quantity goes to or less than 0
    if (findItem.quantity <= 0) {
      myCartItem.itemList.splice(index, 1);
      snackBarHandler("Item removed from cart!");
    } else {
      myCartItem.itemList[index] = findItem;
      snackBarHandler("Item quantity decreased by 1!");
    }
    setCartItem({ ...myCartItem });
  };

  //Adding item from My Cart
  const addAnItemFromCart = (index) => {
    snackBarHandler("Item quantity increased by 1!");
    const myCartItem = cartItem;
    let findItem = myCartItem.itemList[index];
    if (findItem) {
      findItem.quantity = findItem.quantity + 1;
      findItem.totalItemPrice = findItem.totalItemPrice + findItem.item.price;
      myCartItem.totalPrice = myCartItem.totalPrice + findItem.item.price;
      myCartItem.totalItemCount = myCartItem.totalItemCount + 1;
    }
    myCartItem.itemList[index] = findItem;
    setCartItem({ ...myCartItem });
  };

  const { itemList = [], totalItemCount, totalPrice } = cartItem;

  return (
    <>
      {Object.keys(restaurant).length > 2 ? (
        <>
          <HotalDetailSection {...restaurant} getCategory={getCategory} />
          <div className="container mt-4">
            <div className="row">
              <div className="col-lg-6">
                {(restaurant.categories || []).map((res, count) => {
                  return (
                    <List key={count}>
                      <Typography
                        style={{ fontSize: "12px" }}
                        variant="button"
                        display="block"
                        gutterBottom
                      >
                        {res.category_name}
                      </Typography>
                      <Divider />
                      {res.item_list.map((item, index) => {
                        return (
                          <ListItem key={index} className="px-0 py-0">
                            <div className="container-fluid">
                              <div className="row align-items-center">
                                <div className="col-lg-1 col-1">
                                  <FiberManualRecordIcon
                                    style={{
                                      color:
                                        item.item_type === "VEG"
                                          ? "green"
                                          : "red",
                                    }}
                                  />
                                </div>
                                <div className="col-lg-5 col-4">
                                  <ListItemText
                                    primary={capitalizeFirstLetter(
                                      item.item_name
                                    )}
                                  />
                                </div>
                                <div className="col-lg-4 col-4">
                                  <ListItemText
                                    primary={
                                      <>
                                        <i
                                          className="fa fa-inr mr-1"
                                          aria-hidden="true"
                                        />
                                        <span>
                                          {makePreciseValue(item.price)}
                                        </span>
                                      </>
                                    }
                                    className="ml-md-5 ml-lg-5 ml-xl-5 text-center"
                                  />
                                </div>
                                <div className="col-lg-2 col-2">
                                  <IconButton
                                    onClick={() => addToCart(item, res)}
                                    edge="end"
                                    aria-label="Add to Cart"
                                  >
                                    <AddIcon />
                                  </IconButton>
                                </div>
                              </div>
                            </div>
                          </ListItem>
                        );
                      })}
                    </List>
                  );
                })}
              </div>
              <div className="col-lg-5 offset-lg-1">
                <Card className="mt-4">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <Badge
                        className="mr-3"
                        badgeContent={totalItemCount}
                        color="primary"
                        showZero
                      >
                        <ShoppingCartIcon />
                      </Badge>
                      My Cart
                    </Typography>
                    <ul className="cart-list p-0 mb-0">
                      {itemList.length > 0
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
                                      <IconButton
                                        aria-label="Remove Item"
                                        onClick={() =>
                                          removeAnItemFromCart(index)
                                        }
                                        size="small"
                                      >
                                        <i
                                          className="fa fa-minus text-dark"
                                          aria-hidden="true"
                                        />
                                      </IconButton>
                                      <span className="px-2">
                                        {item.quantity}
                                      </span>
                                      <IconButton
                                        aria-label="Add Item"
                                        onClick={() => addAnItemFromCart(index)}
                                        size="small"
                                      >
                                        <i
                                          className="fa fa-plus text-dark"
                                          aria-hidden="true"
                                        />
                                      </IconButton>
                                    </div>
                                    <div className="col-lg-3 col-3 p-0 text-right">
                                      <p className="text-muted mb-0">
                                        <small>
                                          <i
                                            className="fa fa-inr mr-1"
                                            aria-hidden="true"
                                          />
                                          {makePreciseValue(
                                            item.totalItemPrice
                                          )}
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
                  </CardContent>
                  <div className="d-flex px-4 justify-content-between">
                    <Typography variant="subtitle2" gutterBottom>
                      Total Amount
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      <i className="fa fa-inr mr-1" aria-hidden="true" />
                      {makePreciseValue(totalPrice)}
                    </Typography>
                  </div>
                  <CardActions className="p-0">
                    <Button
                      onClick={() => { history.push({
                        pathname: '/checkout',
                        state: { ...cartItem }
                      }) }}
                      className="m-3 w-100"
                      variant="contained"
                      color="primary"
                    >
                      Checkout
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </div>
          </div>
          <Snackbar
            key={"snack"}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            autoHideDuration={3000}
            open={snackBarOpen}
            onClose={() => setSnackBarOpen(false)}
            message={<span id="message-id">{snackBarMessage}</span>}
            action={
              <IconButton color="inherit">
                <CloseIcon />
              </IconButton>
            }
          />
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <CircularProgress color="secondary" />
        </div>
      )}
    </>
  );
};

export default Details;
