import React, { Component, Fragment } from 'react';


class TraceOutput extends Component {

    constructor(props){

        super(props);
        this.state = {
            width: 0,
            height: 0
        }

    }


    // componentDidMount() {
    //     const canvas = this.refs.canvas
    //     const ctx = canvas.getContext("2d")
    //     const img = this.refs.image


    //     img.onload = () => {
    //         console.log('loaded image dimensions', img.height, img.width);
    //         this.setState({
    //             width: img.width,
    //             height: img.height
    //         });
    //         ctx.drawImage(img, 0, 0);
    //     }

    // }

    render(){

    const { activeLayer } = this.props;

    return(
        <Fragment>
            
            <canvas id="caman" ref="caman" width={this.state.width} height={this.state.height} />
            <img ref="image" id="image" alt="user input" style={{ display: 'none'}} src={this.props.image} />
            <svg>
                
                <path d={activeLayer} stroke="#FF0000" strokeWidth="1" fill="none"/>
                
            </svg>

        </Fragment>


    )

}

}

export default TraceOutput;