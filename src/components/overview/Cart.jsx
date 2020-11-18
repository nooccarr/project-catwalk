import React from 'react';
import onClickOutside from 'react-onclickoutside'


class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    location: [
      // {
      //     id: 0,
      //     title: 'New York',
      //     selected: false,
      //     key: 'location'
      // },
      {
        title: 'New York'
    }, {
      title: 'Los Angeles'
  }
      
    ],


    skus: '',
    sizes: '',
    quantities: '',
    slectedSize: '',
    availableQuantity: 0

  }

  this.setSizeQuantity = this.setSizeQuantity.bind(this);
  }

  setSizeQuantity(index) {
    this.setState({
      selectedSize: this.state.sizes[index],
      availableQuantity: this.state.quantities[index]
    })

  }


  componentDidUpdate(prevProps, prevState) {
   
    if (this.state.skus === '' && this.props.currentStyle!=='') {

      //console.log('in component did update condition')
      var skuArr = Object.values(this.props.currentStyle.skus);
      //console.log(skuArr);
      //console.log(this.props.currentStyle.skus)
      
      var sizesArr = skuArr.map((x) => x.size);
      var quantitiesArr = skuArr.map((x) => x.quantity);


       this.setState({
       skus: this.props.currentStyle.skus,
       sizes: sizesArr,
       quantities: quantitiesArr
     })
     


    }

  }

  render () {
  
    return (
      <div> 
        <EnhancedComponent title="SELECT SIZE" list={this.state.sizes} setSizeQuantity = {this.setSizeQuantity} sizes = {true}/> 
        <EnhancedComponent title="0" list={  [...Array(this.state.availableQuantity).keys()].map((x) => (x+1)) } quantities = {true}/> 

      </div>
    )

  }



}

class Dropdown extends React.Component {
  constructor(props){
    super(props)


    // this.wrapperRef = React.createRef();

    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
      selectedSize: '',
      selectedQuantity: ''
    }
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleClickOutside(event){
    this.setState({
      listOpen: false
    })

  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  handleSelection(item, index) { 

    if (this.props.sizes) {
    this.setState({
      selectedSize: item,
      headerTitle: item
    }, () => this.toggleList())

    this.props.setSizeQuantity(index);

  } else if (this.props.quantities) {
    this.setState({
      selectedQuantity: item,
      headerTitle: item
    }, () => this.toggleList())

  }

  }

  render(){
    const {list} = this.props
    const{ listOpen, headerTitle} = this.state
    return(
      <div className= { this.props.sizes ? "dd-wrapper" : "dd-wrapper-quantity"}>
        <div className="dd-header" onClick={(event) => {this.handleClickOutside(event); this.toggleList()}}>
          <div className="dd-header-title">{headerTitle}</div>
          {/* {listOpen
            ? <FontAwesome name="angle-up" size="2x"/>
            : <FontAwesome name="angle-down" size="2x"/>
          } */}
          </div>
         {listOpen && <ul className="dd-list">
          {list.map((item, index) => (
            <li className="dd-list-item" /*key={item.id}*/ onClick = {() => this.handleSelection(item, index)}>{item}</li>
          ))}
         </ul>}
      </div>
    )
  }



  // render () {
  
  //   return (
  //     <div className="dd-wrapper">
  //     <div className="dd-header">
  //       <div className="dd-header-title"></div>
  //     </div>
  //     <ul className="dd-list">
  //       <li className="dd-list-item"></li>
  //       <li className="dd-list-item"></li>
  //       <li className="dd-list-item"></li>
  //     </ul>
  //   </div>
  //   )

  // }



}

var EnhancedComponent = onClickOutside(Dropdown);






export default Cart;
// export default onClickOutside(Cart);
