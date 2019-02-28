import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import FileSaver from 'file-saver';

class Layers extends Component {
    
saveSVG(){

    const rawSVG = this.refs.svgOutput;
    const XMLS = new XMLSerializer();
    const svgString = XMLS.serializeToString(rawSVG);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    FileSaver.saveAs(blob, 'facetrace.svg');

}      

render(){

    const { image, removeLayer, highlightLayer, handleNewImage, saveSVG } = this.props;

    //Disable the inputs if no image has been uploaded yet
    const isEnabled = (image ? false : true );    

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
                            <Button disabled={isEnabled} onClick={this.props.addLayer} variant="contained" color="primary" fullWidth={true}>Add Layer</Button>
                        </ListItem>                        
                        <ListItem>
                            <Button disabled={isEnabled} onClick={this.props.clearLayers} variant="contained" color="secondary" fullWidth={true}>Clear All</Button>
                        </ListItem>
                    </List>                    
                </Paper>
                
                <br/>
                
                <Paper>
                    
                    <List>
                        <ListItem>
                            <Typography variant="title" color="inherit">Image</Typography>
                        </ListItem>
                                             
                        <Divider variant="middle" />

                        {!image ? (<ListItem>
                            <input style={{display: 'none'}} accept="image/*" id="contained-button-file" type="file" onChange={handleNewImage} />
                            <label style={{ width: '100%' }} htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" fullWidth={true}>
                                Select an Image
                            </Button>
                            </label>
                        </ListItem> ) : '' }
                    
                        <ListItem>
                            <Button disabled={isEnabled} onClick={saveSVG} variant="contained" color="secondary" fullWidth={true}>Download SVG</Button>
                        </ListItem>
                    </List>                    
                </Paper>                
        
        </Fragment>

        );
    }

}

export default Layers;