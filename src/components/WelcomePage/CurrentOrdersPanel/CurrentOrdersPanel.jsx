import React from "react";
import { connect } from "react-redux";
import "./CurrentOrdersPanel.css";
import TrackingWidget from "../../TrackingWidget/TrackingWidget";

class CurrentOrdersPanel extends React.Component {
  render() {
   
 
    return (
      <>
        <div className="ordersPanel__mainFrame">
          <div className="ordersPanel__innerFrame">
            <div>
              <h2 className="orderPanelText"
              
              >
                Your Current Orders
              </h2>
            </div>
            <TrackingWidget />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state,
  };
};

export default connect(
  mapStateToProps,
  null
)(CurrentOrdersPanel);
