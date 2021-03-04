import React from 'react';
import onClickOutside from 'react-onclickoutside'

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skus: '',
      skuKeys: '',
      sku_id: '',
      sizes: '',
      quantities: '',
      slectedSize: '',
      availableQuantity: 0,
      selectedQuantity: '',
      cartMessage: 'add to bag'
    };
    this.setSizeQuantities = this.setSizeQuantities.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.setCartMessage = this.setCartMessage.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.skus === '' && this.props.currentStyle!=='') {
      var skuArr = Object.values(this.props.currentStyle.skus);
      var skuKeys = Object.keys(this.props.currentStyle.skus);
      var sizesArr = skuArr.map((x) => x.size);
      var quantitiesArr = skuArr.map((x) => x.quantity);
        this.setState({
        skuKeys: skuKeys,
        skus: this.props.currentStyle.skus,
        sizes: sizesArr,
        quantities: quantitiesArr
      });
    }
  }

  setQuantity(val) {
    this.setState({
      selectedQuantity: val
    });
    this.setCartMessage('add to bag');
  }

  setSizeQuantities(index) {
    this.setState({
      selectedSize: this.state.sizes[index],
      availableQuantity: this.state.quantities[index],
      sku_id: this.state.skuKeys[index]
    });
    this.setCartMessage('add to bag');
  }

  setCartMessage(message) {
    this.setState({
      cartMessage: message
    });
  }

  render () {
    return (
      <div onClick = {(e) => this.props.trackAction(e, this.props.moduleName)}>
        <EnhancedComponent title="SELECT SIZE" list={this.state.sizes} setSizeQuantities = {this.setSizeQuantities} sizes = {true}/>
        <EnhancedComponent title="0" list={  [...Array(this.state.availableQuantity).keys()].map((x) => (x+1)) } quantities = {true} setQuantity = {this.setQuantity}/>
        <AddtoCart size = {this.state.selectedSize} quantity = {this.state.selectedQuantity} setCartMessage={this.setCartMessage} cartMessage={this.state.cartMessage}/>
        <Star toggleOutfit = {this.props.toggleOutfit} product = {this.props.product}/>
      </div>
    );
  }
};

class Star extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {}

  handleClick() {
    this.props.toggleOutfit(this.props.product.id);
  }

  render() {
    if (this.props.product.faved === false) {
      return (
        <div className = 'dd-wrapper-star'>
          <div className = 'dd-header-star'>
            <div className = 'contain-star' onClick = {this.handleClick} >
              <img src = './images/empty-star-grey.png' style = {{maxWidth: '100%'}}/>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className = 'dd-wrapper-star'>
          <div className = 'dd-header-star'>
            <div className = 'contain-star' onClick = {this.handleClick} >
              <img src = './images/full-star.png' style = {{maxWidth: '100%'}}/>
            </div>
          </div>
        </div>
      );
    }
  }
};

class AddtoCart extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (this.props.size && this.props.quantity) {
      this.props.setCartMessage('added!')
    }
  }

  render() {
   return (
      <div style = {{display: 'inline'}}>
        <div className = 'add-to-cart-wrapper'>
          <div className = 'dd-header' onClick = {this.handleSubmit}>
            <span className = 'dd-header-title'>{this.props.cartMessage}</span>
              <i className = 'plus-sign'></i>
          </div>
        </div>
      </div>
    );
  }
};

class Dropdown extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
      selectedSize: '',
      selectedQuantity: ''
    };
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleClickOutside(event){
    this.setState({
      listOpen: false
    });
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  handleSelection(item, index) {
    if (this.props.sizes) {
      this.setState({
        selectedSize: item,
        headerTitle: item
      }, () => this.toggleList());
      this.props.setSizeQuantities(index);
    } else if (this.props.quantities) {
      this.setState({
        selectedQuantity: item,
        headerTitle: item
      }, () => this.toggleList());
      this.props.setQuantity(item);
    }
  }

  render(){
    const {list} = this.props
    const{ listOpen, headerTitle} = this.state
    return(
      <div className= { this.props.sizes ? "dd-wrapper" : "dd-wrapper-quantity"}>
        <div className="dd-header" onClick={(event) => {this.handleClickOutside(event); this.toggleList()}}>
          <span className="dd-header-title">{headerTitle} </span>
          <i className={listOpen ? "arrow up-cart" : "arrow down-cart"}> </i>
        </div>
        {listOpen && list ? <ul className="dd-list">
          {list.map((item, index) => (
            <li key = {index} className="dd-list-item" /*key={item.id}*/ onClick = {() => this.handleSelection(item, index)}>{item}</li>
          ))}
        </ul> : null}
      </div>
    );
  };
};

var EnhancedComponent = onClickOutside(Dropdown);

export default Cart;