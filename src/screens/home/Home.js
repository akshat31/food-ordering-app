import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getAllRestaurants } from "../../common/api";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import StarIcon from '@material-ui/icons/Star';
import Typography from "@material-ui/core/Typography";
import "./Home.css";
const useStyles = makeStyles({
  root: {
    width: 280,
    margin:10
  }
});

const Home = () => {
  const classes = useStyles();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getAllRestaurants().then(response => {
      setRestaurants(response.restaurants || []);
    });
  }, []);
  return (
    <div className="home-container">
      <div className="restaurant-list">
        {restaurants.map(restaurant => {
          return (
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={restaurant.photo_URL}
                  title={restaurant.restaurant_name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {restaurant.restaurant_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {restaurant.categories}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <div className="rating-price">
                  <div className="rating-btn">
                    <StarIcon style={{ color: "#FFF" }}/> {`${restaurant.customer_rating}(${restaurant.number_customers_rated})`}
                  </div>
                  <div>₹{restaurant.average_price} for two</div>
                </div>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
