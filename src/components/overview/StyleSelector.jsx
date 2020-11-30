import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      selectedStyle: '',
      selectedStyleThumbnailIndex: 0
    }

    this.updateStyle = this.updateStyle.bind(this);


  }

  updateStyle(x, index) {
    console.log('hi,x, index', x, index);
    console.log('index', index)
    console.log(x);
    this.props.setCurrentStyle(x, x.original_price, x.sale_price);
    this.setState({
      selectedStyleThumbnailIndex: index,
      selectedStyle: x
    })
  }

  componentDidUpdate() {
    // console.log('in style selector component did update ', this.props.styles)

  }
  render () {
    console.log('in render')
    // console.log('in reder of style selector', this.props.styles.results[selectedStyleThumbnailIndex].name)
  
    if (this.props.styles !== undefined) {
    console.log('in reder of style selector', this.props.styles.results[this.state.selectedStyleThumbnailIndex].name)

      return (
        <div>
          <div className = 'gridItem3Wrapper'>
            <div className = 'styleSelectedStyle'> 
            <b>Style {'>'} </b>{this.props.styles.results[this.state.selectedStyleThumbnailIndex].name}
            </div>
            <div className = 'styleSelectorThumbnailsWrapper'> 
              { this.props.styles.results.map((x, index) => {
                //console.log('index ', index)
        
                if ((index+1)%4 === 0) {
                  return (
                    <span key = {index+1}>
                    <span className = 'styleSelectorDiv' onClick = {()=> {this.updateStyle(x, index)}}> 
                    <span className = 'styleSelectorWrapper'> 

                      <img src = {x.photos[0].thumbnail_url} className = 'styleSelectorThumbnail' />            
                      
                      {index === this.state.selectedStyleThumbnailIndex ? 
                      <img src = './images/check.png' 
                      className = 'styleSelectorCheck'></img> : null}
                      </span>
                  

                    </span>
                    <br/>
                    </span>
                    )
        
                } else {
                return (
                <span className = 'styleSelectorDiv' onClick = {()=>this.updateStyle(x, index)} key = {index+1}> 
                  <span className = 'styleSelectorWrapper'> 
                  
                  <img src = {x.photos[0].thumbnail_url} className = 'styleSelectorThumbnail' />
                  
                  {index === this.state.selectedStyleThumbnailIndex ? 
                  <img src = './images/check.png' 
                  className = 'styleSelectorCheck'></img> : null}
                  </span>
                  

                </span>
                )
        
                }
              }
              )
                }
            </div>
          </div>
        </div>
      )
    } else {
      return(<div></div>)
    }

  }



}

export default StyleSelector;