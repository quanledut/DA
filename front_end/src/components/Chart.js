import React, { Component } from 'react'
import {Bar, Pie,Line} from 'react-chartjs-2';
import {employeeSalereport} from '../api/AccountApi';

export class BarChart extends Component {

	constructor(props){
		super(props);
		this.state = {
			chartData: {}
		}
	}
	static defaultProps = {
		displayTitle: true,
		displayLegend: true,
		legendPosition: 'right',
	}

	componentWillMount(){
	}

	render() {
		return (
			<div>
				<Bar
					data = {this.props.data}
					options={{
						title:{
						  display:this.props.displayTitle,
						  text: this.props.title,
						  fontSize:25
						},
						legend:{
						  display:this.props.displayLegend,
						  position:this.props.legendPosition
						}
					}}
				/>
			</div>
		)
	}
}

export class LineChart extends Component {
	constructor(props){
		super(props);
		this.state = {
			chartData: {}
		}
	}
	static defaultProps = {
		displayTitle: true,
		displayLegend: true,
		legendPosition: 'right',
	}

	componentWillMount(){
	}

	render() {
		return (
			<div>
				<Line
					data = {this.props.data}
					options={{
						title:{
						  display:true,
						  text: this.props.title,
						  fontSize:25
						},
						legend:{
						  display:false,
						  position:'right'
						}
					}}
					height={this.props.height}
                    options={{ maintainAspectRatio: false }}
				/>
			</div>
		)
	}
}