import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';


import SliderInput from './SliderInput';

class Settings extends Component {

        
render(props){

    return (
        <Fragment>
            
                <Paper>
                    <List>
                        <ListItem>
                            <Typography variant="title" color="inherit">Settings</Typography>
                        </ListItem>
                        <SliderInput name="brightness" label="Brightness" min={-100} max={100} step={10} />

                        <SliderInput name="contrast" label="Contrast" min={-10} max={10} step={1} />
                        <Divider variant="middle" />
                        <ListItem></ListItem>
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