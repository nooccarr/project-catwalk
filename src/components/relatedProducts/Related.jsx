import React from 'react';
import _ from 'underscore';
import ProductItem from './ProductItem';

class Related extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="related">
                <div className="related-title">RELATED PRODUCTS</div>
                <ul>
                {_.map(this.props.products, (product) => {
                    return <li key={product}  style={{float: 'left'}}>
                        <ProductItem product={product}/>
                        </li>;
                })}
                </ul>
            </div>

        );
    }
}

export default Related;