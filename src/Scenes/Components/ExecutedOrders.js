import React, { Component } from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import * as Constants from '../../Constants'
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import LoadingPanel from './LoadingPanel'
import BuyOrderDetailsCell from './BuyOrderDetailsCell'
import SellOrderDetailsCell from './SellOrderDetailsCell'

export default class ExecutedOrders extends Component {

	constructor(props) {
		super(props);
		this.state = {
			executedOrders: [],
			isLoading: true
		}
	}

	setLoading(loadingState) {

		this.setState({
			...this.state,
			isLoading: loadingState
		})
	}

	componentWillMount() {

		var classThis = this;

		setInterval(() => {


			axios.post(Constants.url + 'GetExecutedOrders', `userName=${classThis.props.userName}`, {

				headers: {

				}


			}).then(response => {

				classThis.setState({

					executedOrders: response.data,
					isLoading: false
				})

			}).catch(e => {
				console.log(e)
			})


		}, 3000)
	}

	render() {
		if (this.state.executedOrders.length > 0) console.log(this.state.executedOrders)
		var loadingComponent = this.state.isLoading ? <LoadingPanel /> : ""
		return (
			<div>
				{loadingComponent}
				<Grid
					data={this.state.executedOrders}
				>
					<Column
						field="buyOrderID"
						cell={(props) => <BuyOrderDetailsCell {...props}/>}
						title="Buy Order ID"
					/>
					<Column
						field="sellOrderID"
						cell={(props) => <SellOrderDetailsCell {...props}/>}
						title="Sell Order ID"
					/>
					<Column
						field="orderKey"
						title="Order Key"
					/>
					<Column
						field="quantity"
						title="Order Quantity"
					/>


				</Grid>
			</div>
		)
	}
}