import React from 'react';
import axios from 'axios';
import NewReview from './NewReview.jsx';
import ReviewList from './ReviewList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import average from '../../../utils/average.js';
import filterReviews from '../../../utils/filterReviews.js';
import Stars from '../Stars.jsx';

class RatingAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId,
      product: this.props.product,
      reviews: [],
      sort: 'relevant',
      show: false,
      filter: false,
      moreReviews: false
    };
    this.getAllReviews = this.getAllReviews.bind(this);
    this.getRating = this.getRating.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.showReview = this.showReview.bind(this);
    this.hideReview = this.hideReview.bind(this);
    this.selectedFilters = this.selectedFilters.bind(this);
    this.noFilter = this.noFilter.bind(this);
    this.handleMoreReviewsClick = this.handleMoreReviewsClick.bind(this);
  }

  componentDidMount() {
    this.getAllReviews();
    this.getRating();
  }

  getAllReviews(sort) {
    return axios
      .get('http://3.21.164.220/reviews', {
        params: {
          product_id: this.state.productId,
          sort: sort,
          count: 20
        }
      })
      .then(({ data }) => {
        let reviews = data.results;
        if (reviews.length > 2) {
          this.setState({
            temp: reviews,
            reviews: reviews.slice(0, 2),
            moreReviews: true
          });
        } else {
          this.setState({
            reviews: reviews
          })
        }
      })
      .catch(err => console.log(err));
  }

  getRating() {
    return axios
      .get('http://3.21.164.220/reviews/meta', {
        params: { product_id: this.state.productId }
      })
      .then(meta => this.setState({
        rating: meta.data,
        average: average(meta.data)
      }))
      .catch(err => console.log(err));
  }

  handleSortByChange(e) {
    const sort = e.target.value;
    this.setState({
      sort: sort
    });
    this.getAllReviews(sort);
  }

  showReview() {
    this.setState({
      show: true
    });
  }

  hideReview() {
    this.setState({
      show: !this.state.show
    })
  }

  selectedFilters(filters) {
    let filtered = filterReviews(this.state.reviews, filters);
    if (filtered.length > 2) {
      this.setState({
        temp: filtered,
        filtered: filtered.slice(0, 2),
        filter: true,
        moreReviews: true
      });
    } else {
      this.setState({
        filtered: filtered,
        filter: true
      });
    }
  }

  noFilter() {
    this.setState({
      filter: false
    });
  }

  handleMoreReviewsClick(filter) {
    let temp = this.state.temp;
    if (filter) {
      this.setState({
        filtered: temp,
        moreReviews: false
      });
    } else {
      this.setState({
        reviews: temp,
        moreReviews: false
      });
    }
  }

  render() {
    return (
      <div className="ratingAndReviews">
        {/* {console.log(this.state)} */}
        <div className="ratingAndReviewsTitle">RATINGS & REVIEWS</div>
        <div className="ratingBody">
          <div>
            <h1 className="averageRating">{this.state.average}</h1>
            <div className="averageStarRating">{Stars(70, this.state.average)}</div>
          </div>
          {this.state.rating ? <div>
            <RatingBreakdown
              ratings={this.state.rating.ratings}
              selectedFilters={this.selectedFilters}
              noFilter={this.noFilter}
              rec={this.state.rating.recommended}
            />
            <ProductBreakdown
              characteristics={this.state.rating.characteristics}
            />
          </div>: null}
        </div>
        <div className="reviewBody">
          <div className="sortOnSection">
            <label className="sortOnText"
            >{this.state.moreReviews ? this.state.temp.length
              : this.state.reviews.length} reviews, sort on</label>
            <select
              className="sortOnOptions"
              onChange={(e) => this.handleSortByChange(e)}>
              {['relevant', 'helpful', 'newest'].map((value, idx) => {
                return <option
                  value={value}
                  key={idx}
                >{value}</option>;
              })}
            </select>
          </div>
          <ReviewList
            reviews={this.state.filter ? this.state.filtered : this.state.reviews}
            getAllReviews={this.getAllReviews}
            sort={this.state.sort}
          />
          <div className="moreReviewNewReview">
            {this.state.moreReviews ? <button
              className="moreReviewButton"
              onClick={()=> this.handleMoreReviewsClick(this.state.filter)}
            >MORE REVIEWS</button> : null}
            <button
              className="writeNewReviewButton"
              onClick={this.showReview}
            >WRITE NEW REVIEW<div className="newReviewSymbol">+</div></button>
            {this.state.rating ? <NewReview
              show={this.state.show}
              hideReview={this.hideReview}
              productId={this.state.productId}
              product={this.state.product}
              characteristics={this.state.rating.characteristics}
              getAllReviews={this.getAllReviews}
              sort={this.state.sort}
            /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default RatingAndReviews;