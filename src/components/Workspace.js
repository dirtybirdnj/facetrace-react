import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import FileSaver from 'file-saver';

class Workspace extends Component {

    constructor(props){

        super(props);
        this.state = {
            width: 0,
            height: 0
        }

        this.saveSVG = this.saveSVG.bind(this);
    }

    saveSVG(){

        const rawSVG = this.refs.svgOutput;
        const XMLS = new XMLSerializer();
        const svgString = XMLS.serializeToString(rawSVG);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        FileSaver.saveAs(blob, 'facetrace.svg');
    
    }    

    componentDidUpdate() {

        const img = this.refs.image;
        const container = ReactDOM.findDOMNode(this.refs.workspaceContainer);

        img.onload = () => {
            console.log('loaded image dimensions', img.width, img.height);
            this.setState({
                width: img.width,
                height: img.height,
                containerWidth: (container.clientWidth - 15),
                containerHeight: (container.clientHeight - 15)
            });
        }

    }    

    render(){

        const { image, activeLayer, highlightLayer, layers } = this.props;

        return (
            <Fragment>
                
                    <Paper align="center" id="workspaceContainer" ref="workspaceContainer">
                        {!image ? (
                            <Fragment>
                                <br/>
                                <p>Button Used to Be here. Please choose an image</p>
                                <br/>
                                <br/>
                            </Fragment>                        
                        ) : (
                            <Fragment>
            
                                <img ref="image" id="image" alt="user input" style={{ display: 'none'}} src={image} />
                                <canvas id="caman" ref="caman" style={{                                        
                                    width: this.state.containerWidth,
                                    height: this.state.containerHeight,
                                    marginTop: '10px'
                                }} 
                                />                                                             
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    id="svgOutput" 
                                    ref="svgOutput"
                                    viewBox={'0 0 ' + this.state.width + ' ' + this.state.height}                                    
                                    style={{ 
                                        position: 'relative',
                                        top:  `-${this.state.containerHeight}px`,
                                        width: this.state.containerWidth,
                                        height: this.state.containerHeight,
                                    }} 
                                >
                                    
                                    <path d={activeLayer} stroke="#FF0000" strokeWidth="1" fill="none"/>
                                    {layers.map((layer) => { 
                                        const layerColor = (layer.id === highlightLayer ? '#00FF00' : '#000000');
                                        return <path key={layer.id} d={layer.path} stroke={layerColor} strokeWidth="1" fill="none"/> 
                                    })}
                                    
                                </svg>

                                <br/>
                                <Button variant="contained" color="primary" component="span" onClick={this.saveSVG}>
                                    Save SVG
                                </Button>
                                <br/>
                                <br/>
                
                            </Fragment>
                        )}
                        
                    </Paper>
                
            </Fragment>
            );
    }

}

export default Workspace;