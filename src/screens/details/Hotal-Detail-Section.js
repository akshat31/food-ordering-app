import React from "react";

// MAterial UI
import StarIcon from "@material-ui/icons/Star";

// CSS
import "./Details.css";

const HotalDetailSection = ({
  categories,
  restaurant_name,
  photo_URL,
  number_customers_rated,
  customer_rating,
  average_price,
  address: { locality },
  getCategory
}) => {
  return (
    <div className="detail-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 d-xs-flex justify-content-center">
            <img className="hotal-img" src={photo_URL} alt="hotal" />
          </div>
          <div className="col-lg-9">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-5">
                  <div className="name-container mt-3">
                    <h2 className="res-name">{restaurant_name}</h2>
                    <h6 className="mb-3 locality-name">{locality}</h6>
                    <p className="xs-text-center">
                      <small>{getCategory(categories)}</small>
                    </p>
                  </div>
                </div>
                <div className="col-lg-4" />
              </div>
              <div className="row mt-3">
                <div className="col-lg-5 col-6 xs-flex-center">
                  <p className="mb-0">
                    <StarIcon style={{ fontSize: "18px" }} />
                    {" " + customer_rating}
                  </p>
                  <p className="text-muted xs-width-90 w-25 rating-desc">
                    <small>
                      Average rate by {number_customers_rated} customers
                    </small>
                  </p>
                </div>
                <div className="col-lg-4 col-6 xs-flex-center">
                  <p className="mb-0">
                    <i className="fa fa-inr mr-1" aria-hidden="true" />
                    {average_price}
                  </p>
                  <p className="mb-0 text-muted xs-width-90 w-50 rating-desc">
                    <small>Average Cost for two people</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotalDetailSection;
