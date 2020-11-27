import React from 'react';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleSlideRight = this.handleSlideRight.bind(this);
    this.handleSlideLeft = this.handleSlideLeft.bind(this);
    this.handleUpdateMainImage = this.handleUpdateMainImage.bind(this);
    this.handleSlideThumbnailsDown = this.handleSlideThumbnailsDown.bind(this);
    this.handleSlideThumbnailsUp = this.handleSlideThumbnailsUp.bind(this);


  }

  handleClick() {
    this.props.toggleExpandedView();
  }

  handleSlideRight() {
    this.props.slideRight();
  }

  handleSlideLeft() {
    this.props.slideLeft();
  }

  handleUpdateMainImage(index) {
    this.props.updateMainImage(index);
  }

  handleSlideThumbnailsDown() {
    this.props.slideThumbnailsDown();
  }

  handleSlideThumbnailsUp() {
    this.props.slideThumbnailsUp();
  }


  render() {
    //Is there a way to do this without conditional render? doesn't like img src

    const TN_SHIFT = 60;

     if (this.props.currentStyle === '') {
    // if (this.props.currentStyle === '') {
    return (
      <div> null</div>
    )
    } else {

      return (
        <div onClick = {(e) => this.props.trackAction(e, this.props.moduleName)}> 
          <div id = 'galleryThumbnailColumn'>
            <i className="arrow up" onClick = {this.handleSlideThumbnailsUp}></i>              
              <div className = 'thumbnailFrame'>
                <div className = 'thumbnailContainer' style = {this.props.startIndex > 0 ? {
                  transform: `translateY(-${TN_SHIFT * (this.props.startIndex) }px)`
                  } : {} }> 
                  {this.props.currentStyle.photos.map((x, index) => { 
                
                    return (
                        <div key = {index} id = 'galleryThumbnailContainer' style= {{top: `${index*TN_SHIFT}px`}} 
                        className = { index === this.props.mainImage ? 'activeThumbnail' : ''} 
                        onClick = {() => this.handleUpdateMainImage(index)}> 
                          <img src = {x.thumbnail_url} id = 'galleryThumbnail'/> 
                        </div>
                    )}
                  )}
                </div>
              </div>
            <i className="arrow down" onClick = {this.handleSlideThumbnailsDown}></i> 
          </div>
            <div className = 'frame'>   
              <span className =  { this.props.mainImage === 0 ? null :  'arrowIconWrapperLeft'}>
                <i className={ this.props.mainImage === 0 ? "arrow left hidden" : "arrow left active"} onClick = {this.handleSlideLeft}></i> 
              </span>
                <div className = 'galleryContainer' style = {{
                  transform: `translateX(-${this.props.mainImage*500}px)`
                  }}> 
                  {this.props.currentStyle.photos.map((x, index) => { return(
                    // <canvas id = "myCanvas" width = '100' height = '100'> 
                      <img key = {index} src = {this.props.currentStyle.photos[index].url} id = 'galleryImage' onClick = {this.handleClick}/>
                    // </canvas>
                  )})}
                </div>
                <span className = { this.props.mainImage === this.props.thumbnails.length-1 ? null : 'arrowIconWrapperRight'}>
                  <i className= { this.props.mainImage === this.props.thumbnails.length-1 ? "arrow right hidden" : "arrow right active"} onClick = {this.handleSlideRight}></i> 
                </span>
            </div> 
        </div>
      )
    }
  }
}

export default Gallery;