import React, { useEffect, useState } from 'react';
import "./Home.css"
import rideData from "../../data/mockData.json"
import Rides from '../Rides/Rides';

const Home = () => {
    const [ride, setRide] = useState([]);
    useEffect(() => {
        setRide(rideData);
    }, [])
    return (
        <div className="home">
            <div className="container">
                <div className="row">
                    {
                        ride.map(ride => <Rides key={ride.rideType} ride={ride}></Rides>)
                    }
                </div>

            </div>
        </div>
    );
};

export default Home;