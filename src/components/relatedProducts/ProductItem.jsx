import React from 'react';
import Stars from '../Stars.jsx';

const ProductItem = ({product, pyro}) => {
    return (
        <div id={product.id} className="related-item">
            <div>
            <img id={product.id} className="related-item-image" src={product.img}/>
            <div id={product.id} className="related-item-faveX">
                <img id={product.id} className="related-item-star"
                    src={`../../../dist/images/${pyro === 0 ?
                        'full-star' : 'x'}.png`}/>
                </div>
                </div>
            <div className="related-item-info">
                <div className="related-item-category">CATEGORY</div>
                    <div id={product.id} className="related-item-name">{product.name}</div>
                <div className="related-item-category">$123</div>
                <div className="related-item-name">
                    {product.rating ? Stars(140, 2.5) : ''}
                    </div>
            </div>
        </div>
    );
};

export default ProductItem;