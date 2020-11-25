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
    this.state = {
      // accum: 0,

      x: 0,
      y: 0,
      // nextImageWidth: 0,
      mainImageWidth: 0,
      // expandedViewOffset: 0,

      thumbnails: '',
      mainImage: 0,
      startIndex: 0,
      endIndex: 3,


      // expandedView: false,
      // expandedViewZoom: false,
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
    // this.toggleExpandedView = this.toggleExpandedView.bind(this);
    // this.toggleExpandedViewZoom = this.toggleExpandedViewZoom.bind(this);
    
    this.slideThumbnailsDown = this.slideThumbnailsDown.bind(this);
    this.slideThumbnailsUp = this.slideThumbnailsUp.bind(this);
    this.updateMainImage = this.updateMainImage.bind(this);
    this.slideRight = this.slideRight.bind(this);
    this.slideLeft = this.slideLeft.bind(this);

    this.onMouseMove = this.onMouseMove.bind(this);

    // this.incrementExpandedViewOffset = this.incrementExpandedViewOffset.bind(this);
    // this.decrementExpandedViewOffset = this.decrementExpandedViewOffset.bind(this);
  }

  // incrementExpandedViewOffset() {

  //   //get width for the next image... this is how much you'll want to scroll
  //   if (this.state.mainImage < this.props.currentStyle.photos.length) {


  // }
  // if (this.state.mainImageWidth <= this.state.nextImageWidth) {
  //   this.setState({
  //     expandedViewOffset: this.state.expandedViewOffset+=
  //     Math.min(this.state.mainImageWidth, (window.innerWidth - 60)*.7) 
  //     + this.state.accum,
  //     accum: 0
  //   })
  //  } 
  // else if (this.state.mainImageWidth > this.state.nextImageWidth) {
  //   this.setState({
  //     expandedViewOffset: this.state.expandedViewOffset+=
  //     Math.min(this.state.mainImageWidth, (window.innerWidth - 60)*.7)
  //      - 300,
  //     accum: this.state.accum + 300
  //   })
  // }
  // }

    

  // decrementExpandedViewOffset() {
  //   this.setState({
  //     expandedViewOffset: this.state.expandedViewOffset-=
  //     Math.min(this.state.mainImageWidth, (window.innerWidth - 60)*.7)
  //   })
  // }

  onMouseMove(e) {
    this.setState({ x: e.nativeEvent.offsetX,
                    y: e.nativeEvent.offsetY });
  }

  slideRight() {
  
    var mainIndex = this.state.mainImage + 1;

    if (mainIndex > this.state.endIndex) {
      var newStartIndex = this.state.startIndex > mainIndex - this.state.endIndex 
      ? this.state.startIndex : mainIndex - this.state.endIndex;
      
      this.setState({
        startIndex: newStartIndex
      })
    }

    this.setState({
      mainImage: mainIndex
    })
  }

  slideLeft() {
    var mainIndex = this.state.mainImage - 1;

    if (mainIndex < this.state.endIndex-1 && this.state.startIndex !== 0) {
      var newStartIndex = this.state.startIndex - 1
      this.setState({
        startIndex: newStartIndex
      })
    }

    this.setState({
      mainImage: mainIndex
    })
  }


  updateMainImage(index) {
    this.setState({
      mainImage: index
    })
  }

  slideThumbnailsDown() {
  
    //changing this.state.endIndex-1 to this.state.thumbnails.length-this.state.endIndex
    //so the shifting will stop when you've gotten to endIndex # of elements before the end of thumbnail arr
    if (this.state.startIndex >= this.state.thumbnails.length-this.state.endIndex-1) {
      return;
    }

    //var newEnd = this.state.endIndex+=1
    var newStart = this.state.startIndex + 1

    this.setState({
      // endIndex: newEnd,
      startIndex: newStart
    })
  }

  slideThumbnailsUp() {
  
    if (this.state.startIndex <= 0) {
      return;
    }

    var newStart = this.state.startIndex - 1
    this.setState({
      startIndex: newStart
    })

  }


  componentDidMount() {
   
      this.setState({
        mainImageWidth: this.getImageWidth(0)
      })

  }
  
  
  getImageWidth(index) {

    if (this.props.currentStyle!== undefined) {

        var x = this.props.currentStyle.photos[index].url.indexOf('&w=')
        var y = this.props.currentStyle.photos[index].url.indexOf('&q')
        var width = this.props.currentStyle.photos[index].url.slice(x+3,y);
       
        return Number(width);
    }

  }

  componentDidUpdate(prevProps, prevState) {
   
    if (this.state.thumbnails === '' && this.props.currentStyle!=='') {

       this.setState({
       thumbnails: this.props.currentStyle.photos
      })
    }

    if (this.state.mainImage !== prevState.mainImage) {
     
      var x = this.props.currentStyle.photos[this.state.mainImage].url.indexOf('&w=')
      var y = this.props.currentStyle.photos[this.state.mainImage].url.indexOf('&q')
      var width = this.props.currentStyle.photos[this.state.mainImage].url.slice(x+3,y);
     
      // var nextX = this.props.currentStyle.photos[this.state.mainImage+1].url.indexOf('&w=')
      // var nextY = this.props.currentStyle.photos[this.state.mainImage+1].url.indexOf('&q')
      // var nextWidth = this.props.currentStyle.photos[this.state.mainImage+1].url.slice(nextX+3,nextY);
      
      this.setState({
        mainImageWidth: Number(width)
        // nextImageWidth: Number(nextWidth)
      })
      
    }

  }

  render() {
    // return (<div>hi</div>)

    if (!this.props.expandedView) {
      return (
        <div className = "overview-container">
          <div className="item grid-item1"> <Gallery currentStyle = {this.props.currentStyle} setCurrentStyle = {this.props.setCurrentStyle} toggleExpandedView = {this.props.toggleExpandedView}
                                                     updateMainImage = {this.updateMainImage} slideRight = {this.slideRight} slideLeft = {this.slideLeft}
                                                     slideThumbnailsDown = {this.slideThumbnailsDown} slideThumbnailsUp = {this.slideThumbnailsUp}
                                                     mainImage = {this.state.mainImage} thumbnails = {this.state.thumbnails}
                                                     startIndex = {this.state.startIndex} endIndex = {this.state.endIndex}
                                                    /></div>
          <div className="item grid-item2"> <ProductInfo category = {this.props.product.category} name = {this.props.product.name} default_price = {this.props.product.default_price} original_price = {this.props.currentStyle.original_price} sale_price = {this.props.currentStyle.sale_price} average_rating = {this.props.product.average}/> </div>
          <div className="item grid-item3">  <StyleSelector styles = {this.props.product.styles} setCurrentStyle = {this.props.setCurrentStyle}/> </div>
          <div className="item grid-item4">  <Cart currentStyle = {this.props.currentStyle} toggleOutfit = {this.props.toggleOutfit} product = {this.props.product}/> </div>
          <div className="item grid-item5">  <ProductDescription slogan = {this.props.product.slogan} description = {this.props.product.description}/> </div>
          <div className="item grid-item6">  <Features features = {this.props.product.features}/> </div>
        </div>
      );
    } 
    else if (this.props.expandedView && !this.props.expandedViewZoom){
       return (
        <div>
          <div className = "expandedView" 
          style = {{width: Math.min(this.state.mainImageWidth, (window.innerWidth - 60)*.7)}}
          >

          <span className = 'arrowIconWrapperLeftExpandedView'>
                <i className={ this.state.mainImage === 0 ? "arrow left hidden" : "arrow left active"} onClick = {this.slideLeft}></i> 
          </span>
            {/* <div className = "expandedContainer" style = {{
                    transform: `translateX(-${this.state.expandedViewOffset}px)`
                  }}> */}
              {/* {this.props.currentStyle.photos.map((x, index) => { return( */}
                
                <img src = {this.props.currentStyle.photos[this.state.mainImage].url} id = 'expandedImage'
                onClick = {this.props.toggleExpandedViewZoom}/>
              
              {/* )})} */}

            {/* </div> */}
            <span className = 'arrowIconWrapperRightExpandedView'>
                <i className={ this.state.mainImage === this.state.thumbnails.length-1 ? "arrow right hidden" : "arrow right active"} onClick = {this.slideRight}></i> 
          </span>
          </div>
        </div>
      )
    } else if (this.props.expandedViewZoom) {
      return (
        <div>
          <div className = "expandedViewZoom" style = {{width: Math.min(this.state.mainImageWidth, (window.innerWidth - 60)*.7)}}>
            
            <img src = {this.props.currentStyle.photos[this.state.mainImage].url}
            onMouseMove = {this.onMouseMove}
            onClick = {()=> {this.props.toggleExpandedView(); this.props.toggleExpandedViewZoom()}}
            id = 'expandedImageZoom'
            style = {{objectPosition: `-${(this.state.x)/1.575}px -${(this.state.y)/1.2}px`}}
            />  
            
            <h1>Mouse Coordinates: {this.state.x} {this.state.y} </h1>        
          </div>
        </div>
      )
    }
 
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
          <div className = 'social-media-icon-wrapper'> 
            
            <a href="https://twitter.com/intent/tweet?text=Hello%20world">
              <img src = '../../../dist/images/twitter.png' className = 'social-media-icon'/>
            </a>
          </div>
          <div className = 'social-media-icon-wrapper'> 
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