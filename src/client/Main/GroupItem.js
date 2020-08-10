import React, { Component } from "react";
import { ListGroup, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class GroupItem extends Component {
  render() {
    return (
      <ListGroup.Item style={{ padding: 0 }}>
        <Row>
          <Col xs={6} md={3} lg={1}>
            <Image
              style={{ height: "auto", width: "125%" }}
              src="../../../public/monan.png"
            ></Image>
          </Col>
          <Col xs={6} md={9} lg={11} style={{ paddingLeft: 0 }}>
            <div
              style={{
                height: "50%",
                backgroundColor: "#FFE500",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "#080024", paddingLeft: "0.5rem" }}
                to={`/group/${this.props.groupId}`}
              >
                {this.props.name}
              </Link>
            </div>
            <div style={{ height: "50%", backgroundColor: "#48BDFF", paddingLeft: "0.5rem" }}>
              {this.props.description}
            </div>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }
}
