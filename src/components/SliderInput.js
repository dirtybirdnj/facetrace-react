import React, { Component, Fragment } from 'react';

import { Typography, ListItem, ListItemText } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';


class SliderInput extends Component {

constructor(props){

    super(props);
    this.state = {
        value: 0
    }

}

    
    handleChange = (event, value) => {
        this.setState({ value });
    };
             

render(){

    const { value } = this.state;
    const { label, min, max, step } = this.props;

    return (
        <Fragment>
            
            
                <ListItem>
                <ListItemText primary={<Typography id="labelBrightness">{label}: {value}</Typography>} />
                </ListItem>

                <ListItem>
                    <Slider
                        
                        value={value}
                        min={min}
                        max={max}
                        step={step}
                        aria-labelledby="labelBrightness"
                        onChange={this.handleChange}
                
                    />
                    
                        
                </ListItem>
        
        </Fragment>

        );
    }

}

//export default withStyles(styles)(SliderInput);
export default SliderInput;