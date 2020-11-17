import React from 'react';
import _ from 'underscore';
import ProductItem from './ProductItem';

class Related extends React.Component {

    constructor(props) {
        super(props);
        this.state = {title: props.title,
        scroll: 0, showR: false, showL: true};
        this.shiftL = this.shiftL.bind(this);
        this.shiftR = this.shiftR.bind(this);
        this.right = this.right.bind(this);
        this.left = this.left.bind(this);
        this.faveX = this.faveX.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidUpdate() {
        if (this.state.scroll === 0 && this.state.showR) {
            this.setState({showR: false});
        }
        if (this.state.scroll > (this.props.products.length-5) && this.state.showL) {
            this.setState({showL: false});
        }
        console.log(this.state.scroll);
    }
    shiftL() {
        this.setState({scroll: this.state.scroll + 1, showR: true});
    }
    shiftR() {
        if (this.state.scroll > 0) {
            this.setState({scroll: this.state.scroll - 1, showL: true});
        }
    }
    right() {
        if (this.state.showR) {
            return <img className="related-right" src="../../../dist/images/left.png"
                onClick={this.shiftR}/>;
        }
    }
    left() {
        if (this.state.showL) {
            return <img className="related-left" src="../../../dist/images/right.png"
                onClick={this.shiftL}/>;
        }
    }
    faveX() {
        console.log('click');
    }
    handleClick(e) {
        console.log(e.target);
    }

    render() {
        var title = ['RELATED PRODUCTS', 'YOUR OUTFIT'];
        var style = {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        return (
            <div className="related">
                <div className="related-title">{title[this.props.pyro]}</div>
                <div style={style}>
                <ul className="related-list" onClick={this.handleClick}>
                {_.map(this.props.products.slice(this.state.scroll, this.state.scroll+5), 
                    (product) => {
                    return <li key={product.id}  style={{float: 'left'}}>
                        <ProductItem product={product} pyro={this.props.pyro} faveX={this.faveX}/>
                        </li>;
                })}
                </ul>
                </div>
                {this.right()}
                {this.left()}
            </div>

        );
    }
}

export default Related;