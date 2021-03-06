import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };
  // componentDidMount() {
  //   this.props.alert.show("It Works");
  // }
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error != prevProps.error) {
      // if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      // if (error.msg.email) alert.error(`Email: ${error.msg.name.join()}`);
      // alert.error(error.msg.name);

      if (error.msg.name) alert.error(`Name: ${error.msg.name}`);
      if (error.msg.email) alert.error(`Email: ${error.msg.email}`);

      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
    }
    if (message != prevProps.message) {
      if (message.leadDeleted) alert.success(message.leadDeleted);
      if (message.leadAdded) alert.success(message.leadAdded);
    }
  }
  render() {
    return <Fragment />;
  }
}
const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});
export default connect(mapStateToProps)(withAlert()(Alerts));
// export default Alerts;
