import React from 'react';
// import Sample from './components/sample.jsx';
import Overview from './components/Overview';
import Reviews from './components/Reviews';
import Related from './components/Related';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="nav">
          <span className="logo">Donauwelle</span>
        </div>
          <div className="app">
        <Overview/>
        <Related products={[1,2,3,4,5]}/>
        <Reviews/>
        </div>
      </div>
    )
  }
}

export default App;