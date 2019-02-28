import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';


import SliderInput from './SliderInput';

class Settings extends Component {

// constructor(props){
//     super(props);
// }
        
render(props){

    const { values, image, renderCaman, setActiveInput, activeInput, addLayer } = this.props;

    //Disable the inputs if no image has been uploaded yet
    const isEnabled = (image ? false : true );

    return (
        <Fragment>
            
                <Paper>
                    <List>
                        <ListItem>
                            <Typography variant="button" color="inherit">Image Settings</Typography>
                        </ListItem>
                        <Divider variant="middle" />
                        <SliderInput 
                            name="brightness" 
                            label="Brightness" 
                            value={values.brightness} 
                            min={-100} 
                            max={100} 
                            step={1} 
                            updateSetting={this.props.updateSetting} 
                            disabled={isEnabled}
                            renderCaman={renderCaman}
                            setActiveInput={setActiveInput}
                            activeInput={activeInput}
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
                            renderCaman={renderCaman}
                            setActiveInput={setActiveInput}
                            activeInput={activeInput}
                        />                    
                        
                        <ListItem>
                            <Button disabled={isEnabled} onClick={this.props.resetSettings} variant="contained" color="secondary" fullWidth={true}>Reset Settings</Button>
                        </ListItem>

                        <ListItem>
                            <Button disabled={isEnabled} onClick={addLayer} variant="contained" color="primary" fullWidth={true}>Add Layer</Button>
                        </ListItem>

                    </List>                    
                </Paper>
                <br/>
                <Paper>
                    <List>
                        <ListItem>
                            <Typography variant="title" color="inherit">Trace Settings</Typography>
                        </ListItem>

                        <SliderInput 
                            name="turdsize" 
                            label="Turdsize" 
                            value={values.turdsize} 
                            min={-100} 
                            max={300} 
                            step={1} 
                            updateSetting={this.props.updateSetting} 
                            disabled={isEnabled}
                            renderCaman={renderCaman}
                            setActiveInput={setActiveInput}
                            activeInput={activeInput}
                        />                        
                        
                        <ListItem>
                            <Button disabled={isEnabled} onClick={this.props.resetSettings} variant="contained" color="secondary" fullWidth={true}>Reset Settings</Button>
                        </ListItem>



                    </List>                    
                </Paper>                
           
        </Fragment>
        );
    }

}

export default Settings;