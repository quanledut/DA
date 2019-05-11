import React from 'react'
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.css';

export const CarouselPage = (props) => {
    let { images } = props;
    return (
        <MDBContainer>
            <MDBCarousel
                activeItem={props.active}
                length={3}
                showControls={true}
                showIndicators={false}
                className="z-depth-1"
            >
                <MDBCarouselInner style={{ height: 500, overflowY: 'hidden' }}>
                    <MDBCarouselItem itemId={1}>
                        <MDBView>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflowY: 'hidden' }}>
                                <img
                                    style={{ height: '100%' }}
                                    className="d-block w-100"
                                    src={`data:image/png; base64,${images[0]}`}
                                    alt="First slide"
                                />
                            </div>
                        </MDBView>
                    </MDBCarouselItem>
                    {images[1] ?
                        <MDBCarouselItem itemId={2}>
                            <MDBView>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflowY: 'hidden' }}>
                                    <img
                                        style={{ height: '100%' }}
                                        className="d-block w-100"
                                        src={`data:image/png; base64,${images[1]}`}
                                        alt="Second slide"
                                    />
                                </div>
                            </MDBView>

                        </MDBCarouselItem>
                        : <ul></ul>}
                    {images[2] ?
                        <MDBCarouselItem itemId={3}>
                            <MDBView>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflowY: 'hidden' }}>
                                    <img
                                        style={{ height: '100%' }}
                                        className="d-block w-100"
                                        src={`data:image/png; base64,${images[2]}`}
                                        alt="Thirst slide"
                                    />
                                </div>
                            </MDBView>
                        </MDBCarouselItem>
                        : <ul></ul>}
                    {images[3] ?
                        <MDBCarouselItem itemId={4}>
                            <MDBView>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflowY: 'hidden' }}>
                                    <img
                                        style={{ height: '100%' }}
                                        className="d-block w-100"
                                        src={`data:image/png; base64,${images[3]}`}
                                        alt="Four slide"
                                    />
                                </div>
                            </MDBView>
                        </MDBCarouselItem>
                        : <ul></ul>}
                    <MDBCarouselItem itemId="5">
                        <MDBView>
                            <img
                                className="d-block w-100"
                                src="https://mdbootstrap.com/img/Photos/Slides/img%20(33).jpg"
                                alt="Second slide"
                            />
                        </MDBView>
                    </MDBCarouselItem>
                </MDBCarouselInner>
            </MDBCarousel>
        </MDBContainer>
    );
}
