import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Form, Button } from "react-bootstrap";
import Map from "./img/Map.png"
import rideData from "../../data/mockData.json"
import RideDetail from "../RideDetail/RideDetail";


const Destination = () => {
    const [searched, setSearched] = useState(false);
    const { rideType } = useParams();
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
        {searched ? <RideDetail></RideDetail> :
        <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Pick From</Form.Label>
              <Form.Control type="email" placeholder="Mirpur 1" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Pick To</Form.Label>
              <Form.Control type="password" placeholder="Banani" />
            </Form.Group>
        </Form>
        }

        <Button onClick={() => setSearched(!searched)}className="Submit-Button" variant="success">
          Search
        </Button>
        </div>
        <div className="col-md-9">
            <img className="img-fluid" src={Map} alt=""/>
        </div>
      </div>
    </div>
  );
};

export default Destination;
