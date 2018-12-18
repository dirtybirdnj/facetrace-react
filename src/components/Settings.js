import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';



import SliderInput from './SliderInput';

class Settings extends Component {

constructor(props){
    super(props);
}
        
render(props){

    const { values, image } = this.props;

    //Disable the inputs if no image has been uploaded yet
    

    const isEnabled = (image ? false : true );

    console.log('image checks', image, isEnabled)

    return (
        <Fragment>
            
                <Paper>
                    <List>
                        <ListItem>
                            <Typography variant="title" color="inherit">Settings</Typography>
                        </ListItem>
                        <SliderInput 
                            name="brightness" 
                            label="Brightness" 
                            value={values.brightness} 
                            min={-100} 
                            max={100} 
                            step={1} 
                            updateSetting={this.props.updateSetting} 
                            disabled={isEnabled}
                        />

                        <SliderInput 
                            name="contrast" 
                            label="Contrast" 
                            value={values.contrast} 
                            min={-100} 
                            max={100} 
                            step={1} 
                            updateSetting={this.props.updateSetting} 
                            disabled={isEnabled}
                        />
                        
                        <ListItem>
                            <Button onClick={this.props.resetSettings} variant="contained" color="secondary" fullWidth={true}>Reset Settings</Button>
                        </ListItem>

                        <ListItem>
                            <Button onClick={this.props.addLayer} variant="contained" color="primary" fullWidth={true}>Add Layer</Button>
                        </ListItem>

                    </List>                    
                </Paper>
           
        </Fragment>
        );
    }

}

export default Settings;