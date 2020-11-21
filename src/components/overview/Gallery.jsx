import React from 'react';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnails: '',
      mainImage: 0,
      startIndex: 0,
      endIndex: 3,

      slideTriggered: false
    }

    
    this.slideThumbnailsDown = this.slideThumbnailsDown.bind(this);
    this.slideThumbnailsUp = this.slideThumbnailsUp.bind(this);
    this.updateMainImage = this.updateMainImage.bind(this);
    this.slideRight = this.slideRight.bind(this);
    this.slideLeft = this.slideLeft.bind(this);

  }

  componentDidMount() {
    // var c = document.getElementById("myCanvas");
    // var ctx = c.getContext("2d");
    // console.log('component mounted');
    // console.log(ctx);
    // var img = document.getElementById("galleryImage");
    // ctx.drawImage(img, 0, 0);
  }

  slide() {

  }


  slideRight() {
    this.setState((prevState) => ({
      slideTriggered: !prevState.slideTriggered
    }))


    var mainIndex = this.state.mainImage + 1;



    //old logic:
    // if (mainIndex > this.state.endIndex) {
    //   this.slideThumbnailsDown()
    // }

    //new logic: 
    // I think this.state.startIndex+= was incrementing the state weirdly
    
    if (mainIndex > this.state.endIndex) {
      // var newStartIndex = mainIndex - this.state.endIndex;

      var newStartIndex = this.state.startIndex > mainIndex - this.state.endIndex ? this.state.startIndex : mainIndex - this.state.endIndex;

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

    // if (mainIndex < this.state.startIndex) {
    //   this.slideThumbnailsUp()
    // }

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
    // if (this.state.endIndex >= this.state.thumbnails.length-1) {
    //   return;
    // }
    if (this.state.startIndex >= this.state.endIndex-1) {
      return;
    }

    //var newEnd = this.state.endIndex+=1
    var newStart = this.state.startIndex + 1

    console.log('is slide thumbanisl down called?', newStart);

    this.setState({
      // endIndex: newEnd,
      startIndex: newStart
    })

  }

  slideThumbnailsUp() {
  
    if (this.state.startIndex <= 0) {
      return;
    }

    // var newEnd = this.state.endIndex-=1
    var newStart = this.state.startIndex - 1
    this.setState({
      // endIndex: newEnd,
      startIndex: newStart
    })

  }

  componentDidUpdate(prevProps, prevState) {
   
    if (this.state.thumbnails === '' && this.props.currentStyle!=='') {

       console.log('in condition')
       this.setState({
       thumbnails: this.props.currentStyle.photos,
     })
    }

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
                  <i className="arrow up" onClick = {this.slideThumbnailsUp}></i> 
                      
                      
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
                        <div className = 'thumbnailContainer' style = {this.state.startIndex > 0 ? {
                         transform: `translateY(-${TN_SHIFT * (this.state.startIndex) }px)`
                         } : {} }> 
                        {this.props.currentStyle.photos.map((x, index) => { 
                        // if (index > this.state.endIndex || index < this.state.startIndex) {
                        //   return <span key = {index}></span>
                        // }
                        return (
                          // <li className = 'overviewThumbnailLI' key = {index}>
                            <div id = 'galleryThumbnailContainer' style= {{top: `${index*TN_SHIFT}px`}} className = { index === this.state.mainImage ? 'activeThumbnail' : ''} onClick = {() => this.updateMainImage(index)}> 
                              <img src = {x.thumbnail_url} id = 'galleryThumbnail'/> 
                            </div>
                          // </li> 
                        )}
                      )}
                      </div>
                      </div>
                      <i className="arrow down" onClick = {this.slideThumbnailsDown}></i> 


              </div>
              <div className = 'frame'>   
                <i className={ this.state.mainImage === 0 ? "arrow left hidden" : "arrow left active"} onClick = {this.slideLeft}></i> 
                  <div className = 'galleryContainer' style = {{
                    transform: `translateX(-${this.state.mainImage*500}px)`
                  }}> 
                    {this.props.currentStyle.photos.map((x, index) => { return(
                      // <canvas id = "myCanvas" width = '100' height = '100'> 
                        <img src = {this.props.currentStyle.photos[index].url} id = 'galleryImage'/>
                      // </canvas>
                    )})}
                  </div>
                  <i className={ this.state.mainImage === this.state.thumbnails.length-1 ? "arrow right hidden" : "arrow right active"} onClick = {this.slideRight}></i> 

              </div> 

      </div>
      )
    }
  }
}

export default Gallery;