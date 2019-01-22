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

        let elemWidth = img.width;
        let elemHeight = img.height;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientWidth;

        //console.log('container dimensions', container, containerWidth, containerHeight);

        // if(img.width > containerWidth){
        //     elemWidth = containerWidth;
        // }

        img.onload = () => {
            console.log('loaded image dimensions', img.width, img.height);
            this.setState({
                width: img.width,
                height: img.height
            });
        }

    }    

    render(){

        const { image, activeLayer, highlightLayer, layers, handleNewImage } = this.props;

        return (
            <Fragment>
                
                    <Paper align="center" id="workspaceContainer" ref="workspaceContainer">
                        <br/>
                        {!image ? (
                            <Fragment>
                                <input
                                style={{display: 'none'}}
                                accept="image/*"
                                id="contained-button-file"
                                type="file"
                                onChange={handleNewImage}
                                />
                                <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span">
                                    Select an Image
                                </Button>
                                </label>
                                <br/>
                                <br/>
                            </Fragment>                        
                        ) : (
                            <Fragment>
            
                                <canvas id="caman" ref="caman" style={{ display: 'none'}} width={this.state.width} height={this.state.height} />
                                <img ref="image" id="image" alt="user input" style={{ display: 'none'}} src={image} />
                                <div 
                                    id="svgWrapper" 
                                    style={{ 
                                        background: `url("${image}")`,
                                        'backgroundRepeat': 'no-repeat',
                                        'backgroundPosition': 'top center',
                                        'textAlign': 'center'
                                    }} 
                                    width="100%" 
                                    height="100%"
                                >
                                    
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        id="svgOutput" 
                                        ref="svgOutput" 
                                        width={this.state.width} 
                                        height={this.state.height}
                                    >
                                        
                                        <path d={activeLayer} stroke="#FF0000" strokeWidth="1" fill="none"/>
                                        {layers.map((layer) => { 
                                        
                                            const layerColor = (layer.id === highlightLayer ? '#00FF00' : '#000000');
                                            return <path key={layer.id} d={layer.path} stroke={layerColor} strokeWidth="1" fill="none"/> 
                                            
                                        })}
                                        
                                    </svg>

                                </div>
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