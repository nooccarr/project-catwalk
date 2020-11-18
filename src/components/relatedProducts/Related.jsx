import React from 'react';
import _ from 'underscore';
import ProductItem from './ProductItem';

class Related extends React.Component {

    constructor(props) {
        super(props);
        this.state = {title: props.title, anim: '', shifted: true,
        scroll: 0, showR: false, showL: true, rolling: 'right',
        overviewId: props.overviewId, comparingId: null, comparing: false};
        this.shift = this.shift.bind(this);
        this.right = this.right.bind(this);
        this.left = this.left.bind(this);
        this.onAnimationEnd = this.onAnimationEnd.bind(this);
        this.onAnimationStart = this.onAnimationStart.bind(this);
        this.hoverHandler = this.hoverHandler.bind(this);
        this.comparison = this.comparison.bind(this);
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
            showL: !(this.state.scroll === this.props.products.length - 5 && this.state.rolling === 'right'),
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
    hoverHandler(on, id) {
        this.setState({comparing: on, comparingId: id || this.state.comparingId});
    }
    comparison() {
        if (this.state.comparing) {
        return (
            <div className="comparison" onMouseEnter={() => this.hoverHandler(true)}
            onMouseLeave={() => this.hoverHandler(false)}>
                Comparing {this.state.overviewId+ ' to '+this.state.comparingId}
            </div>
            );
        }
    }

    render() {
        var title = ['RELATED PRODUCTS', 'YOUR OUTFIT'];
        return (
            <div>
            <div className="related">
                <div className="related-title">{title[this.props.pyro]}</div>
                <div className={`related-item-container ${this.state.anim}`}
                    onAnimationStart={this.onAnimationStart}
                    onAnimationEnd={this.onAnimationEnd}>
                <ul className="related-list" onClick={this.props.handleClick}>
                {_.map(this.props.products.slice(this.state.scroll, this.state.scroll + 
                        (this.state.rolling === 'right' || this.state.shifted ? 5 : 4)), 
                    (product) => {
                    return <li key={product.id}  style={{float: 'left'}}
                        onMouseEnter={() => this.hoverHandler(true, product.id)}
                        onMouseLeave={() => this.hoverHandler(false)}>
                        <ProductItem product={product} pyro={this.props.pyro} faveX={this.faveX}/>
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