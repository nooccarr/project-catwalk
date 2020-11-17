import React from 'react';
import _ from 'underscore';
import ProductItem from './ProductItem';

class Related extends React.Component {

    constructor(props) {
        super(props);
        this.state = {title: props.title, anim: '', shifted: true,
        scroll: 0, showR: false, showL: true, rolling: 'right'};
        this.shift = this.shift.bind(this);
        this.right = this.right.bind(this);
        this.left = this.left.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onAnimationEnd = this.onAnimationEnd.bind(this);
        this.onAnimationStart = this.onAnimationStart.bind(this);
    }
    shift(e) {
        if (this.state.shifted) {
            this.setState({anim: this.state.anim ? '' : `related-animation-${e.target.id}`,
                rolling: e.target.id, showR: true});
        }
    }
    onAnimationStart () {
        this.setState({shifted: false});
    }
    onAnimationEnd () {
        this.setState({
            shifted: true, anim: '', 
            showL: this.state.scroll < this.props.products.length - 5,
            showR: !(this.state.scroll === 1 && this.state.rolling === 'left'),
            scroll: this.state.scroll + (this.state.rolling === 'right' ? 1 : -1)
        });
    }
    right() {
        if (this.state.showR) {
            return <img id="left" className="related-right" src="../../../dist/images/left.png"
                onClick={this.shift}/>;
        }
    }
    left() {
        if (this.state.showL) {
            return <img id="right" className="related-left" src="../../../dist/images/right.png"
                onClick={this.shift}/>;
        }
    }
    handleClick(e) {
        console.log(e.target.className, e);
    }

    render() {
        var title = ['RELATED PRODUCTS', 'YOUR OUTFIT'];
        return (
            <div className="related">
                <div className="related-title">{title[this.props.pyro]}</div>
                <div className={`related-item-container ${this.state.anim}`}
                    onAnimationStart={this.onAnimationStart}
                    onAnimationEnd={this.onAnimationEnd}>
                <ul className="related-list" onClick={this.handleClick}>
                {_.map(this.props.products.slice(this.state.scroll, this.state.scroll + 
                        (this.state.rolling === 'right' || this.state.shifted ? 5 : 4)), 
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