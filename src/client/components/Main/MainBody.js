import React, { Component, Suspense } from "react";
import { Container } from "react-bootstrap";
const MyOwnGroup = React.lazy(() => import("./MyOwnGroup"));
const MyJoinedGroup = React.lazy(() => import("./MyJoinedGroup"));
import AddNewGroupModal from "./AddNewGroupModal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../actions/user";
import { bindActionCreators } from "redux";

class MainBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddGroupModal: false,
    };
  }

  toggleAddGroupModal = () => {
    this.setState({
      ...this.state,
      showAddGroupModal: !this.state.showAddGroupModal,
    });
  };
  componentDidMount() {
    const { _id, token, setUser } = this.props;
    if (_id == "") {
      setUser(token);
    }
  }

  render() {
    const { groups, token } = this.props;
    const { showAddGroupModal } = this.state;
    return (
      <div className="main-body-background-div">
        <Container className=" main-body-group-container" fluid>
          <Suspense fallback={<div className="loader"></div>}>
            {groups ? (
              <>
                <AddNewGroupModal
                  show={showAddGroupModal}
                  handleClose={this.toggleAddGroupModal}
                  token={token}
                />
                <MyJoinedGroup
                  joinedGroups={groups.filter(
                    (group) => group.isOwner == false
                  )}
                />

                <MyOwnGroup
                  ownGroups={groups.filter((group) => group.isOwner == true)}
                  toggleAddGroupModal={this.toggleAddGroupModal}
                />
              </>
            ) : (
              <></>
            )}
          </Suspense>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    _id: state.user._id,
    groups: state.user.groups,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainBody)
);
