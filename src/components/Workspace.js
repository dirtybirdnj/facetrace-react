import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


class Workspace extends Component {

    constructor(props){

        super(props);
        this.state = {
            width: 0,
            height: 0
        }

    }

    componentDidUpdate() {

        const img = this.refs.image;
        const container = ReactDOM.findDOMNode(this.refs.workspaceContainer);

        let elemWidth = img.width;
        let elemHeight = img.height;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientWidth;

        console.log('container dimensions', container, containerWidth, containerHeight);

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

        const { image, activeLayer, layers } = this.props;

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
                                onChange={this.props.handleNewImage}
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
                                        'background-repeat': 'no-repeat',
                                        'background-position': 'center center',
                                        'text-align': 'center'
                                    }} 
                                    width="100%" 
                                    height="100%"
                                >
                                    
                                    <svg style={{border: '1px solid black'}} width={this.state.width} height={this.state.height}>
                                        
                                        <path d={activeLayer} stroke="#FF0000" strokeWidth="1" fill="none"/>
                                        {layers.map((layer) => { return <path key={layer.id} d={layer.path} stroke="#000000" strokeWidth="1" fill="none"/> })}
                                        
                                    </svg>

                                </div>
                
                            </Fragment>
                        )}
                        
                    </Paper>
                
            </Fragment>
            );
    }

}

export default Workspace;