import React from 'react';
import axios from 'axios';

import Gallery from './Gallery'
import StyleSelector from './StyleSelector'
import Cart from './Cart'
var URL = 'http://3.21.164.220/';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      name: '',
      default_price: '',

      original_price: '',
      sale_price: '',


      
      styles: [],
      currentStyle: ''
    }
    this.setCurrentStyle = this.setCurrentStyle.bind(this);
  }

  componentDidMount() {
    this.getProduct(1);
    this.getStyle(1);
  }

  setCurrentStyle(newStyle, originalPrice, salePrice) {
    this.setState({
      currentStyle: newStyle,
      original_price: originalPrice,
      sale_price: salePrice
    })
  }

  getProduct(id) {
    id = undefined || 1;

   // axios.get(`${URL}?page=1&count=1`)
    axios.get('http://3.21.164.220/products?page=1&count=1')
    .then((response) => {
      //console.log(response.data)
      this.setState({
        category: response.data[0].category,
        name: response.data[0].name,
        default_price: response.data[0].default_price
      })
    
    })
    .catch((err) => console.log(err));

  }

  getStyle(id) {
    id = undefined || 1;

   // axios.get(`${URL}?page=1&count=1`)
    axios.get(`http://3.21.164.220/products/${id}/styles`)
    .then((response) => {
      console.log(response.data.results)
      console.log('currentStyle', response.data.results[0])

      this.setState({
        styles: response.data.results,
        currentStyle: response.data.results[0]
        //console.log()
      })
    
    })
    .catch((err) => console.log(err));

  }

  render() {
    return (
      <div className = "overview-container">
         <div className="item grid-item1"> <Gallery currentStyle = {this.state.currentStyle} setCurrentStyle = {this.setCurrentStyle}/></div>
         <div className="item grid-item2"> <ProductInfo category = {this.state.category} name = {this.state.name} default_price = {this.state.default_price} original_price = {this.state.original_price} sale_price = {this.state.sale_price} /> </div>
        <div className="item grid-item3">  <StyleSelector styles = {this.state.styles} setCurrentStyle = {this.setCurrentStyle}/> </div>
        <div className="item grid-item4">  <Cart currentStyle = {this.state.currentStyle}/> </div>
        <div className="item grid-item5">  </div>
        <div className="item grid-item6">  </div>
      </div>
    );
  }

}

let ProductInfo = ({category, name, default_price, original_price, sale_price}) => {

  if (original_price === '') {
    return (
      <div> 
        <div id = 'category'> {category} </div>
        <div id = 'expandedProductName'> {name} </div>
        <div id = 'price'> ${default_price}  </div>
      </div>
    )
  } else {
    return (
      <div> 
        <div id = 'category'> {category} </div>
        <div id = 'expandedProductName'> {name} </div>
        {/* <div id = 'price'> ${original_price - sale_price === 0 ? original_price : <span style = {{textDecoration: line-through}}> ${original_price} </span> }  </div> */}
        <div id = 'price'> {original_price - sale_price === 0 ? original_price : <span> 
                                                                                    <span style ={{color: 'red'}}>${sale_price} </span> 
                                                                                    <span style ={{textDecoration: 'line-through'}}>${original_price} </span>  
                                                                                  </span> }  
        </div>

      </div>
    )
  }

}





export default Overview;