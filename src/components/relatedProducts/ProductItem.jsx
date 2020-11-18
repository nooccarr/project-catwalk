import React from 'react';
import Stars from '../Stars.jsx';

const ProductItem = ({product, pyro, image}) => {
    return (
        <div id={product.id} className="related-item">
            <div>
            <img id={product.id} className="related-item-image" src={image}/>
            <div id={product.id} className="related-item-faveX">
                <img id={product.id} className="related-item-star"
                    src={`../../../dist/images/${pyro === 0 ?
                        product.faved ? 'full-star' : 'gray-star' : 'x'}.png`}/>
                </div>
                </div>
            <div className="related-item-info">
                <div className="related-item-category">{product.category}</div>
                    <div id={product.id} className="related-item-name">{product.name}</div>
                    <div className="related-item-category">${product.default_price}</div>
                <div className="related-item-name">
                    {product.rating ? Stars(140, 2.5) : ''}
                    </div>
            </div>
        </div>
    );
};

export default ProductItem;