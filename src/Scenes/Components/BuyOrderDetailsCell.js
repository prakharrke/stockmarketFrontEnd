import React, { Component } from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import * as Constants from '../../Constants'
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import LoadingPanel from './LoadingPanel'
import { Tooltip } from '@progress/kendo-react-tooltip';
export default class BuyOrderDetailsCell extends Component{

	render(){

		

		return (
			 
			<td>
			<Tooltip anchorElement="target" position="top" style={{position : 'absolute'}}>
				<a
					title={this.props.dataItem.buyOrderDetails}
					href="#"
				>
					{this.props.dataItem.buyOrderID}
				</a>
				</Tooltip>
			</td>
			
			)

	}
}