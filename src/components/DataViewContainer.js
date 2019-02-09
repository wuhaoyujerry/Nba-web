import React from 'react';
import {ShotChart} from "./ShortChart"
import {CountSlider} from "./CountSlider"
import { Radio, Row, Col, Switch} from 'antd';
import _ from 'lodash';

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
	state = {
		minCount: 2,
		chartType: 'hexbin',
		displayToolTip: true,
	}

	onCountSliderChange = (count) => {
		this.setState({minCount: count});
	}

	onChartTypeChange = (e) => {
		console.log(e.target.value);
		this.setState({chartType: e.target.value});
	}

	onTooltipChange = (displayToolTip) => {
		console.log(displayToolTip);
		this.setState({ displayToolTip});
	}

	render() {
		return (
			<div className="data-view">
				<ShotChart
					playerId={this.props.playerId}
					minCount={this.state.minCount}
					chartType={this.state.chartType}
					displayToolTip={this.state.displayToolTip}
				/>
				<div className="filters">
					{this.state.chartType === 'hexbin' ?
						<CountSlider onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}/> : null}
					<br/>
					<Row>
						<Col span={9}>
							<RadioGroup onChange={this.onChartTypeChange} value={this.state.chartType}>
								<Radio value="hexbin">Hexbin</Radio>
								<Radio value="scatter">Scatter</Radio>
							</RadioGroup>
						</Col>
						<Col span={4}>
							<Switch
								checkedChildren="On"
								unCheckedChildren="Off"
								onChange={this.onTooltipChange}
								defaultChecked />
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}