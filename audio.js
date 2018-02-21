import React from 'react';
import ReactDOM from 'react-dom';
import AudioBar from './audio-bar';

const Marker = (props) => {
			let audio_barStyle= { 'width': '9px',
                            'height': (props.scale||0)*100,
                            'margin': '15px',

			};
			function markerStyle(scale,pos){
				let top = pos*scale*100;
				return { "position":"relative","top":top,"color":"#00ffff",'fontSize':'small','marginLeft':'-12px','marginBottom':'10px',"float":"left","display":"grid"};
			}  
			if ( props.scale >0 ) {    	
			return (<div className="bar_container">
                                <span style={markerStyle(props.scale,0)}>-12db</span>
                                <span style={markerStyle(props.scale,1)} >+12db</span>
                        </div> )
			} else {
			return (<div className="bar_container"></div>)
			}
	};
export default class AudioComponent extends React.Component {
	constructor(props) {
		super(props);	
		this.state= { scale: props.scale,
			      band_60: props.band_60,
			      band_310: props.band_310,
			      band_1k: props.band_1k,
			      band_6k: props.band_6k,
			      band_16k: props.band_16k,
		};
		this.styles={
			'display':'inline-flex',
			'backgroundColor': '#424042',
			'margin':'10px',
			'width': '300px',
			'marginLeft': '100px',
			'paddingLeft': '20px',
		};

	}
	componentWillReceiveProps(nextProps){
		this.setState( {
			band_60: nextProps.band_60,
                        band_310: nextProps.band_310,
                        band_1k: nextProps.band_1k,
                        band_6k: nextProps.band_6k,
                        band_16k: nextProps.band_16k,

		});

	}
	render(){
		return(<div style={this.styles}>
			<Marker scale={this.state.scale}></Marker>
			<AudioBar ref={(input)=>this.band_60=input } frequency={'60'} scale={this.state.scale} level={this.state.band_60} presetSelector={this.props.presetSelector} ></AudioBar>
			<AudioBar ref={(input)=>this.band_310=input } frequency={'310'} scale={this.state.scale} level={this.state.band_310} presetSelector={this.props.presetSelector}></AudioBar>
			<AudioBar ref={(input)=>this.band_1000=input } frequency={'1k'} scale={this.state.scale} level={this.state.band_1k} presetSelector={this.props.presetSelector}></AudioBar>
			<AudioBar ref={(input)=>this.band_6000=input } frequency={'6k'} scale={this.state.scale} level={this.state.band_6k} presetSelector={this.props.presetSelector}></AudioBar>
			<AudioBar ref={(input)=>this.band_16000=input } frequency={'16k'} scale={this.state.scale} level={this.state.band_16k} presetSelector={this.props.presetSelector}></AudioBar>
			</div>
		)
	}

}


ReactDOM.render(<AudioComponent /> , document.getElementById('root'));

