// Imports
import Head from 'next/head'
import Script from 'next/script';
import Link from 'next/link';
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faKey,
    faUserLarge,
} from "@fortawesome/free-solid-svg-icons";
import fetch from 'isomorphic-unfetch'
const Station = require('../models/Station.js');

// Components
import Navbar from './navbar.js';
//


let data = {}

const Management = (props) => {
    const [stationName, setStationName] = useState("");
    const [stationsDropDown, setStationsDropdown] = useState(props.data);
    const [selectedStation, setSelectedStation] = useState("");

    const [taskTime, setTaskTime] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskRole, setTaskRole] = useState("");






    async function handleCreateStation() {

        console.log("executes create station");

        const results = await fetch('/api/createStation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stationName: stationName }),
        })

        const data = await results.json()
        console.log(data)
        setStationsDropdown([...stationsDropDown, data]);

    }

    async function handleCreateTask() {
        const results = await fetch('/api/createTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stationName: selectedStation, taskTime: taskTime, taskDescription: taskDescription, taskRole: taskRole }),
        })

        const data = await results.json()
        console.log(data)
        

    }

    function handleChangeName(e) {
        console.log("executes handleChange")
        setStationName(e.target.value)
    }
    function handleChangeDescription(e) {
        console.log("executes handleChange")
        setTaskDescription(e.target.value)
    }
    function handleChangeTime(e) {
        console.log("executes handleChange")
        setTaskTime(e.target.value)
    }
    function handleChangeRole(e) {
        console.log("executes handleChange")
        setTaskRole(e.target.value)
    }
    function handleChangeSelectedStation(e) {
        console.log("executes handleChange")
        setSelectedStation(e.target.value)
    }

    return (

        <>


            <Navbar />

            <Head>
                <title>Virtual Operations Stations</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossOrigin="anonymous" />
            </Head>

            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossOrigin="anonymous" strategy="lazyOnload" />

            <div className="container">
                <main className="text-center">

                    <h1 className="my-5">
                        Create new Station
                    </h1>

                    <div className="input-group mb-4">
                        <input type="text" name="stationName" className="form-control p-3" placeholder="Station Name" aria-label="name" aria-describedby="basic-addon1" onChange={handleChangeName} />
                    </div>

                    <div className="d-grid gap-2">
                        <button onClick={handleCreateStation} className="btn btn-lg btn-login py-3" >Create Station</button>
                    </div>

                    <h1 className="my-5">
                        Create new task
                    </h1>

                    
                    <select id="station" className="form-control p-3 m-2" name="station" onChange={handleChangeSelectedStation}>
                        <option value={stationName}>Select station</option>
                        {stationsDropDown.map((station, index) => <option key={index} value={station.name}>{station.name}</option>)}
                    </select>
                    
                    <select id="time" className="form-control p-3 m-2" name="time" onChange={handleChangeTime}>
                        <option value={null}>Select time</option>
                        <option value={"open-11am"}>open-11am</option>
                        <option value={"11am-2pm"}>11am-2pm</option>
                        <option value={"2pm-4pm"}>2pm-4pm</option>
                        <option value={"4pm-close"}>4pm-close</option>
                    </select>

                    <select id="role" className="form-control p-3 m-2" name="role" onChange={handleChangeRole}>
                        <option value={null}>Select role</option>
                        <option value={"Customer Support"}>Customer Support</option>
                        <option value={"Planted"}>Planted</option>
                        <option value={"Order Support"}>Order Support</option>
                        <option value={"Teamwork"}>Teamwork</option>
                        <option value={"Play Caller"}>Play Caller</option>
                    </select>
                    
                    <input type="text" name="description" className="form-control p-3 m-2" placeholder="Description" aria-label="name" aria-describedby="basic-addon1" onChange={handleChangeDescription} />



                    <div className="d-grid gap-2">

                        <button onClick={handleCreateTask} className="btn btn-lg btn-login py-3" >Create task</button>

                    </div>


                </main>

            </div>
        </>
    )

}


export async function getStaticProps() {
    const connection = await require('../mongodb/connection.js');

    const stations = await Station.find();

    data = JSON.stringify(stations);


    return {
        props: {
            data: JSON.parse(data),
        },
    };
    
}


export default Management;







