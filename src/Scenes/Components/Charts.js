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
import 'hammerjs';
import { groupBy } from '@progress/kendo-data-query';
import {
	Chart,
	ChartSeries,
	ChartSeriesItem,
	ChartCategoryAxis,
	ChartCategoryAxisItem,
	ChartTitle,
	ChartLegend,
	ChartSeriesItemTooltip,
	ChartTooltip
} from '@progress/kendo-react-charts';

export default class Charts extends Component {

	constructor(props) {
		super(props);
		this.state = {
			groupedPlacedOrders: []
		}
	}

	componentWillMount() {


		var classThis = this;

		setInterval(() => {


			axios.post(Constants.url + 'GetPlacedOrders', `userName=${classThis.props.userName}`, {

				headers: {

				}


			}).then(response => {


				response.data.map(order => {

					if (order.orderType == 'sell') {
						order.orderQuantity = order.orderQuantity - (2 * order.orderQuantity)
					}
				})

				var groupedData = groupBy(response.data, [{ field: 'orderKey' }])
				console.log(groupedData)


				classThis.setState({
					groupedPlacedOrders: groupedData
				})

			}).catch(e => {
				console.log(e)
			})


		}, 3000)
	}
	render() {
		console.log(this.state.placedOrders)
		var data = this.state.groupedPlacedOrders.map(order => {

			return (
				<div className="col-lg-4">
				<Chart transitions={false}>
					<ChartTitle text={"Placed Orders - " + order.value} />
					<ChartTooltip />
					<ChartSeries transitions={false}>
						<ChartSeriesItem transitions={false} data={order.items} type="column" field="orderQuantity" categoryField="orderTimeStamp" />
						<ChartSeriesItemTooltip background="blue" />
					</ChartSeries>
				</Chart>
				</div>
			)

		})


		return(

			<div className="row">
				{data}
			</div>

			)

	}
}