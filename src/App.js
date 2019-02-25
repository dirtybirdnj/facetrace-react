import React, { Component, Fragment } from 'react';

import 'typeface-roboto';
import './App.css';

import Grid from '@material-ui/core/Grid';

import NavBar from './components/NavBar'

import Settings from './components/Settings';
import Layers from './components/Layers';
import Workspace from './components/Workspace';

const Caman = window.Caman;
const Potrace = window.Potrace;

class App extends Component {

  constructor(props){

    super(props);
    this.state = {

      settings: {
        brightness: 0,
        contrast: 0,
        turdsize: 2
      },
      activeInput: null,
      image: null,
      layers: [],
      activeLayer: null,
      highlightLayer: null

    }

    this.addLayer = this.addLayer.bind(this);
    this.clearLayers = this.clearLayers.bind(this);
    this.handleNewImage = this.handleNewImage.bind(this);
    this.updateSetting = this.updateSetting.bind(this);
    this.resetSettings = this.resetSettings.bind(this);
    this.renderCaman = this.renderCaman.bind(this);
    this.traceImage = this.traceImage.bind(this);
    this.removeLayer = this.removeLayer.bind(this);
    this.highlightLayer = this.highlightLayer.bind(this);
    this.setActiveInput = this.setActiveInput.bind(this);    

  }

  addLayer(){

      const { layers, settings, activeLayer } = this.state;
 
      const newLayer = {
        id: 'layer' + (layers.length + 1),
        label:  'Layer ' + (layers.length + 1),
        settings: settings,
        path: activeLayer
      }

      this.setState({ layers: [ ...layers, newLayer ]});
      this.setState({ activeLayer: null});

  }

  removeLayer(layerID){

    const { layers } = this.state;
    const newLayers = layers.filter((item) => { return item.id != layerID });
    this.setState({ layers: newLayers});

  }

  highlightLayer(layerID = null){

    this.setState({ highlightLayer: layerID });

  }  

  clearLayers(){

    this.setState({ ...this.state, layers: [], activeLayer : null })

  }

  updateSetting(name, value){

    this.setState({  
      ...this.state,
      settings: { ...this.state.settings, [name] : value }
    });

  }

  resetSettings(){

    this.setState({
           
      settings: {
        brightness: 0,
        contrast: 0,
      }
    }, () => { this.renderCaman(false); });

  }

  setActiveInput(name){

      this.setState({
        activeInput: name
      })

  }

  handleNewImage(event){

    const file = event.target.files[0];
    const imgSrc = window.URL.createObjectURL(file);
    this.setState({ image: imgSrc }, () => { this.renderCaman(); });

  }  

  //Set trace to true/false to trigger potrace
  renderCaman(trace = true){

    const { brightness, contrast } = this.state.settings;

    const sourceImage = this.state.image;
    const canvas = document.getElementById('caman');

    //Scope, oy vey!
    const traceImage = this.traceImage

    Caman('#caman', sourceImage, function() {

      //this.replaceCanvas(canvas);
      this.revert(canvas); //THIS IS IT YES
      this.brightness(brightness);
      this.contrast(contrast);
      this.render(function(){

        //Allow some operations to trigger trace, some to avoid
        if(trace){ 
          traceImage(this.toBase64());
        }

      });


    })

  }

  traceImage(base64ImageData){

    const { turdsize } = this.state.settings;
    const potraceSettings = {
      turdsize: turdsize
    }


    Potrace.loadImageFromUrl(base64ImageData);
    Potrace.setParameter(potraceSettings);
    Potrace.process((potraceSettings) => {

        const rawSVG = Potrace.getSVG(1,"curve");
        const parser = new DOMParser();
        const doc = parser.parseFromString(rawSVG, "image/svg+xml");
        const root = doc.firstChild;
        const pathElement = root.firstChild;
        const path = pathElement.getAttribute('d');
        this.setState({ activeLayer: path})

    })
    
  }

  render() {

    return (

        <Fragment>

          <NavBar/>

          <Grid justify="center" container spacing={16} style={{padding: 24, height: '90%'}}>
            
            <Grid item xs={12} md={2} padding={10}>
                  <Settings 
                    values={this.state.settings} 
                    image={this.state.image} 
                    addLayer={this.addLayer} 
                    updateSetting={this.updateSetting} 
                    renderCaman={this.renderCaman}
                    resetSettings={this.resetSettings}
                    setActiveInput={this.setActiveInput}
                    activeInput={this.state.activeInput}
                    />
            </Grid>

            <Grid item xs={12} md={8} style={{height: '100%'}}>
                  <Workspace 
                    image={this.state.image}
                    activeLayer={this.state.activeLayer}
                    highlightLayer={this.state.highlightLayer}
                    layers={this.state.layers} 
                  />
            </Grid>

            <Grid item xs={12} md={2}>
                  <Layers 
                    image={this.state.image}
                    layers={this.state.layers} 
                    clearLayers={this.clearLayers}
                    removeLayer={this.removeLayer}
                    highlightLayer={this.highlightLayer}
                    handleNewImage={this.handleNewImage}
                  />
            </Grid>                                        
          
          </Grid>

        </Fragment>
    );

  }

}

export default App;
