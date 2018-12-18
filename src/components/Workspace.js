import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import TraceOutput from './TraceOutput';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class Workspace extends Component {
render(){

    const { classes } = this.props;

    return (
        <Fragment>
            
                <Paper align="center" id="workspaceContainer">
                    <br/>
                    <Typography variant="title" color="inherit">Workspace</Typography>
                    <br/>
                    {!this.props.image ? (
                        <Fragment>
                            <input
                            className={classes.input}
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
                        <TraceOutput image={this.props.image}/>
                    )}
                    
                </Paper>
            
        </Fragment>
        );
    }

}

export default withStyles(styles)(Workspace);