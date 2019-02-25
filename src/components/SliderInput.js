import React, { Component } from 'react';

import { Typography, ListItem, ListItemText } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import mouseTrap from 'react-mousetrap';


class SliderInput extends Component {

    constructor(props){

        super(props);
        this.handleChange = this.handleChange.bind(this);

    }

        
    handleChange = (event, value) => {
        
        this.props.updateSetting(this.props.name, value);
        this.props.setActiveInput(this.props.name);
    };

    componentWillMount(){

        this.props.bindShortcut('left', function(){

            //This is the wrong way to handle this.
            //If the input is selected
            if(this.props.activeInput === this.props.name){
                
                console.log('left!');
            
            }

            

        }.bind(this))

    }
                

    render(){

        //const { value } = this.state;
        const { value, name, label, min, max, step, disabled, renderCaman, activeInput } = this.props;

        return (
            <div className={ (name === activeInput ? 'activeInput' : 'not-active')}>
                
                    <ListItem>
                        <ListItemText primary={<Typography id={`label{$label}`} >{label}: {value}</Typography>} />
                    </ListItem>
                    {/* //TODO: Implement incremental settings bumps
                    <ListItem>
                        <Button variant="contained" size="small" color="default">-</Button>
                        <Button variant="contained" size="small" color="default">Reset</Button>
                        <Button variant="contained" size="small" color="default">+</Button>
                    </ListItem>
                    */}
                    
                    <ListItem>
                        <Slider
                            value={value}
                            min={min}
                            max={max}
                            step={step}
                            aria-labelledby={`label{$label}`}
                            onChange={this.handleChange}
                            onDragEnd={ () => { renderCaman(true); }}
                            disabled={disabled}
                        />
                        
                    </ListItem>
            
            </div>

        );
    }

}

//export default withStyles(styles)(SliderInput);
export default mouseTrap(SliderInput);