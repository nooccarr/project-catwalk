import React from 'react';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const TN_SHIFT = 60;
    if (this.props.currentStyle === '') {
      return <div> null</div>
    } else {
      return (
        <div onClick={(e) => this.props.trackAction(e, this.props.moduleName)}>
          <div id='galleryThumbnailColumn'>
            <i className="arrow up" onClick={this.handleSlideThumbnailsUp}></i>
              <div className='thumbnailFrame'>
                <div
                  className='thumbnailContainer'
                  style={this.props.startIndex > 0 ?
                    { transform: `translateY(-${TN_SHIFT * (this.props.startIndex) }px)`} :
                    {}
                  }>
                  {this.props.currentStyle.photos.map((x, index) => {
                    return (
                      <div
                        key={index}
                        id='galleryThumbnailContainer'
                        style= {{top: `${index*TN_SHIFT}px`}}
                        className={ index === this.props.mainImage ? 'activeThumbnail' : ''}
                        onClick={() => this.handleUpdateMainImage(index)}
                      >
                        {/* {x.thumbnail_url ? <img */}
                        <img
                          src={x.thumbnail_url && x.thumbnail_url[0] !== 'h' ?
                          x.thumbnail_url.slice(1) : x.thumbnail_url}
                          id='galleryThumbnail'
                        />
                        {/* /> : null} */}
                      </div>
                    )}
                  )}
                </div>
              </div>
            <i className="arrow down" onClick={this.handleSlideThumbnailsDown}></i>
          </div>
            <div className='frame'>
              <span className={ this.props.mainImage === 0 ? null :  'arrowIconWrapperLeft'}>
                <i className={ this.props.mainImage === 0 ? "arrow left hidden" : "arrow left active"} onClick={this.handleSlideLeft}></i>
              </span>
                <div className='galleryContainer'>
                {/*
                <div className='galleryContainer' style={{
                  //-30 for margin on app; -72 for padding in grid item 1; 3/5 is grid item 1's width of container; container is 70% of screen
                  transform: `translateX(-${this.props.mainImage*(((window.innerWidth*.7)*3/5)-72-30)}px)`
                  }}> */}
                  {/* {this.props.currentStyle.photos.map((x, index) => { return(
                    <img key={index} src={this.props.currentStyle.photos[index].url} id='galleryImage' onClick={this.handleClick}/>
                  )})} */}

                  {this.props.currentStyle && this.props.currentStyle.photos[this.props.index] ? <img
                    src={this.props.currentStyle.photos[this.props.index].url}
                    id='galleryImage'
                    onClick={this.handleClick}
                  /> : null}
                </div>
                <span className={ this.props.mainImage === this.props.thumbnails.length-1 ? null : 'arrowIconWrapperRight'}>
                  <i className={ this.props.mainImage === this.props.thumbnails.length-1 ? "arrow right hidden" : "arrow right active"} onClick={this.handleSlideRight}></i>
                </span>
            </div>
        </div>
      )
    }
  }
}

export default Gallery;