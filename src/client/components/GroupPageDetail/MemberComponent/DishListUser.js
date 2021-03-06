import React, { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import DishItemUser from "./DishItemUser";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class DishListUser extends Component {
  render() {
    const { dishes, totalPrice, toggleConfirmOrderModal } = this.props;
    return (
      <div className="text-center-group">
        <div className="row w-100 m-0">
          <div className=" dish-label col mt-4">
            <b>Food Name</b>
          </div>
          <div className="dish-label col mt-4">
            <b>Quantity</b>
          </div>
          <div className="dish-label col mt-4">
            <b>Price</b>
          </div>
          <div className="dish-label col mt-4">
            <b>Sum</b>
          </div>
        </div>
        <div className="group-container mt-4">
          <ListGroup>
            {dishes.map((dish) => {
              return <DishItemUser key={dish._id} dish={dish} />;
            })}
          </ListGroup>
          {dishes.length > 0 ? (
            <>
              <ListGroup.Item
                style={{
                  width: "32.7%",
                  height: "16%",
                  backgroundColor: "#ffe500",
                  border: "none",
                }}
                className="float-right dish-label"
              >
                <pre className="dish-label tab4">Total: {totalPrice} VND</pre>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  marginTop: "5rem",
                  height: "30%",
                  backgroundColor: "#ffe500",
                  border: "none",
                }}
              >
                <Button
                  style={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    backgroundColor: "#48bdff",
                    fontSize: "1.4rem",
                    color: "#080024",
                    width: "15%",
                    borderRadius: "2rem",
                  }}
                  onClick={toggleConfirmOrderModal}
                >
                  <b>ORDER</b>
                </Button>
              </ListGroup.Item>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dishes: state.group.dishes,
    totalPrice: state.order.totalPrice,
  };
}

export default withRouter(connect(mapStateToProps, null)(DishListUser));
