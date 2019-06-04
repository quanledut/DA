import React from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles'

const styles = {
  root: {
    height:30,
    margin: 10
  }
}

class MaterialStepper extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <Stepper className = {classes.root}  activeStep={this.props.activeStep}>
        {this.props.data.map((step, index) => {
          const label = step.label;
          const props = {};
          const labelProps = {};
          labelProps.optional = <Typography variant="caption">{step.optional}</Typography>;
          props.completed = (index < this.props.activeStep);
          return (
            <Step key={label} {...props}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    );
  }
}

MaterialStepper.propTypes = {
  classes: PropTypes.object,
  activeStep: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired
};

export default withStyles(styles)(MaterialStepper);