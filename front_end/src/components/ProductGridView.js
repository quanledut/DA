import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {GridList, GridTile, IconButton, Dialog, FlatButton} from 'material-ui';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';


export class ProductGridView extends Component {
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
                            <IconButton>
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
    return (
      <div>
        {imageListContent}
      </div>
    )
  }
}

ProductGridView.propTypes = {
    images: PropTypes.array.isRequired
}

export default ProductGridView
