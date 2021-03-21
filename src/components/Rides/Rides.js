import React from 'react';
import {Card, Col } from "react-bootstrap";
import { useHistory } from 'react-router';
import './Ride.css'

const Rides = (props) => {
    const {title, img, rideType} = props.ride;
    const history = useHistory();
    const exploreRide = () => {
      history.push(`/destination/${rideType}`);
    }
    return (
        <Col md={3} sm={1}>
        <Card onClick={exploreRide} className='card-style text-center'>
          <Card.Body>
            <Card.Img  className="img-fluid" variant="top" src={img} /> 
            <Card.Title className='card-title'>{title}</Card.Title>
          </Card.Body>
        </Card>
        </Col>
    );
};

export default Rides;