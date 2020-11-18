import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import ProductItem from './ProductItem';

class Related extends React.Component {

    constructor(props) {
        super(props);
        this.state = {title: props.title, anim: '', shifted: true, length: 0,
        unq: 0, scroll: 0, showR: false, showL: true, rolling: 'right',
        products: {}, comparingId: null, comparing: false};
        this.shift = this.shift.bind(this);
        this.right = this.right.bind(this);
        this.left = this.left.bind(this);
        this.onAnimationEnd = this.onAnimationEnd.bind(this);
        this.onAnimationStart = this.onAnimationStart.bind(this);
        this.hoverHandler = this.hoverHandler.bind(this);
        this.comparison = this.comparison.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.Add = this.Add.bind(this);
    }
    componentDidUpdate() {
        if (Object.keys(this.props.products).length !== this.state.length) {
            var products = {};
            var length = 0;
            for (var product of this.props.products) {
                products[product.id] = product;
                length++;
            }
            var unq = Object.keys(products).length;
            this.setState({products: products, length: length,
                unq: unq, showL: unq > 4});
        }
    }
    shift(e) {
        if (this.state.shifted) {
            this.setState({anim: this.state.anim ? '' : `related-animation-${e.target.id}`,
                rolling: e.target.id, showR: true, showL: true});
        }
    }
    onAnimationStart () {
        this.setState({shifted: false});
    }
    onAnimationEnd () {
        this.setState({
            shifted: true, anim: '', 
            showL: !(this.state.scroll === this.state.unq - (this.props.pyro === 0 ? 5 : 4) 
                && this.state.rolling === 'right'),
            showR: !(this.state.scroll === 1 && this.state.rolling === 'left'),
            scroll: this.state.scroll + (this.state.rolling === 'right' ? 1 : -1)
        });
    }
    right() {
        if (this.state.showR) {
            return <div id="left" className="arrowdiv-right" onClick={this.shift}>
                <img id="left" className="related-right" onClick={this.shift}
                    src="../../../dist/images/left.png"/>
                </div>;
        }
    }
    left() {
        if (this.state.showL) {
            return <div id="right" className="arrowdiv-left" onClick={this.shift}>
                <img id="right" className="related-left" onClick={this.shift}
                src="../../../dist/images/right.png"/>
                </div>;
        }
    }
    hoverHandler(on, id = 0) {
        if (id >= 0) {
            this.setState({comparing: on, comparingId: id || this.state.comparingId});
        }
    }
    handleClick(e) {
        if (e.target.className === 'related-item-star') {
            if (this.props.pyro === 0) {
                var products = this.state.products;
                products[e.target.id].faved = !products[e.target.id].faved;
                this.setState({products: products});
                this.props.toggleOutfit(e.target.id);
            } else {
                this.props.toggleOutfit(e.target.id);
            }
        } else {
            this.props.handleRedirect(e.target.id);
        }
    }
    comparison() {
        if (this.state.comparing) {
        return (
            <div className="comparison" onMouseEnter={() => this.hoverHandler(true)}
            onMouseLeave={() => this.hoverHandler(false)}>
                Comparing {this.props.overview.name+ ' to '
                    + this.state.products[this.state.comparingId].name}
            </div>
            );
        }
    }
    Add() {
        return (
            <li key="outfit" style={{float: 'left'}}>
                <div id={-1} className="related-item">
                    &nbsp;&nbsp;&nbsp;Add to Outfit
                    <img id={-1} className="related-plus" src="../../../dist/images/plus.png"/>
                </div>
            </li>
            );
    }

    render() {
        var title = ['RELATED PRODUCTS', 'YOUR OUTFIT'];
        var index = 0;
        var add = this.props.pyro === 0 ? [] : ['add'];
        return (
            <div>
            <div className="related">
                <div className="related-title">{title[this.props.pyro]}</div>
                <div className={`related-item-container ${this.state.anim}`}
                    onAnimationStart={this.onAnimationStart}
                    onAnimationEnd={this.onAnimationEnd}>
                <ul className="related-list" onClick={this.handleClick}>
                {_.map(add.concat(Object.values(this.state.products)).slice(this.state.scroll, this.state.scroll + 
                        (this.state.rolling === 'right' || this.state.shifted ? 5 : 4)), 
                    (product) => {
                        if (product === 'add') {
                            return this.Add();
                        }
                        index++;
                        var image;
                        if (product.styles) {
                            image = product.styles.results[0].photos[0].thumbnail_url;
                        } else {
                            image = product.img || null;
                        }
                        return <li key={index} style={{float: 'left'}}
                            onMouseEnter={() => this.hoverHandler(true, product.id)}
                            onMouseLeave={() => this.hoverHandler(false)}>
                            <ProductItem product={product} pyro={this.props.pyro}
                                faveX={this.faveX} image={image}/>
                            </li>;
                })}
                </ul>
                </div>
                {this.right()}
                {this.left()}
            </div>
                {this.comparison()}
            </div>

        );
    }
}

export default Related;