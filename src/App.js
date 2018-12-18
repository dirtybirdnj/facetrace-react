import React, { Component, Fragment } from 'react';

import 'typeface-roboto';
import './App.css';

import Grid from '@material-ui/core/Grid';

import NavBar from './components/NavBar'

import Settings from './components/Settings';
import Layers from './components/Layers';
import Workspace from './components/Workspace';

class App extends Component {

  constructor(props){

    super(props);
    this.state = {

      settings: {
        brightness: 0,
        contrast: 0,
      },
      image: null,
      layers: []

    }

    this.addLayer = this.addLayer.bind(this);
    this.clearLayers = this.clearLayers.bind(this);
    this.handleNewImage = this.handleNewImage.bind(this);
    this.updateSetting = this.updateSetting.bind(this);
    this.resetSettings = this.resetSettings.bind(this);

  }

  addLayer(){

      const { layers, settings } = this.state;
 
      const newLayer = {
        label:  'Layer ' + (layers.length + 1),
        settings: settings
      }

      this.setState({ layers: [ ...layers, newLayer ]});

  }

  clearLayers(){

    this.setState({ layers: [] })

  }

  updateSetting(name, value){

    console.log('app.js',name, value);
    this.setState({  ...this.state,
      settings: { ...this.state.settings, [name] : value }})

      // let canvas = document.getElementById('canvas');
      // Caman('#canvas', () => {

      //   this.replaceCanvas(canvas);
      //   this.brightness(this.state.brightness)
      //   .contrast(this.state.contrast)
      //   .render();


      // })

  }

  resetSettings(){

    this.setState({
           
      settings: {
        brightness: 0,
        contrast: 0,
      }
    })

    console.log(this.state);

  }


  handleNewImage(event){

    const file = event.target.files[0];
    const imgSrc = window.URL.createObjectURL(file);
    this.setState({ image: imgSrc });

  }


  render() {

    return (

        <Fragment>
          <NavBar/>

          <Grid justify="center" container spacing={16} style={{padding: 24}}>
            <Grid item xs={12} md={2} padding={10}>
                  <Settings values={this.state.settings} image={this.state.image} addLayer={this.addLayer} updateSetting={this.updateSetting} resetSettings={this.resetSettings}/>
            </Grid>
            <Grid item xs={12} md={8}>
                  <Workspace image={this.state.image} handleNewImage={this.handleNewImage}/>
            </Grid>
            <Grid item xs={12} md={2}>
                  <Layers layers={this.state.layers} clearLayers={this.clearLayers}/>
            </Grid>                                        
          
          </Grid>
        </Fragment>
    );
  }
}

export default App;
