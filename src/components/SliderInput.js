import React, { Component, Fragment } from 'react';

import { Typography, ListItem, ListItemText } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';


class SliderInput extends Component {

constructor(props){

    super(props);
    this.state = {
        value: this.props.value
    }

    this.handleChange = this.handleChange.bind(this);
    this.updateAppState = this.updateAppState.bind(this);

}

    
    handleChange = (event, value) => {
        
        this.setState({ value });
    };

    updateAppState = () => {

        this.props.updateSetting(this.props.name, this.state.value);

    }
             

render(){

    //const { value } = this.state;
    const { value, label, min, max, step, disabled } = this.props;

    return (
        <Fragment>
            
                <ListItem>
                <ListItemText primary={<Typography id={`label{$label}`} >{label}: {value}</Typography>} />
                </ListItem>

                <ListItem>
                    <Slider
                        
                        value={value}
                        min={min}
                        max={max}
                        step={step}
                        aria-labelledby={`label{$label}`}
                        onChange={this.handleChange}
                        onDragEnd={this.updateAppState}
                        disabled={disabled}
                    
                    />
                    
                        
                </ListItem>
        
        </Fragment>

        );
    }

}

//export default withStyles(styles)(SliderInput);
export default SliderInput;