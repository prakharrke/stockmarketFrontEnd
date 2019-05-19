import React, { Component } from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import * as Constants from '../../Constants'
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import LoadingPanel from './LoadingPanel'
export default class PlacedOrders extends Component{

	constructor(props){
		super(props);

		this.state={

			placedOrders : [],
			isLoading : true
		}
	}

	componentWillMount(){


		var classThis = this;

		setInterval(()=>{


		 axios.post(Constants.url + 'GetPlacedOrders', `userName=${classThis.props.userName}`, {

			headers: {
				
			}


		}).then(response=>{

			classThis.setState({
			
			placedOrders : response.data,
			isLoading : false
		})

		}).catch(e=>{
			console.log(e)
		})
	

		}, 3000)
	}

	render(){
		var loadingComponent = this.state.isLoading ? <LoadingPanel /> : ""
		return(
		<div>
			{loadingComponent}
		<Grid
			data={this.state.placedOrders}
			height={"100%"}
			style={{height : 5*window.innerHeight/12}}
		>
			<Column 
				field = "orderID"
				title = "Order ID"
			/>
			<Column 
				field = "orderKey"
				title = "Order Key"
			/>
			<Column 
				field = "orderType"
				title = "Action"
			/>
			<Column 
				field = "orderPrice"
				title = "Order Price"
			/>
			<Column 
				field = "orderQuantity"
				title = "Quantity"
			/>
			<Column 
				field = "orderTimeStamp"
				title = "Timestamp"
			/>

		</Grid>
		</div>
		)
	}
}