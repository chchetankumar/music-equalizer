import React from 'react';



export default class AudioBar extends React.Component {
	constructor(props) {
		super(props);
		
		this.state={'top': (100-props.level||0)*props.scale||0,
			     'scale':props.scale,
			     'frequency':props.frequency,
    			     'level':props.level
		};

	}
	componentWillReceiveProps(nextProps){
		this.setState({
			frequency: nextProps.frequency,			
			scale: nextProps.scale,
			top:(100 - nextProps.level)*nextProps.scale,
			level:nextProps.level
		});
	}
	// 35 is the offset margin-top of the root container =10 + padding-top of bar_container=15 + margin-top of audio_bar=10
	dragEnd (event) {
		event.preventDefault();
		event.dataTransfer.dropEffect="move";
		let top=event.clientY;
		console.log(top);
		if( event.clientY > this.state.scale*100) {
			top=this.state.scale*100;
		}
		this.setState({top: top-(2*this.state.scale)-35,
				level: (this.state.scale*100 - (top-2*this.state.scale))/this.state.scale
		 });
		this.props.presetSelector();
	}
	click(event) {
		console.log(event.screenY);
		console.log(event.clientY);
		console.log(event.pageY);
		let top=event.clientY-35;
		console.log(top);
		if( top > this.state.scale*100) {
			top=this.state.scale*100;
		}
		this.setState({top:top-(2*this.state.scale), 
			level: (this.state.scale*100 - (top-(2*this.state.scale)))/this.state.scale
		});
		this.props.presetSelector();
	}
	render () {
		let audio_barStyle= { 'width': '9px',
                            'height': (this.state.scale||0)*100,
                            'margin': '15px',
			    
		};

		let initialButtonStyle={
			'position': 'relative',
                            'left': '-5px',
                            'top': this.state.top+'px',
                            'width': '18px',
                            'backgroundColor': '#c8c8d6',
                            'height': '10px',
			    'borderRadius':'30px',
			    'border': '1px solid black'
		};
		initialButtonStyle.top=this.state.top;
		if ( this.state.level >0 && this.state.level <= 30) {
			audio_barStyle.backgroundColor='#40ec6d';
		} else if ( this.state.level > 30 && this.state.level <= 60) {
			audio_barStyle.backgroundColor='#ffc107';
		} else if ( this.state.level > 60 && this.state.level <=100) {
			audio_barStyle.backgroundColor='#ec4060';
		}
		return ( <div className='bar_container' >
			<div className='audio_bar' style={audio_barStyle} onDragEnd={ e=> this.dragEnd(e) } onClick={e=> this.click(e)} >
			<div ref={(input)=>this.button=input} style={ initialButtonStyle}  className='vol_knob'  draggable="true"></div>
			</div>
			<span style={{'color':'#00ffff',"margin":"12px"}}> {this.state.frequency}</span>
			</div>)
	}


};
