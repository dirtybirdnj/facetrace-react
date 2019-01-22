import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

class Layers extends Component {

render(){

    const { removeLayer, highlightLayer } = this.props;

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
                                <ListItem key={layer.label} className="layerRow"
                                onMouseEnter={() => { highlightLayer(layer.id) }}
                                onMouseLeave={() => { highlightLayer() }}
                                >
                                    
                                    <Typography className="layerLabel" variant="subtitle1" color="inherit" inline="true" component="span">{layer.label}</Typography>
                                    
                                    <Button 
                                        className="layerRemove" 
                                        variant="outlined" 
                                        color="secondary" 
                                        size="small"
                                        onClick={() => { removeLayer(layer.id) }}
                                    >
                                        Remove
                                    </Button>                                    
                                    
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