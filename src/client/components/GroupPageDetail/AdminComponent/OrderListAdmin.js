import React, { Component } from "react";
import { ListGroup, Button, Dropdown } from "react-bootstrap";
import DishItemAdmin from "./DishItemAdmin";

export default class OrderListAdmin extends Component {
  render() {
    return (
      <>
        <div
          style={{
            fontSize: "3rem",
            textAlign: "end",
            color: "white",
            position: "absolute",
            left: "46%",
            top: "94%",
          }}
          className="row w-100 m-0"
        >
          Orders
        </div>
        <div className="text-center-order">
          <div className="row w-100 m-0">
            <div className=" order-label col-2 mt-4">
              <b>Date</b>
            </div>
            <div className="order-label col-2 mt-4 ml-2">
              <b>User</b>
            </div>
            <div style={{ textAlign: "end" }} className="order-label col mt-4">
              <b>Members' List</b>
            </div>
          </div>
          <div className="group-container mt-4">
            <ListGroup style={{flexDirection:"row", borderRadius:"0"}}>
              <ListGroup.Item className="w-50">
                <div className="row w-100 m-0">
                  <div className=" order-label col">13/8/2020</div>
                  <div className="order-label col">Huy Hoang</div>
                  <div className="order-label col">
                    <Dropdown>
                      <Dropdown.Toggle variant="info" id="dropdown-basic">
                        Order details
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>A dish</Dropdown.Item>
                        <Dropdown.Item>Another dish</Dropdown.Item>
                        <Dropdown.Item>Something else</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="w-50"></ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </>
    );
  }
}