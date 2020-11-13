import React from 'react';
import Sample from './components/sample.jsx';
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
        <Sample />
        <Overview/>
        <Related/>
        <Reviews/>
      </div>
    )
  }
}

export default App;