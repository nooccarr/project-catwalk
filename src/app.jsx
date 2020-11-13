import React from 'react';
import Sample from './components/sample.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Sample />
      </div>
    )
  }
}

export default App;