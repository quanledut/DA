import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {GridList, GridTile, IconButton, Dialog, FlatButton} from 'material-ui';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';


export class ProductGridView extends Component {
    state = {
        isShowDialog: false,
        currentImage: ''
    }
    handelOpen = (img) => {
        this.setState({
            isShowDialog: true,
            currentImage: img.largeImageURL
        })
    }
    handleClose = () => {
        this.setState({
            isShowDialog: false
        })
    }
  render() {
      let imageListContent;
      const {images, cols} = this.props;
      if(images){
          imageListContent = (
              <GridList cols = {cols}>
                {images.map(image =>(
                    <GridTile
                        title = {image.tags}
                        key = {image.id}
                        subtitle = {
                            <span>
                                by <strong>{image.user}</strong>
                            </span>
                        }
                        actionIcon = {
                            <IconButton onClick = {() => this.handelOpen(image)}>
                                <ZoomIn/>
                            </IconButton>
                        }
                    >
                        <img style = {{width: '100%'}} src = {image.largeImageURL} alt = ''/>
                    </GridTile>
                ))}
              </GridList>
          )
      }
      else imageListContent = null;
      const actions = [
        <FlatButton onClick = {this.handleClose} primary = {true}>Close</FlatButton>
      ]
    return (
      <div>
        {imageListContent}
        <Dialog
            style = {{position: 'static', width: '100%', height: '100%'}}

            actions = {actions}
            modal = {false}
            open = {this.state.isShowDialog}
            onRequestClose = {this.handleClose}
        >
        <img src = {this.state.currentImage} alt = ''/>
        </Dialog>
      </div>
    )
  }
}

ProductGridView.propTypes = {
    images: PropTypes.array.isRequired
}

export default ProductGridView
