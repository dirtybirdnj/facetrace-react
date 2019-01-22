import React, { Component, Fragment } from 'react';

import { Typography, ListItem, ListItemText } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';


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
                        <Button variant="contained" size="small" color="default">-</Button>
                        <Button variant="contained" size="small" color="default">Reset</Button>
                        <Button variant="contained" size="small" color="default">+</Button>
                    </ListItem>
                    
                    <ListItem>
                        <Slider
                            
                            value={value}
                            min={min}
                            max={max}
                            step={step}
                            aria-labelledby={`label{$label}`}
                            onChange={this.handleChange}
                            onDragEnd={ () => { renderCaman(true) } }
                            disabled={disabled}
                        
                        />
                        
                            
                    </ListItem>
            
            </Fragment>

        );
    }

}

//export default withStyles(styles)(SliderInput);
export default SliderInput;