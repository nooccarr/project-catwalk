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
        <Overview className="overview"/>
        <Related className="related"/>
        <Reviews className="reviews"/>
      </div>
    )
  }
}

export default App;