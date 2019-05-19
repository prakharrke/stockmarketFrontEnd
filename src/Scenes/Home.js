import React, { Component } from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import * as Constants from '../Constants'
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import PlacedOrders from './Components/PlacedOrders'
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import ExecutedOrders from './Components/ExecutedOrders'
import Charts from './Components/Charts'
export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			orderKey: '',
			orderQuantity: 0,
			orderPrice: 0,
			orderAction: '',
			userName : '',
			orders : [],
			selected : 0
		}
		
	}
	componentWillMount(){
		var userName = this.props.location.state.userName
		
		this.setState({
			...this.state,
			userName : userName
		})


	}

	handleSelect(event) {
		this.setState({
			selected: event.selected
		})
	}

	

	setOrderKey(event) {
		if(event.target.value.length > 3)
			return
		this.setState({
			...this.state,
			orderKey: event.target.value.toUpperCase()
		})
	}
	setOrderAction(event) {

		this.setState({
			...this.state,
			orderAction: event.target.value
		})
	}
	setOrderQuantity(event) {

		this.setState({
			...this.state,
			orderQuantity: event.target.value
		})
	}
	setOrderPrice(event) {

		this.setState({
			...this.state,
			orderPrice: event.target.value
		})
	}
	placeOrder(event){
		if(this.state.orderKey === '' || this.state.orderQuantity == 0 || this.state.orderPrice ==0 || this.state.orderAction === '')
		{
			alert('Please enter required details')
			return
		}

		var oderTimeStamp = new Date().getTime();

		axios.post(Constants.url + 'NewOrder', `orderDetails=${JSON.stringify({ ...this.state, orderTimeStamp : oderTimeStamp })}`, {

			headers: {
				

			}


		}).then(response=>{

			alert(response.data);
			this.setState({
				...this.state,
				orderKey: '',
			orderQuantity: 0,
			orderPrice: 0,
			orderAction: ''
			})
		}).catch(e=>{

		})
	}
	render() {

		return (
			<div >
				<div>
				<div className="row" style={{height:'100%'}}>
				<div className="col-lg-8" style={{height:'100%'}}>
					<TabStrip selected={this.state.selected} onSelect={this.handleSelect.bind(this)}>

					<TabStripTab title="Placed Orders">
					<PlacedOrders userName={this.state.userName}/>
					</TabStripTab>

					<TabStripTab title="Executed Orders">
						<ExecutedOrders userName = {this.state.userName}/>
					</TabStripTab>

					</TabStrip>
					
				</div>
				<div className="col-lg-4">
					<form className="k-form">
						<fieldset>
							<legend>Create New Order:</legend>
							<div className="row">
								<div className="col-lg-6">
									<Input
										label="Order Key"
										onChange={this.setOrderKey.bind(this)}
										value={this.state.orderKey}
									/>
								</div>
								<div className="col-lg-6">
									<Input
										label="Quantity"
										onChange={this.setOrderQuantity.bind(this)}
										value={this.state.orderQuantity}
									/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6">
									<DropDownList
										data={['BUY', 'SELL']}
										label="Action"
										value={this.state.orderAction}
										onChange={this.setOrderAction.bind(this)}
									/>
								</div>
								<div className="col-lg-6">
									<Input
										label="Price"
										value={this.state.orderPrice}
										onChange={this.setOrderPrice.bind(this)}
									/>
								</div>
							</div>
						</fieldset>
						<input type="button" className="k-button k-primary" value="Place" onClick={this.placeOrder.bind(this)} />
					</form>
				</div>
				</div>
			</div>
			
			<div  className="fixed-bottom" style={{ height : '40%', overflowY : 'scroll', padding : '2em'}}>
				
					<Charts userName = {this.state.userName}/>
				
			</div>
			</div>
		)
	}
}