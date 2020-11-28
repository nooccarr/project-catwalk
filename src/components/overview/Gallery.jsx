import React from 'react';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // thumbnails: '',
      // mainImage: 0,
      // startIndex: 0,
      //endIndex: 3,

    }

    // this.slideThumbnailsDown = this.slideThumbnailsDown.bind(this);
    // this.slideThumbnailsUp = this.slideThumbnailsUp.bind(this);
    // // this.updateMainImage = this.updateMainImage.bind(this);
    // this.slideRight = this.slideRight.bind(this);
    // this.slideLeft = this.slideLeft.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSlideRight = this.handleSlideRight.bind(this);
    this.handleSlideLeft = this.handleSlideLeft.bind(this);
    this.handleUpdateMainImage = this.handleUpdateMainImage.bind(this);
    this.handleSlideThumbnailsDown = this.handleSlideThumbnailsDown.bind(this);
    this.handleSlideThumbnailsUp = this.handleSlideThumbnailsUp.bind(this);


  }

  handleClick() {
    console.log('main image clicked');
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
        <div> 
                  <div id = 'galleryThumbnailColumn'>
                  <i className="arrow up" onClick = {this.handleSlideThumbnailsUp}></i> 
                      
                      
                      {/* <ul className = 'overviewThumbnailUL'> 
                        {this.props.currentStyle.photos.map((x, index) => { 
                        if (index > this.state.endIndex || index < this.state.startIndex) {
                          return <span key = {index}></span>
                        }
                        return (
                          <li className = 'overviewThumbnailLI' key = {index}>
                            <span id = 'galleryThumbnailContainer' className = { index === this.state.mainImage ? 'activeThumbnail' : ''} onClick = {() => this.updateMainImage(index)}> 
                              <img src = {x.thumbnail_url} id = 'galleryThumbnail'/> 
                            </span>
                          </li> 
                        )}
                      )}
                    </ul> */}


                   
                      <div className = 'thumbnailFrame'>
                      {/* <i className="arrow down" onClick = {this.slideThumbnailsDown}></i>  */}
                        <div className = 'thumbnailContainer' style = {this.props.startIndex > 0 ? {
                         transform: `translateY(-${TN_SHIFT * (this.props.startIndex) }px)`
                         } : {} }> 
                        {this.props.currentStyle.photos.map((x, index) => { 
                        // if (index > this.state.endIndex || index < this.state.startIndex) {
                        //   return <span key = {index}></span>
                        // }
                        return (
                          // <li className = 'overviewThumbnailLI' key = {index}>
                            <div id = 'galleryThumbnailContainer' style= {{top: `${index*TN_SHIFT}px`}} 
                            className = { index === this.props.mainImage ? 'activeThumbnail' : ''} 
                            onClick = {() => this.handleUpdateMainImage(index)}> 
                              <img src = {x.thumbnail_url} id = 'galleryThumbnail'/> 
                            </div>
                          // </li> 
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
                        <img src = {this.props.currentStyle.photos[index].url} id = 'galleryImage' onClick = {this.handleClick}/>
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