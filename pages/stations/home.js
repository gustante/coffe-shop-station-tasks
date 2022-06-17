// Imports
import Head from 'next/head'
import Script from 'next/script';
import Link from 'next/link';
import { useState } from "react";
import clientPromise from "../../mongodb/mongodb";

// Components
import Navbar from '../navbar.js';
import Footer from '../footer.js';
import Login from '../login.js';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMugHot,
    faSoap,
    faTemperatureHalf,
    faFireFlameCurved,
    faWhiskeyGlass,
    faCookie,
    faDoorClosed,
    faBlender,
    faPeopleGroup,
    faMobile,
    faMobileScreen,
    faSprayCanSparkles,
    faShoePrints,
    faComments,
    faListCheck,
    faClipboard,
    faClock,
    faGlassWaterDroplet,
    faArrowLeft,
    faClockRotateLeft,
    faPerson,
    faClipboardUser,
    faArrowRotateRight

} from "@fortawesome/free-solid-svg-icons";

import {

    faSquareCheck,
    faSquare,

} from "@fortawesome/free-regular-svg-icons";
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';


//


const Home = (props) => {
    const [stations, setStations] = useState(props.data);
    const [time, setTime] = useState(props.timeNow);
    const [partnerName, setPartnerName] = useState(props.partnerName);


    const StoreWalk = stations.find(station => station.name == "Store Walk");
    const PlayCaller = stations.find(station => station.name == "Play Caller");
    const QuickConnect = stations.find(station => station.name == "Quick Connect");
    const BackOfHouse = stations.find(station => station.name == "Back of House");
    const Expresso = stations.find(station => station.name == "Expresso");
    const ColdBeverage = stations.find(station => station.name == "Cold Beverage");
    const Draft = stations.find(station => station.name == "Draft");
    const MOP = stations.find(station => station.name == "Mobile Order & Pay");
    const Brewing = stations.find(station => station.name == "Brewing");
    const Warming = stations.find(station => station.name == "Warming");
    const FoodCase = stations.find(station => station.name == "Food Case");
    const CycleTaskList = stations.find(station => station.name == "Cycle Task List");
    const CustomerArea = stations.find(station => station.name == "Customer Area");
    const DishWashing = stations.find(station => station.name == "Dishwashing");
    const ReadySetGo = stations.find(station => station.name == "Ready-Set-Go");


    async function handleChangeTime(e) {
        console.log(e.target.value);
        setTime(e.target.value)
        updateCheckedTasks()
    }

    async function updateCheckedTasks() {


        const results = await fetch('/api/updateStations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        })


        const data = await results.json()
        //update stations with updates from server
        console.log(data.stations)
        setStations(data.stations);
        // initialize popovers
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl, '.popover-dismiss', {
            trigger: 'focus'
        }))

    }

    async function handleCheckTask(e) {
        let wasChecked = $(`.${e.target.value}`).attr('data-ischecked');
        let taskDescription = $(`.${e.target.value}`).attr('data-taskdescription');

        let changeTo;
        if (wasChecked == "false") {
            changeTo = true;
        } else if (wasChecked == "true") {
            changeTo = false;
        }

        if (wasChecked == "true") {
            $(`.${e.target.value}`).removeClass("text-success");
            $(`#${e.target.value}`).html("&#9633;");
            $(`span.${e.target.value}`).removeClass("text-decoration-line-through");

        }
        else if (wasChecked == "false") {
            $(`span.${e.target.value}`).removeClass("text-dark");
            $(`.${e.target.value}`).addClass("text-success");
            $(`#${e.target.value}`).html("&#x2713;");
            $(`span.${e.target.value}`).addClass("text-decoration-line-through");
        }

        let currentDate = new Date();
        let currentDateString = "Last completed by " + partnerName + " on " + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + " at " + currentDate.getHours() + ":" + currentDate.getMinutes()

        const results = await fetch('/api/checkTask', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskId: e.target.value, taskDescription: taskDescription, checked: changeTo, date: currentDateString, partnerName: partnerName }),
        })

        //received updated station from the backend whose task got checked
        const data = await results.json()


        setStations([...stations.filter(station => station._id != data.station._id), data.station]); //replaces station with new one only

        // re-load popovers
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl, '.popover-dismiss', {
            trigger: 'focus'
        }))

    }




    async function handleResetStation(e) {
        console.log("reseting stations : " + e.target.value)
        const results = await fetch('/api/resetStation', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stationId: e.target.value, time: time }),
        })

        const data = await results.json()
        console.log("updated station: " + data.stationId)

        if (data.stationId == "all") {
            let targetButton = $(`button[data-station]`)
            targetButton.removeClass("text-success");
            targetButton.html("&#9633;");
            targetButton.next().removeClass("text-success text-decoration-line-through");
        }

        let targetButton = $(`button[data-station=${e.target.value}]`)
        targetButton.removeClass("text-success");
        targetButton.html("&#9633;");
        targetButton.next().removeClass("text-success text-decoration-line-through");

    }


    if(partnerName == ""){
        return(<>
        <Navbar />
            <Head>
                <title>Virtual Operations Stations</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossOrigin="anonymous" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
                    integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous"></link>
            </Head>
            <Login/>
            <Footer/>
        </>
            
        
        )

    }




    return (


        <>
            <Navbar />
            <Head>
                <title>Virtual Operations Stations</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossOrigin="anonymous" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
                    integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous"></link>
            </Head>

            <div className="container">


                <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossOrigin="anonymous" strategy="lazyOnload" />

                <Script
                    src="https://code.jquery.com/jquery-3.6.0.slim.min.js"
                    integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI="
                    crossorigin="anonymous" />







                <main className="my-5 text-center">


                    <h1 className="my-5">
                        Hello {partnerName}, what time is it?
                    </h1>




                    <ul className="nav nav-pills my-5 d-flex justify-content-center" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-open-11am" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" value="open-11am" onClick={handleChangeTime}>Open-11am</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-11am-2pm" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" value="11am-2pm" onClick={handleChangeTime}>11am-2pm</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-2pm-4pm" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" value="2pm-4pm" onClick={handleChangeTime}>2pm-4pm</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-4pm-close" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" value="4pm-close" onClick={handleChangeTime}>4pm-close</button>
                        </li>
                    </ul>




                    <div className="accordion" id="accordionExample">

                        <div className="accordion-item">
                            <h2 className="accordion-header" onClick={updateCheckedTasks} id="PlayCaller">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#13a37b" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapsePlayCaller" aria-expanded="false" aria-controls="collapsePlayCaller">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light " >Play Caller</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faClipboard} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>

                                </button>
                            </h2>
                            <div id="collapsePlayCaller" className="accordion-collapse collapse" aria-labelledby="PlayCaller" >


                                <div className="accordion-body">
                                    <div className='reset-station'  ><button className="task-check btn" type="button " value={PlayCaller._id} onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset</button></div>


                                    <h5 className="text-dark"><FontAwesomeIcon icon={faClipboardUser} style={{ fontSize: "1.5em", color: "green" }} /> Play Caller:</h5>
                                    {
                                        PlayCaller.tasks.map((task, index) =>
                                            task.role == "Play Caller" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span>

                                                        </>)
                                                            : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`} >
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span>
                                                            </>)}

                                                    </div>

                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faPeopleGroup} style={{ fontSize: "1.5em", color: "green" }} /> Team Work:</h5>
                                    {
                                        PlayCaller.tasks.map((task, index) =>
                                            task.role == "Teamwork" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                </div>
                            </div>
                        </div>



                        <div className="accordion-item">
                            <h2 className="accordion-header" onClick={updateCheckedTasks} id="CycleTaskList">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#041014" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseCycleTaskList" aria-expanded="false" aria-controls="collapseCycleTaskList">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Cycle Task List</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faClock} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseCycleTaskList" className="accordion-collapse collapse" aria-labelledby="CycleTaskList" >
                                <div className="accordion-body">
                                    <div className='reset-station'  ><button className="task-check btn" type="button " value={CycleTaskList._id} onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset</button></div>
                                    <h5 className="text-dark"> <FontAwesomeIcon icon={faClockRotateLeft} style={{ fontSize: "1.5em", color: "green" }} /> Customer Support:</h5>
                                    {
                                        CycleTaskList.tasks.map((task, index) =>
                                            task.role == "Customer Support" ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                    <p className='my-3'>When done, check CS tasks in other stations or complete Ready-Set-Go </p>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" onClick={updateCheckedTasks} id="ReadySetGo">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#041014" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseReadySetGo" aria-expanded="false" aria-controls="collapseReadySetGo">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Ready-Set-Go!</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faListCheck} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseReadySetGo" className="accordion-collapse collapse" aria-labelledby="ReadySetGo" >
                                <div className="accordion-body">
                                    <div className='reset-station'  ><button className="task-check btn" type="button " value={ReadySetGo._id} onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset</button></div>
                                    <p>Complete to replenish store before peak period</p>
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faClockRotateLeft} style={{ fontSize: "1.5em", color: "green" }} /> Customer Support:</h5>
                                    {
                                        ReadySetGo.tasks.map((task, index) =>
                                            task.role == "Customer Support" ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>

                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>

                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>

                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>

                                                                </span>  </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }

                                </div>
                            </div>
                        </div>


                        <div className="accordion-item">
                            <h2 className="accordion-header" onClick={updateCheckedTasks} id="Expresso">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#833a30" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExpresso" aria-expanded="false" aria-controls="collapseExpresso">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Expresso</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faMugHot} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseExpresso" className="accordion-collapse collapse" aria-labelledby="Expresso" >
                                <div className="accordion-body">
                                    <div className='reset-station'  ><button className="task-check btn" type="button " value={Expresso._id} onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset</button></div>
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faClockRotateLeft} style={{ fontSize: "1.5em", color: "green" }} /> Customer Support: </h5>
                                    {
                                        Expresso.tasks.map((task, index) =>
                                            task.role == "Customer Support" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faPerson} style={{ fontSize: "1.5em", color: "green" }} /> Planted:</h5>
                                    {
                                        Expresso.tasks.map((task, index) =>
                                            task.role == "Planted" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" n value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" onClick={updateCheckedTasks} id="ColdBeverage">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#9ba49c" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseColdBeverage" aria-expanded="false" aria-controls="collapseColdBeverage">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Cold Beverage</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faBlender} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseColdBeverage" className="accordion-collapse collapse" aria-labelledby="ColdBeverage" >
                                <div className="accordion-body">
                                    <div className='reset-station'  ><button className="task-check btn" type="button " value={ColdBeverage._id} onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset</button></div>
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faClockRotateLeft} style={{ fontSize: "1.5em", color: "green" }} /> Customer Support:</h5>
                                    {
                                        ColdBeverage.tasks.map((task, index) =>
                                            task.role == "Customer Support" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faPerson} style={{ fontSize: "1.5em", color: "green" }} /> Planted:</h5>
                                    {
                                        ColdBeverage.tasks.map((task, index) =>
                                            task.role == "Planted" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" onClick={updateCheckedTasks} id="Draft">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#c37228" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseDraft" aria-expanded="false" aria-controls="collapseDraft">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Draft (Nitro)</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faWhiskeyGlass} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseDraft" className="accordion-collapse collapse" aria-labelledby="Draft" >
                                <div className="accordion-body">
                                    <div className='reset-station'  ><button className="task-check btn" type="button " value={Draft._id} onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset</button></div>
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faClockRotateLeft} style={{ fontSize: "1.5em", color: "green" }} /> Customer Support:</h5>
                                    {
                                        Draft.tasks.map((task, index) =>
                                            task.role == "Customer Support" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faPerson} style={{ fontSize: "1.5em", color: "green" }} /> Planted:</h5>
                                    {
                                        Draft.tasks.map((task, index) =>
                                            task.role == "Planted" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" onClick={updateCheckedTasks} id="MOP">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#4c6977" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseMOP" aria-expanded="false" aria-controls="collapseMOP">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Mobile Order & Pay</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faMobileScreen} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseMOP" className="accordion-collapse collapse" aria-labelledby="MOP" >
                                <div className="accordion-body">
                                    <div className='reset-station'  ><button className="task-check btn" type="button " value={MOP._id} onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset</button></div>
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faClockRotateLeft} style={{ fontSize: "1.5em", color: "green" }} /> Customer Support:</h5>
                                    {
                                        MOP.tasks.map((task, index) =>
                                            task.role == "Customer Support" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faPerson} style={{ fontSize: "1.5em", color: "green" }} /> Planted:</h5>
                                    {
                                        MOP.tasks.map((task, index) =>
                                            task.role == "Planted" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" onClick={updateCheckedTasks} id="Brewing">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#784e4e" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseBrewing" aria-expanded="false" aria-controls="collapseBrewing">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Brewing </h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faGlassWaterDroplet} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseBrewing" className="accordion-collapse collapse" aria-labelledby="Brewing" >
                                <div className="accordion-body">
                                    <div className='reset-station'  ><button className="task-check btn" type="button " value={Brewing._id} onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset</button></div>
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faClockRotateLeft} style={{ fontSize: "1.5em", color: "green" }} /> Customer Support:</h5>
                                    {
                                        Brewing.tasks.map((task, index) =>
                                            task.role == "Customer Support" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faPerson} style={{ fontSize: "1.5em", color: "green" }} /> Planted:</h5>
                                    {
                                        Brewing.tasks.map((task, index) =>
                                            task.role == "Planted" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" onClick={updateCheckedTasks} id="Warming">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#ac5b33" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseWarming" aria-expanded="false" aria-controls="collapseWarming">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Warming</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faFireFlameCurved} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseWarming" className="accordion-collapse collapse" aria-labelledby="Warming" >
                                <div className="accordion-body">
                                    <div className='reset-station'  ><button className="task-check btn" type="button " value={Warming._id} onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset</button></div>
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faClockRotateLeft} style={{ fontSize: "1.5em", color: "green" }} /> Customer Support:</h5>
                                    {
                                        Warming.tasks.map((task, index) =>
                                            task.role == "Customer Support" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faPerson} style={{ fontSize: "1.5em", color: "green" }} /> Planted:</h5>
                                    {
                                        Warming.tasks.map((task, index) =>
                                            task.role == "Planted" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" onClick={updateCheckedTasks} id="FoodCase">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#b77046" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFoodCase" aria-expanded="false" aria-controls="collapseFoodCase">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Food Case</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faCookie} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseFoodCase" className="accordion-collapse collapse" aria-labelledby="FoodCase" >
                                <div className="accordion-body">
                                    <div className='reset-station'  ><button className="task-check btn" type="button " value={FoodCase._id} onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset</button></div>
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faClockRotateLeft} style={{ fontSize: "1.5em", color: "green" }} /> Customer Support:</h5>
                                    {
                                        FoodCase.tasks.map((task, index) =>
                                            task.role == "Customer Support" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faPerson} style={{ fontSize: "1.5em", color: "green" }} /> Planted:</h5>
                                    {
                                        FoodCase.tasks.map((task, index) =>
                                            task.role == "Planted" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                </div>
                            </div>
                        </div>


                        <div className="accordion-item">
                            <h2 className="accordion-header" onClick={updateCheckedTasks} id="CustomerArea">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#748e8c" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseCustomerArea" aria-expanded="false" aria-controls="collapseCustomerArea">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Customer Area</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faPeopleGroup} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseCustomerArea" className="accordion-collapse collapse" aria-labelledby="CustomerArea" >
                                <div className="accordion-body">
                                    <div className='reset-station'  ><button className="task-check btn" type="button " value={CustomerArea._id} onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset</button></div>
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faClockRotateLeft} style={{ fontSize: "1.5em", color: "green" }} /> Customer Support:</h5>
                                    {
                                        CustomerArea.tasks.map((task, index) =>
                                            task.role == "Customer Support" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faPerson} style={{ fontSize: "1.5em", color: "green" }} /> Planted:</h5>
                                    {
                                        CustomerArea.tasks.map((task, index) =>
                                            task.role == "Planted" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" onClick={updateCheckedTasks} id="BackOfHouse">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#b3a8a2" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseBackOfHouse" aria-expanded="false" aria-controls="collapseBackOfHouse">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Back Of House</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faDoorClosed} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseBackOfHouse" className="accordion-collapse collapse" aria-labelledby="BackOfHouse" >
                                <div className="accordion-body">
                                    <div className='reset-station'  ><button className="task-check btn" type="button " value={BackOfHouse._id} onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset</button></div>
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faClockRotateLeft} style={{ fontSize: "1.5em", color: "green" }} /> Customer Support:</h5>
                                    {
                                        BackOfHouse.tasks.map((task, index) =>
                                            task.role == "Customer Support" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faPerson} style={{ fontSize: "1.5em", color: "green" }} /> Planted:</h5>
                                    {
                                        BackOfHouse.tasks.map((task, index) =>
                                            task.role == "Planted" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" onClick={updateCheckedTasks} id="DishWashing">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#d43436" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseDishWashing" aria-expanded="false" aria-controls="collapseDishWashing">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Dish Washing</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faSoap} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseDishWashing" className="accordion-collapse collapse" aria-labelledby="DishWashing">
                                <div className="accordion-body">
                                    <div className='reset-station'  ><button className="task-check btn" type="button " value={DishWashing._id} onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset</button></div>
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faClockRotateLeft} style={{ fontSize: "1.5em", color: "green" }} /> Customer Support:</h5>
                                    {
                                        DishWashing.tasks.map((task, index) =>
                                            task.role == "Customer Support" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faPerson} style={{ fontSize: "1.5em", color: "green" }} /> Planted:</h5>
                                    {
                                        DishWashing.tasks.map((task, index) =>
                                            task.role == "Planted" && task.time == time ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                </div>
                            </div>
                        </div>




                        <div className="accordion-item">
                            <h2 className="accordion-header" onClick={updateCheckedTasks} id="StoreWalk">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#041014" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseStoreWalk" aria-expanded="false" aria-controls="collapseStoreWalk">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Store Walk</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faShoePrints} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseStoreWalk" className="accordion-collapse collapse" aria-labelledby="StoreWalk" >
                                <div className="accordion-body">
                                    <div className='reset-station'  ><button className="task-check btn" type="button " value={StoreWalk._id} onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset</button></div>
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faClipboardUser} style={{ fontSize: "1.5em", color: "green" }} /> Play Caller:</h5>
                                    {
                                        StoreWalk.tasks.map((task, index) =>
                                            task.role == "Play Caller" ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }

                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" onClick={updateCheckedTasks} id="QuickConnect">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#041014" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseQuickConnect" aria-expanded="false" aria-controls="collapseQuickConnect">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Quick Connect</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faComments} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseQuickConnect" className="accordion-collapse collapse" aria-labelledby="QuickConnect" >
                                <div className="accordion-body">
                                    <div className='reset-station'  ><button className="task-check btn" type="button " value={QuickConnect._id} onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset</button></div>
                                    <h5 className="text-dark"><FontAwesomeIcon icon={faClipboardUser} style={{ fontSize: "1.5em", color: "green" }} /> Play Caller:</h5>
                                    {
                                        QuickConnect.tasks.map((task, index) =>
                                            task.role == "Play Caller" ? (
                                                <>

                                                    <div className="d-flex my-1 mx-4" >

                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                                <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                            </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-taskdescription={task.description} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                            </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                                    <a tabindex="0" className="btn-secondary text-reset text-decoration-none" role="button" data-bs-toggle="popover" data-bs-trigger="focus" title="Task log" data-bs-placement="bottom" data-bs-content={task.completedAt}>{task.description}</a>
                                                                </span> </>)}

                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='reset-station'  ><button className="task-check btn" type="button " value="all" onClick={handleResetStation} ><FontAwesomeIcon icon={faArrowRotateRight} style={{ fontSize: "1.0em", color: "green" }} /> Reset all stations</button></div>



                </main>

            </div>
            <Footer />

        </>
    )
}

export async function getServerSideProps({ req, res }) {

    const client = await clientPromise;

    const db = client.db("SbuxOperations")

    const stations = await db.collection("stations").find({}).toArray();

    // //populate stations.tasks   with tasks
    for (let station of stations) {
        station.tasks = await db.collection("tasks").find({ station: station._id }).toArray();
    }

    let data = JSON.stringify(stations);

    let currentDate = new Date();
    let timeNow = currentDate.getHours()

    console.log(timeNow);

    if (timeNow > 1 && timeNow < 11) {
        timeNow = "open-11am"
    } else if (timeNow >= 11 && timeNow < 14) {
        timeNow = "11am-2pm"
    } else if (timeNow >= 14 && timeNow < 16) {
        timeNow = "2pm-4pm"
    } else if (timeNow >= 16 && timeNow < 23) {
        timeNow = "4pm-close"
    }

    return {
        props: {
            data: JSON.parse(data),
            timeNow: timeNow,
            partnerName: req.cookies.partnerName? req.cookies.partnerName : "",
        },
        //revalidate: 10, // In seconds
    };

}


export default Home;


