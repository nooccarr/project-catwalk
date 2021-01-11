import axios from 'axios';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import NewReview from './NewReview.jsx';
import ReviewList from './ReviewList.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import Stars from '../Stars.jsx';
import average from '../../../utils/average.js';
import filterReviews from '../../../utils/filterReviews.js';
import updateFiltered from '../../../utils/updateFiltered.js';


class RatingAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId,
      product: this.props.product,
      reviews: [],
      reviewsTemp: [],
      sort: 'relevant',
      show: false,
      filter: false,
      reviewIds: []
    };
    this.getAllReviews = this.getAllReviews.bind(this);
    this.getRating = this.getRating.bind(this);
    this.getCurrentReviews = this.getCurrentReviews.bind(this);
    this.getCurrentFiltered = this.getCurrentFiltered.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.showReview = this.showReview.bind(this);
    this.hideReview = this.hideReview.bind(this);
    this.selectedFilters = this.selectedFilters.bind(this);
    this.noFilter = this.noFilter.bind(this);
    this.handleMoreReviewsClick = this.handleMoreReviewsClick.bind(this);
    this.addClickedReviewId = this.addClickedReviewId.bind(this);
  }

  componentDidMount() {
    this.getAllReviews();
    this.getRating();
    // this.scrollListener = window.addEventListener('scroll', e => {
    //   this.handleScroll(e);
    // });
  }

  getAllReviews(sort) {
    return axios
      .get('http://3.21.164.220/reviews', {
        params: {
          product_id: this.state.productId,
          sort: sort,
          count: 1000
        }
      })
      .then(({ data }) => {
        let reviews = data.results;
        this.setState({
          reviewsTemp: reviews,
          reviews: reviews.slice(0, 2),
          reviewsLength: reviews.length,
          moreReviews: true,
          reviewsStart: 0,
          reviewsEnd: 2
        });
      })
      .then(result => {
        if (!this.state.reviewsLength) { this.setState({ moreReviews: false }); }
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

  getCurrentReviews(sort) {
    return axios
      .get('http://3.21.164.220/reviews', {
        params: {
          product_id: this.state.productId,
          sort: sort,
          count: 1000
        }
      })
      .then(({ data }) => {
        let reviews = data.results;
        this.setState({
          reviews: reviews.slice(0, this.state.reviewsEnd)
        });
      })
      .catch(err => console.log(err));
  }

  getCurrentFiltered(reviewId, isHelpful) {
    return axios
      .get('http://3.21.164.220/reviews', {
        params: {
          product_id: this.state.productId,
          count: 1000
        }
      })
      .then(({ data }) => {
        let reviews = data.results;
        this.setState({
          reviewsTemp: reviews
        });
      })
      .then(result => {
        let filteredTemp = updateFiltered(this.state.reviewsTemp, this.state.filteredTemp, reviewId, isHelpful);
        let filtered = updateFiltered(this.state.reviewsTemp, this.state.filtered, reviewId, isHelpful);
        this.setState({
          filteredTemp: filteredTemp,
          filtered: filtered
        });
      })
      .catch(err => console.log(err));
  }

  handleSortByChange(e) {
    const sort = e.target.value;
    this.setState({
      sort: sort,
      filter: false
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
    });
  }

  selectedFilters(filters) {
    let filtered = filterReviews(this.state.reviewsTemp, filters);
      this.setState({
        filteredTemp: filtered,
        filtered: filtered.slice(0, 2),
        filteredStart: 0,
        filteredEnd: 2,
        filteredLength: filtered.length,
        filter: true,
        moreReviews: true
      });
  }

  noFilter() {
    this.setState({
      filter: false
    });
  }

  handleMoreReviewsClick(filter) {
    let start;
    let end;
    if (filter) {
      start = this.state.filteredStart + 2;
      end = this.state.filteredEnd + 2;
      this.setState({
        filtered: [...this.state.filtered, ...this.state.filteredTemp.slice(start, end)],
        filteredStart: start,
        filteredEnd: end,
      });
      if (end >= this.state.filteredLength) {
        this.setState({
          moreReviews: false
        });
      }
    } else {
      start = this.state.reviewsStart + 2;
      end = this.state.reviewsEnd + 2;
      this.setState({
        reviews: [...this.state.reviews, ...this.state.reviewsTemp.slice(start, end)],
        reviewsStart: start,
        reviewsEnd: end,
      });
      if (end >= this.state.reviewsLength) {
        this.setState({
          moreReviews: false
        });
      }
    }
  }

  addClickedReviewId(reviewId) {
    let reviewIds = this.state.reviewIds.slice();
    reviewIds.push(reviewId);
    this.setState({
      reviewIds: reviewIds
    });
  }

  handleScroll() {
    let lastDiv = document.querySelector("button.writeNewReviewButton");
    let lastDivOffset, pageOffset;
    if (lastDiv) {
      lastDivOffset = lastDiv.offsetTop + lastDiv.clientHeight;
      pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastDivOffset) {
        setTimeout(() => this.handleMoreReviewsClick(this.state.filter), 500);
      }
    }
  }

  render() {
    return (
      <div className="ratingAndReviews">
        <div className="ratingAndReviewsTitle">ratings & reviews</div>
        <div className="ratingBody">
          <h1 className="averageRating">{this.state.average}</h1>
          <div className="averageStarRating">{Stars(70, this.state.average)}</div>
          {this.state.rating ? <React.Fragment>
            <RatingBreakdown
              ratings={this.state.rating.ratings}
              selectedFilters={this.selectedFilters}
              noFilter={this.noFilter}
              rec={this.state.rating.recommended}
            />
            <ProductBreakdown
              characteristics={this.state.rating.characteristics}
            />
          </React.Fragment> : null}
        </div>
        <div className="reviewBody">
          <div className="sortOnSection">
            <label className="sortOnText"
            >{this.state.reviewsTemp.length} reviews, sort on</label>
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
            getCurrentReviews={this.getCurrentReviews}
            getCurrentFiltered={this.getCurrentFiltered}
            sort={this.state.sort}
            moreReviews={this.state.moreReviews}
            handleMoreReviewsClick={this.handleMoreReviewsClick}
            filter={this.state.filter}
            addClickedReviewId={this.addClickedReviewId}
            reviewIds={this.state.reviewIds}
          />
          {!this.state.filter && !this.state.reviews.length ? <hr
            className="noReviewDivider"
          /> : null}
          {this.state.filter && !this.state.filtered.length ? <hr
            className="noReviewDivider"
          /> : null}
          <div className="moreReviewNewReview">
            {this.state.moreReviews ? <button
              className="moreReviewButton"
              onClick={()=> this.handleMoreReviewsClick(this.state.filter)}
            >more reviews</button> : null}
            <button
              className="writeNewReviewButton"
              onClick={this.showReview}
            >write new review<div className="newReviewSymbol">+</div></button>
          </div>
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
    );
  }
}

export default RatingAndReviews;