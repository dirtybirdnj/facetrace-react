import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';



class Layers extends Component {
render(){

    return (
        <Fragment>
            
                <Paper>
                    
                    
                    
                    <List>
                        <ListItem>
                            <Typography variant="title" color="inherit">Layers</Typography>
                        </ListItem>
                        <Divider variant="middle" />
                        { this.props.layers.map((layer) => {
                        
                            return(
                                <ListItem key={layer.label}>
                                    <Typography variant="body1" color="inherit">{layer.label}</Typography>
                                </ListItem>
                            );

                        })}
                                             
                        <Divider variant="middle" />
                        <ListItem>
                            <Button onClick={this.props.clearLayers} variant="contained" color="secondary" fullWidth={true}>Clear All</Button>
                        </ListItem>
                    </List>                    
                </Paper>
        
        </Fragment>

        );
    }

}

export default Layers;