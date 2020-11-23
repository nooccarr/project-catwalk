import React from 'react';
import axios from 'axios';
// import FB from 'fb';
// var FB = require('fb')

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
        {/* <span id = 'productDetails'>Product Details</span> */}
        {features.map((x) => {
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

        <div id = 'social-media-wrapper'> 
          <div className = 'social-media-icon-wrapper' onClick = {()=>console.log('twitter icon clicked')}> 
            
            <a href="https://twitter.com/intent/tweet?text=Hello%20world">
              <img src = '../../../dist/images/twitter.png' className = 'social-media-icon'/>
            </a>
          </div>
          <div className = 'social-media-icon-wrapper' onClick = {()=> console.log(window.location.href)}> 
            <div data-href={window.location.href}>
              <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F127.0.0.1%3A5501%2Fdist%2Findex.html%3Fid%3D8&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">
                <img src = '../../../dist/images/fb.png' className = 'social-media-icon'/>
              </a>
            </div>          
          </div>
          <div className = 'social-media-icon-wrapper'> 
            <a href="https://www.pinterest.com/pin/create/button/" data-pin-do="buttonBookmark">
              <img src = '../../../dist/images/pinterest.png' className = 'social-media-icon'/>
            </a>
          </div>
          <div className = 'social-media-icon-wrapper'> 
            <img src = '../../../dist/images/ig.png' className = 'social-media-icon'/>
          </div>

          {/* <div className = 'social-media-icon-wrapper'> 
            <img src = '../../../dist/images/twitter-border.png' className = 'social-media-icon'/>
          </div>
          <div className = 'social-media-icon-wrapper'> 
            <img src = '../../../dist/images/fb-border.png' className = 'social-media-icon'/>
          </div>
          <div className = 'social-media-icon-wrapper'> 
            <img src = '../../../dist/images/pinterest-border.png' className = 'social-media-icon'/>
          </div>
          <div className = 'social-media-icon-wrapper'> 
            <img src = '../../../dist/images/ig-border.png' className = 'social-media-icon'/>
          </div> */}
        

        
        
        
        </div>

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