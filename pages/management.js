// Imports
import Head from 'next/head'
import Script from 'next/script';
import Link from 'next/link';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faKey,
} from "@fortawesome/free-solid-svg-icons";
const Station = require('../models/Station.js');
const Task = require('../models/Task.js');


// Components
import Navbar from './navbar.js';
import Footer from './footer.js';
//





const Management = (props) => {
    const [stationName, setStationName] = useState("");
    const [stationsDropDown, setStationsDropdown] = useState(props.data);
    const [selectedStation, setSelectedStation] = useState("");
    const [stationColor, setStationColor] = useState("");

    const [managerPassword, setManagerPassword] = useState("");

    const [taskTime, setTaskTime] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskRole, setTaskRole] = useState("");
    const [taskDropDown, setTaskDropDown] = useState([]);
    const [selectedTask, setSelectedTask] = useState("");



    async function handleAuthenticate() {

        console.log("executes authenticated");

        const results = await fetch('/api/checkManagerPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ managerPassword: managerPassword }),
        })

        const data = await results.json()
        console.log(data.displayContent)

        if (data.displayContent === "true") {
            $('#authentication').removeClass("d-block")
            $('#authentication').addClass("d-none")
            $('#management').removeClass("d-none")
            $('#management').addClass("d-block")
        }


    }


    async function handleCreateStation() {

        console.log("executes create station");

        const results = await fetch('/api/createStation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stationName: stationName, stationColor: stationColor }),
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

    async function handleDeleteStation() {
        const results = await fetch('/api/deleteStation', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stationId: selectedStation }),
        })

        const data = await results.json()
        console.log(data.message)
    }

    async function handleSelectStationToDeleteTask(e) {
        setSelectedStation(e.target.value);
        const results = await fetch(`/api/deleteTask?stationId=${e.target.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        })

        const data = await results.json()
        setTaskDropDown(data);
        console.log(data)
    }

    async function handleDeleteTask() {
        const results = await fetch('/api/deleteTask', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stationId: selectedStation, taskId: selectedTask }),
        })

        const data = await results.json()
        console.log(data.message)

        //delete task from dropdown
        const newTaskDropDown = taskDropDown.filter(task => task._id != selectedTask);
        setTaskDropDown(newTaskDropDown);
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
        console.log(selectedStation)
    }
    function handleChangeManagerPassword(e) {
        console.log("executes handleChange")
        setManagerPassword(e.target.value)
    }
    function handleChangeSelectedTask(e) {
        console.log("executes handleChange")
        setSelectedTask(e.target.value)
    }
    function handleChangeColor(e) {
        console.log("executes handleChange")
        setStationColor(e.target.value)
    }

    return (

        <>


            <Navbar />

            <Head>
                <title>Virtual Operations Stations</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossOrigin="anonymous" />
            </Head>

            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossOrigin="anonymous" strategy="lazyOnload" />

            <Script
                src="https://code.jquery.com/jquery-3.6.0.slim.min.js"
                integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI="
                crossorigin="anonymous" />

            <div className="container">
                <main className="text-center">

                    <div id="authentication" className='d-block'>
                        <h2 className="my-5">
                            Enter password to proceed
                        </h2>
                        <div className="input-group mb-4">
                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faKey} style={{ fontSize: "1.5em" }} /></span>
                            <input type="password" name="managerPassword" className="form-control p-3" placeholder="password" aria-label="managerPassword" aria-describedby="basic-addon1" onChange={handleChangeManagerPassword} />
                        </div>

                        <div className="d-grid gap-2 mb-5">
                            <button onClick={handleAuthenticate} className="btn btn-lg btn-login py-3" >Log In</button>
                        </div>
                    </div>

                    <div id="management" className='d-none'>

                        <h1 className="my-5">
                            Create new Station
                        </h1>

                        <div className="input-group mb-4">
                            <input type="text" name="stationName" className="form-control p-3" placeholder="Station Name" aria-label="name" aria-describedby="basic-addon1" onChange={handleChangeName} />

                        </div>
                        <label for="exampleColorInput" className="form-label d-flex mb-3">Pick a color
                        <input type="color" className="form-control form-control-color mx-3" id="exampleColorInput" title="Choose your color" onChange={handleChangeColor}/>
                        </label>

                        <div className="d-grid gap-2">
                            <button onClick={handleCreateStation} className="btn btn-lg btn-login py-3" >Create Station</button>
                        </div>

                        <h1 className="my-5">
                            Create new task
                        </h1>


                        <select id="station" className="form-control p-3 my-2" name="station" onChange={handleChangeSelectedStation}>
                            <option value={null}>Select station</option>
                            {stationsDropDown.map((station, index) => <option key={index} value={station.name}>{station.name}</option>)}
                        </select>

                        <select id="time" className="form-control p-3 my-2" name="time" onChange={handleChangeTime}>
                            <option value={null}>Select time</option>
                            <option value={"open-11am"}>open-11am</option>
                            <option value={"11am-2pm"}>11am-2pm</option>
                            <option value={"2pm-4pm"}>2pm-4pm</option>
                            <option value={"4pm-close"}>4pm-close</option>
                            <option value={"Unset"}>Unset/Routine</option>
                        </select>

                        <select id="role" className="form-control p-3 my-2" name="role" onChange={handleChangeRole}>
                            <option value={null}>Select role</option>
                            <option value={"Customer Support"}>Customer Support</option>
                            <option value={"Planted"}>Planted</option>
                            <option value={"Order Support"}>Order Support</option>
                            <option value={"Teamwork"}>Teamwork</option>
                            <option value={"Play Caller"}>Play Caller</option>
                        </select>

                        <input type="text" name="description" className="form-control p-3 my-2" placeholder="Description" aria-label="name" aria-describedby="basic-addon1" onChange={handleChangeDescription} />

                        <div className="d-grid gap-2">
                            <button onClick={handleCreateTask} className="btn btn-lg btn-login py-3" >Create task</button>
                        </div>


                        <h1 className="my-5">
                            Delete station
                        </h1>

                        <select id="station" className="form-control p-3 my-2" name="station" onChange={handleChangeSelectedStation}>
                            <option value={null}>Select station</option>
                            {stationsDropDown.map((station, index) => <option key={index} value={station._id}>{station.name}</option>)}
                        </select>
                        <div className="d-grid gap-2">
                            <button onClick={handleDeleteStation} className="btn btn-lg btn-login py-3" >Delete station</button>
                        </div>

                        <h1 className="my-5">
                            Delete task
                        </h1>

                        <select id="station" className="form-control p-3 my-2" name="station" onChange={handleSelectStationToDeleteTask}>
                            <option value={null}>Select station</option>
                            {stationsDropDown.map((station, index) => <option key={index} value={station._id}>{station.name}</option>)}
                        </select>
                        <select id="station" className="form-control p-3 my-2" name="station" onChange={handleChangeSelectedTask}>
                            <option value={null}>Select Task</option>
                            {taskDropDown && taskDropDown.map((task, index) => <option key={index} value={task._id}>{task.description}</option>)}
                        </select>

                        <div className="d-grid gap-2">
                            <button onClick={handleDeleteTask} className="btn btn-lg btn-login py-3" >Delete task</button>
                        </div>
                    </div>

                </main>

            </div>
            <Footer />
        </>
    )

}


export async function getStaticProps() {
    const connection = await require('../mongodb/connection.js');

    const stations = await Station.find().populate('tasks');

    let data = JSON.stringify(stations);


    return {
        props: {
            data: JSON.parse(data),
        },
    };

}


export default Management;







