import React from "react";
import basket from "../../img/basket.svg";
import "./Cabinet.css";
import Modal from "react-modal";
import { ConsumerBasket } from "../ContextBasket/ContextBasket";
// import { Basket } from '../Basket/Basket';
import { SearchPanel } from "../SearchPanel/SearchPanel";

const customStyles = {
  content: {
    top: "0",
    right: "0",
    width: "30%",
    height: "100vh",
    left: "auto",
    bottom: "auto",
    padding: "10px",
    paddingTop: "0",
  },
};

export class Cabinet extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalAmount: 0,
      modalIsOpen: false,
      searchValue: "",
      repos: [],
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    //this.onKeyUp = this.onKeyUp.bind(this);
    // this.repos = this.repos.bind(this)
  }

  // getItemsAsync(searchValue, cb) {
  //   let url = `https://api.github.com/search/repositories?q=${searchValue}&language=javascript`
  //   fetch(url).then((response) => {
  //     return response.json();
  //   }).then((results) => {
  //     if (results.items != undefined) {
  //       let items = results.items.map((res, i) => { return { id: i, value: res.full_name } })
  //       this.setState({ repos: items })
  //       cb(searchValue)
  //     }
  //   });
  // }

  addSearchInput = (value) => {
    //alert(23);
    this.setState({ searchValue: value });
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  componentDidMount() {
    Modal.setAppElement("body");
  }

  afterOpenModal() {
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div className="cabinet">
        <SearchPanel
          onInputChange={this.addSearchInput}
          items={this.state.repos}
          multiple={true}
          // getItemsAsync={this.getItemsAsync.bind(this)}
        />

        <ConsumerBasket>
          {(context) => {
            return (
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="example"
              >
                {/* <Basket closeModal={this.closeModal}
                  context={context}
                /> */}
              </Modal>
            );
          }}
        </ConsumerBasket>
      </div>
    );
  }
}
