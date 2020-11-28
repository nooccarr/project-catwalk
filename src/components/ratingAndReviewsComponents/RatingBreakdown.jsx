import React from 'react';
import Bar from './Bar.jsx';
import totalStars from '../../../utils/totalStars.js';
import getPercentage from '../../../utils/getPercentage.js';
import selectedBar from '../../../utils/selectedBar.js';
import appliedFilters from '../../../utils/appliedFilters.js';
import totalCount from '../../../utils/totalCount.js';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: { 1: false, 2: false, 3: false, 4: false, 5: false }
    };
    this.handleBarClick = this.handleBarClick.bind(this);
    this.handleRemoveFilters = this.handleRemoveFilters.bind(this);
  }

  componentDidMount() {
    this.setState({
      total: totalStars(this.props.ratings)
    });
  }

  handleBarClick(star) {
    let filters = this.state.filters;
    filters[star] = !this.state.filters[star];
    this.setState({
      filters: filters
    });
    if (selectedBar(filters)) {
      this.props.selectedFilters(filters);
    } else {
      this.props.noFilter();
    }
  }

  handleRemoveFilters() {
    this.setState({
      filters: { 1: false, 2: false, 3: false, 4: false, 5: false }
    });
    this.props.noFilter();
  }

  render() {
    const { ratings, rec } = this.props;
    const anyFilter = appliedFilters(this.state.filters);
    const recPercentage = getPercentage(totalCount(rec), rec[1]);

    return (
      <div>
        {/* {console.log(this.state)} */}
        <h3 className="ratingBreakdownTitle">rating breakdown</h3>
        <div className="appliedFilters">{anyFilter}</div>
        {anyFilter ? <div
          className="ratingBreakdownRemoveFilters"
          onClick={this.handleRemoveFilters}
        >remove all filters</div> : null}
        {[5, 4, 3, 2, 1].map((star, idx) => {
          return <Bar
            star={star}
            rating={ratings[star]}
            total={this.state.total}
            key={idx}
            handleBarClick={this.handleBarClick}
          />;
        })}
        <div className="percentageOfReviewsRecommended">
          {recPercentage}% of reviews recommend this product
        </div>
      </div>
    );
  }
};

export default RatingBreakdown;