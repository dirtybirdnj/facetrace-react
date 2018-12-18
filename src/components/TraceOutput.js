import React, { Component, Fragment } from 'react';


class TraceOutput extends Component {

    constructor(props){

        super(props);
        this.state = {
            width: 0,
            height: 0
        }

    }


    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        const img = this.refs.image


        img.onload = () => {
            console.log(img.height, img.width);
            this.setState({
                width: img.width,
                height: img.height
            });
            ctx.drawImage(img, 0, 0);
        }

    }

    render(){

    return(
        <Fragment>
            <canvas id="canvas" ref="canvas" width={this.state.width} height={this.state.height} />
            <img ref="image" style={{display: 'none' }} alt="user input" src={this.props.image}/>
        </Fragment>


    )

}

}

export default TraceOutput;