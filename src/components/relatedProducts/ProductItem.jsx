import React from 'react';
import Stars from '../Stars.jsx';

const ProductItem = ({product, pyro, image}) => {
    return (
        <div id={product.id} className="related-item">
            <div>
            <img className="related-item-image" src={image}/>
            <div className="related-item-faveX">
                <img id={product.id} className="related-item-star"
                    src={`../../../dist/images/${pyro === 0 ?
                        product.faved ? 'full-star' : 'gray-star' : 'x'}.png`}/>
                </div>
                </div>
            <div className="related-item-info">
                <div className="related-item-category">{product.category}</div>
                    <div className="related-item-name">{product.name}</div>
                    <div className="related-item-category">${product.default_price}</div>
                <div className="related-item-name">
                    {Stars(140, product.average || product.rating)}
                    </div>
            </div>
        </div>
    );
};

export default ProductItem;