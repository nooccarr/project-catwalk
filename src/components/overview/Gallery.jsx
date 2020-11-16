import React from 'react';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnails: '',
      mainImage: 0,
      startIndex: 0,
      endIndex: 4,

    }
    this.slideThumbnailsDown = this.slideThumbnailsDown.bind(this);
    this.slideThumbnailsUp = this.slideThumbnailsUp.bind(this);
    this.updateMainImage = this.updateMainImage.bind(this);

  }

  updateMainImage(index) {
    this.setState({
      mainImage: index
    })
  }

  slideThumbnailsDown() {
  
    if (this.state.endIndex >= this.state.thumbnails.length-1) {
      return;
    }

    var newEnd = this.state.endIndex+=1
    var newStart = this.state.startIndex+=1
    this.setState({
      endIndex: newEnd,
      startIndex: newStart
    })

  }

  slideThumbnailsUp() {
  
    if (this.state.startIndex <= 0) {
      return;
    }

    var newEnd = this.state.endIndex-=1
    var newStart = this.state.startIndex-=1
    this.setState({
      endIndex: newEnd,
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

     if (this.state.thumbnails === '') {
    // if (this.props.currentStyle === '') {
    return (
      <div> </div>
    )
    } else {
      console.log(this.state.thumbnails[0], 'in else')
      console.log(this.state.thumbnails, 'in else')
      console.log('this.props.currentStyle[0]', this.props.currentStyle[0])


      return (
        <div>
           {/* <img src = {this.state.currentImage} id = 'galleryImage'/> */}
           
           <img src = {this.props.currentStyle.photos[this.state.mainImage].url} id = 'galleryImage'/>
           <div id = 'galleryThumbnailColumn'> 
           <button className = 'galleryThumbnailUp' onClick = {this.slideThumbnailsUp}>up</button>
           <ul className = 'overviewThumbnailUL'> 
            {this.props.currentStyle.photos.map((x, index) => { 
            {/* {this.state.thumbnails.map((x, index) => { */}

            if (index > this.state.endIndex || index < this.state.startIndex) {
              return <span></span>
            }

            return (
              <li className = 'overviewThumbnailLI'>
                <span id = 'galleryThumbnailContainer' onClick = {() => this.updateMainImage(index)}> 
                  <img src = {x.thumbnail_url} id = 'galleryThumbnail'/> 
                </span>
              </li> 
            )}
            )}

          </ul>
          <button className = 'galleryThumbnailDown' onClick = {this.slideThumbnailsDown}>down</button>
        </div>
           
        </div>
      )
    }
  }
}

export default Gallery;