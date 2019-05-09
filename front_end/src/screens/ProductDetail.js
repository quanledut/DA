import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { Button, Grid, Paper, Typography, GridListTile } from '@material-ui/core'
import { red, blue, green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles'
import { GridList } from 'material-ui';
import { Carousel } from 'react-responsive-carousel';
require('react-responsive-carousel/lib/styles/carousel.min.css');

const styles = (theme) => ({
  image: {

  }
})


export class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  render() {
    const { classes, product } = this.props;

    const showFullImage = (
      <Carousel style = {{width: 500}}
      infiniteLoop
      autoPlay
      showThumbs={false}
      interval={2000}
      stopOnHover
      showStatus={false}
      //swipeable = {true}
      emulateTouch = {true}
      centerMode = {true}
      >
      {this.props.product.images.map(image => (
        <div style = {{width:500, backgroundColor: '#fafafa'}}>
          <img src = {`data:image/png; base64,${image}`}/>
        </div>
      ))}
  </Carousel>
    )

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Grid container spacing={16}>
            <Grid item xs={4}>
              <img style={{ width: '100%' }} className={classes.subImage} src={`data:image/png; base64,${product.subImage}`} />
              {/* <GridList cols = {3}>
                {product.images.map(image => (
                  <GridListTile>
                    <img src = {`data:image/png; base64,${image}`}/>
                  </GridListTile>
                ))}
              </GridList> */}
            </Grid>
            <Grid item container xs={8} backgroundColor='#ffffff' direction='column'>     
            <Typography variant='h3'>{product.name}</Typography>
            </Grid>
            <Grid item xs = {8}>
            {showFullImage}
            </Grid>
          </Grid>
        {/*  */}


      </div>
    )
  }
}

const mapState2Props = (state) => {
  return {
    product: state.ProductReducer.product
  }
}

const mapDispatch2Props = (dispatch) => {
  return {

  }
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(withStyles(styles)(ProductDetail)))