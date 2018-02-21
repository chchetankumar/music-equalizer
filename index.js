import React from 'react';
import ReactDOM from 'react-dom';
import AudioComponent from './audio';

export default class AudioControl extends React.Component {
	constructor(props) {
		super(props);	
		this.presetBands = { 'rock':['50','60','60','50','40'],
				     'pop':['50','20','60','50','40'],
				     'jazz':['20','80','70','50','50'],
				     'classical' :['50','60','60','50','40'],
				     'custom': ['50','50','50','50','50']
		};
		this.state={ selected_band : 'rock' };
		this.styles={
			'display':'inline',

		};

	}
	changeSelectedBand(){
		this.setState({'selected_band': this.preset.value});
	}
	changeToCustom(){
		this.preset.value="custom";
	}
	render(){
		let selected_band = this.presetBands[this.state.selected_band];
		let selectStyle= {
			    'top': '100px',
			    'position': 'absolute',
			    'height': '40px',
			    'fontSize': 'larger'
		};
		return(<div style={this.styles}>
			<AudioComponent scale={2} band_60={selected_band[0]} band_310={selected_band[1]} band_1k={selected_band[2]} band_6k={selected_band[3]} band_16k={selected_band[4]} presetSelector={this.changeToCustom.bind(this)}> </AudioComponent>
			<select ref={(input)=>this.preset=input} onChange={this.changeSelectedBand.bind(this)} style={selectStyle} defaultValue="rock">
				<option value="custom">Custom</option>
				<option value="rock">Rock</option>	
				<option value="pop">Pop</option>	
				<option value="jazz">Jazz</option>	
				<option value="classical">Classical</option>	
			</select>

			</div>
		)
	}

}


ReactDOM.render(<AudioControl /> , document.getElementById('root'));

