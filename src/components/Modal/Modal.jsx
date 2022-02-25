import React from "react";
import PropTypes from "prop-types";
import cancel from "../../img/cancel.svg";
// import "./Modal.css";

class Modal extends React.Component {
  render() {
    if (!this.props.isOpen) {
      return null;
    }
    //alert(this.props.children);
    //console.log(this.props.children);

    const BackgroundStyle = {
      backgroundColor: "rgba(220,220,220,0.5)",
      position: "fixed",
      
      //backgroundColor:
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zindex: 4,
 
    };
    const ModalStyle = {
      backgroundColor:"#FFFF",
      position: "fixed",
      top: 100,
      maxWidth: 600,
      maxHeight: 600,
      //backgroundColor: "#ffff",
      margin: "auto",
      padding: 5,
      right: 0,
      bottom: 0,
      left: 50,
      zindex: 101,
     
    };
    const HeaderStyle = {
      height: 20,
      width: "100%"
    };
    const CloseBtnStyle = {
      float: "right",
      cursor: "pointer",
      display: "block",
      width: "25px",
      height: "25px",
    };

    

    return (
      <div  style={BackgroundStyle}>
      <div style={ModalStyle}>
        <div style={HeaderStyle}>
          <span style={CloseBtnStyle} onClick={this.props.onClose}>
           {/* <img src={cancel}></img> */}
          </span>
        </div>
        {this.props.children}
      </div>
    </div>
    );
  }
}

Modal.propTypes = {
  // onClose: PropTypes.function,
   isOpen: PropTypes.bool,
   children: PropTypes.node,
   
   
};

export default Modal;