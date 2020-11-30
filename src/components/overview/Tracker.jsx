import React from 'react'

class Tracker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      interactions: []
    }
    this.trackAction = this.trackAction.bind(this);
  }

    trackAction(e, moduleName) {
      var newUIs = this.state.interactions.slice();
      var action = {element: e.target.outerHTML,
                    time: Date.now(),
                    module: moduleName
                  } 
      newUIs.push(action);
      this.setState({
        interactions: newUIs
      })
    }

    render() {
      return (
        // <div onClick = {(e)=> this.trackAction(e, /*m*/)}>
          
        //   {/* example, like cat */}
        //   <ProductInfo trackAction = {this.trackAction}/>

        // </div>
        <div>
          {this.props.render({trackAction: this.trackAction})}
        </div>
      )
    }
  }

  export default Tracker;