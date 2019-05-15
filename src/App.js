import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import SubTotal from './components/Subtotal/Subtotal';
import PickupSavins from './components/PickupSavings/PickupSavings';
import TaxesFees from './components/TaxesFees/TaxesFees';
import EstimatedTotal from './components/EstimatedTotal/EstimatedTotal';
import ItemDetails from './components/ItemDetails/ItemDetails';
import PromoCodeDiscount from './components/PromoCode/PromoCode';

import { connect } from 'react-redux';
import { handleChange } from './actions/promoCodeActions';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            total: 100,
            PickupSavings: -3.85,
            taxes: 0,
            estimatedTotal: 0,
            disablePromoButton: false
        };
    }

    componentDidMount = () => {
        this.setState({
            taxes: (this.state.total + this.state.PickupSavings) * 0.0875
            },
            function() {
                this.setState({
                    estimatedTotal: this.state.total + this.state.PickupSavings + this.state.taxes
                });
                // 因为此处的estimatedTotal需要使用上面改变过的tax所以需要用 callback function来计算 而不是直接setState，
                // 如果直接setState，则此时调用的taxes为0
            }
        );
    }

    giveDiscountHandler = () => {
        if(this.props.promoCode === 'DISCOUNT') {
            this.setState(
                {
                    estimatedTotal: this.state.estimatedTotal * 0.9
                },
                function() {
                    this.setState({
                        disablePromoButton: true
                    });
                }
            );
        }
    };

    render() {
        return (
            <div className="container">
                <Container className="purchase-card">
                    <SubTotal price={this.state.total.toFixed(2)} />
                    {/*toFixed就是把数字小数点几位*/}
                    <PickupSavins price={this.state.PickupSavings} />
                    <TaxesFees taxes={this.state.taxes.toFixed(2)} />
                    <hr />
                    <EstimatedTotal price={this.state.estimatedTotal.toFixed(2)}/>
                    <ItemDetails price={this.state.estimatedTotal.toFixed(2)}/>
                    <hr />
                    <PromoCodeDiscount giveDiscount={() => this.giveDiscountHandler()}
                                       isDisabled={this.state.disablePromoButton} />
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    promoCode: state.promoCode.value
})

export default connect(mapStateToProps, { handleChange })(App);
