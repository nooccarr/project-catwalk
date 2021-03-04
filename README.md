# Project Catwalk

This application was built by 3 front-end developers. It meets the specifications of a 26 pages business requirements document. The primary technologies used are React to render custom styled-components, Express to retrieve data from a headless API and CSS for general styling and custom component design.

![Project Catwalk Page Demo](readme_assets/main.gif)

## Building and Running Environment

First install dependencies:

```sh
npm install
```

To create a development build:

```sh
npm run build-dev
```

To create a production build:

```sh
npm run build-prod
```

To run node server:

```sh
npm start
```

## Tech Stack
* [React](https://reactjs.org)
* [Node](https://nodejs.org/en)
* [Express](https://expressjs.com)
* [Heroku](https://www.heroku.com)

## Components
### Product Overview
The product overview section displays photos and descriptions of the selected product. It's designed to guide the user through making selections for style, size, and quantity.

![Product Overview Component](readme_assets/overview.gif)

### Related Products
The related products section is divided into two components. The first of which displays products related to the product shown on the product overview, and makes comparisons to the abovementioned product. The second is the 'your outfit' creation part, which allows the user to add and remove products.

![Related Products Component](readme_assets/related.gif)

### Ratings and Reviews
The ratings and reviews section consists of the ratings component to the left, and reviews component to the right. The ratings part displays user feedback related to the selected product, including user ratings and characteristics. The review part allows the user to sort reviews by options and rating. The new form component at the bottom allows the user to submit a new review.

![Ratings and Reviews Component](readme_assets/ratings-and-reviews.gif)

## Running

Open [Project Catwalk](http://project-catwalk-donauwelle.herokuapp.com) in the browser.

## Future Implementations

* Redux
* Server-Side Rendering