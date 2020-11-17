import React from 'react';

const ProductItem = ({product, pyro}) => {
    return (
        <div className="related-item">
            <div>
            <img className="related-item-image" src={product.img}/>
            <div className="related-item-faveX">
                <img id="star" className="related-item-star"
                    src={`../../../dist/images/${pyro === 0 ?
                        'full-star' : 'x'}.png`}/>
                </div>
                </div>
            <div className="related-item-info">
                <div className="related-item-category">CATEGORY</div>
                    <div className="related-item-name">{product.name}</div>
                <div className="related-item-category">$123</div>
                <div className="related-item-name">Stars</div>
            </div>
        </div>
    );
};

export default ProductItem;