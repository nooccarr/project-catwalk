import React from 'react';
import axios from 'axios';

import Gallery from './Gallery'
import StyleSelector from './StyleSelector'
import Cart from './Cart'
import Stars from '../Stars.jsx';


class Overview extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      // category: '',
      // name: '',
      // default_price: '',

      original_price: '',
      sale_price: '',


      
      styles: [],
      currentStyle: '',

      // expandedView: false
    }
    // this.setCurrentStyle = this.setCurrentStyle.bind(this);
  }

  // toggleExpandedView() {
  //   this.setState((prevState) => ({
  //     expandedView: !prevState.expandedView
  //   }))
  // }






  componentDidMount() {
    // this.getProduct(1);
    // this.getStyle(1);

  }

  // componentDidUpdate() {
  //   console.log('overview props product in componentdidupdate', this.props.product)
  //   console.log('overview props product in componentdidupdate', this.props.product.name)

  //   if (this.props.product.name !== undefined) {
  //     console.log('in componentDidUpdate setState condition')
  //     console.log(this.props.product);
    
  //   //   this.setState({
  //   //     name: this.props.product.name

  //   //   //category: this.props.product,
  //   //   // name: this.props.name,
  //   //   // default_price: this.props.default_price
  //   // }, () => {
  //   //   console.log('this.state.name', this.state.name)
      
  //   // })
  // }



  // }

  // setCurrentStyle(newStyle, originalPrice, salePrice) {
  //   this.setState({
  //     currentStyle: newStyle,
  //     original_price: originalPrice,
  //     sale_price: salePrice
  //   })
  // }

  // getProduct(id) {
  //   id = undefined || 1;

  //  // axios.get(`${URL}?page=1&count=1`)
  //   axios.get('http://3.21.164.220/products?page=1&count=1')
  //   .then((response) => {
  //     // console.log('hi', response.data[0])
  //     this.setState({
  //       category: response.data[0].category,
  //       name: response.data[0].name,
  //       default_price: response.data[0].default_price
  //     })
    
  //   })
  //   .catch((err) => console.log(err));

  // }

  // getStyle(id) {
  //   id = undefined || 1;

  //  // axios.get(`${URL}?page=1&count=1`)
  //   axios.get(`http://3.21.164.220/products/${id}/styles`)
  //   .then((response) => {
  //     console.log(response.data.results)
  //     console.log('currentStyle', response.data.results[0])

  //     this.setState({
  //       styles: response.data.results,
  //       currentStyle: response.data.results[0]
  //       //console.log()
  //     })
    
  //   })
  //   .catch((err) => console.log(err));

  // }

  render() {

    //  if (this.state.expandedView) {
      return (
        <div className = "overview-container">
          <div className="item grid-item1"> <Gallery currentStyle = {this.props.currentStyle} setCurrentStyle = {this.props.setCurrentStyle}/></div>
          <div className="item grid-item2"> <ProductInfo category = {this.props.product.category} name = {this.props.product.name} default_price = {this.props.product.default_price} original_price = {this.props.currentStyle.original_price} sale_price = {this.props.currentStyle.sale_price} average_rating = {this.props.product.average}/> </div>
          <div className="item grid-item3">  <StyleSelector styles = {this.props.product.styles} setCurrentStyle = {this.props.setCurrentStyle}/> </div>
          <div className="item grid-item4">  <Cart currentStyle = {this.props.currentStyle} toggleOutfit = {this.props.toggleOutfit} product = {this.props.product}/> </div>
          <div className="item grid-item5">  <ProductDescription slogan = {this.props.product.slogan} description = {this.props.product.description}/> </div>
          <div className="item grid-item6">  <Features features = {this.props.product.features}/> </div>
        </div>
      );
    // } 
    //else {
    //   return (
    //     <div className = "expandedView"></div>
    //   )
    // }
  }


}

let Features = ({features}) => {

  if (features === '') {
    return (
      <div> 
       null so far 
      </div>
    )
  } else {

    return (
      <div className = 'productFeaturesValuesOuterWrapper'>
        {features.map((x) => {
          console.log('features being mapped', x.feature);
          console.log('values being mapped', x.value);

          return (
          <div className = 'productFeaturesValuesInnerWrapper'>
            <span className = 'productFeatures'>{x.feature}{'   '}</span>
            <span className = 'productValues'>{x.value}</span>
          </div>
          )
        })}
      </div>
    )
  }

}




let ProductDescription = ({slogan, description}) => {


  if (slogan === '') {
    return (
      <div> 
       null so far 
      </div>
    )
  } else {

    return (
      <div>
        <div id = 'slogan'> {slogan} </div>
        <div id = 'description'> {description} </div>
      </div>
    )
  }

}



let ProductInfo = ({category, name, default_price, original_price, sale_price, average_rating}) => {


  if (original_price === '') {
    return (
      <div> 
        {/* {Stars(140, product.average || product.rating)} */}
        <div id = 'category'> {category} </div>
        <div id = 'expandedProductName'> {name} </div>
        <div id = 'price'> ${default_price}  </div>
      </div>
    )
  } else {
    console.log('product average', average_rating)

    return (
      <div>
        <div className = 'star-reviews-wrapper'> 
        {Stars(50, average_rating)}
        </div> 
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