import React, { Component, Fragment } from 'react';

import { Typography, ListItem, ListItemText } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';


class SliderInput extends Component {

constructor(props){

    super(props);
    this.handleChange = this.handleChange.bind(this);

}

    
    handleChange = (event, value) => {
        
        this.props.updateSetting(this.props.name, value);
    };
             

render(){

    //const { value } = this.state;
    const { value, label, min, max, step, disabled, renderCaman } = this.props;

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
                        onDragEnd={renderCaman}
                        disabled={disabled}
                    
                    />
                    
                        
                </ListItem>
        
        </Fragment>

        );
    }

}

//export default withStyles(styles)(SliderInput);
export default SliderInput;