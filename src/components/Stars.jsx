import React from 'react';
import _ from 'underscore';

const star = ({weight, width, key}) => {
    var term = weight === 0 ? 'empty' : weight === 1 ?
        'quarter' : weight === 2 ? 'half' : weight === 3 ? 'mostly' : 'full';
    return <img src={`../../dist/images/${term}-star.png`}
        style={{width: width, height: width}} key={key}></img>;
};

const Stars = (width, rating) => {
    var stars = [];
    var style = {
        width: width,
        height: width / 5
    };
    var index = Math.floor(rating);
    var remainder = rating % 1;
    for (var i = 0; i < (index <=5 ? index : 5); i++) {
        stars.push({weight: 4, width: width / 5, key: i});
    }
    if (rating < 5) {
        if (remainder !== 0) {
            stars.push({weight: remainder <= 0.25 ? 1 : remainder >= 0.75 ? 3 : 2, width: width / 5, key: index});
            index++;
        }
        for (var i = index; i < 5; i++) {
            stars.push({weight: 0, width: width / 5, key: i});
        }
    }
return (<div style={style}>{_.map(stars, star)}</div>);
}

export default Stars;