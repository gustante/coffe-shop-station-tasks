// Imports
import Head from 'next/head'
import Script from 'next/script';
import Link from 'next/link';
import { useState } from "react";
import connectMongo from "../../mongodb/connection";
import Station from '../../models/Station';

// Components
import Navbar from '../navbar.js';
import Footer from '../footer.js';

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

} from "@fortawesome/free-solid-svg-icons";

import {

    faSquareCheck,
    faSquare,

} from "@fortawesome/free-regular-svg-icons";






//


const Home = (props) => {
    const [stations, setStations] = useState(props.data);
    const [time, setTime] = useState(props.timeNow);


    const StoreWalk = stations.find(station => station.name == "Store Walk");
    const PlayCaller = stations.find(station => station.name == "Play Caller");



    // const updateCheckedTasks = document.querySelector("[data-isChecked='true']");
    // updateCheckedTasks.setAttribute("checked", "true");








    const QuickConnect = stations.find(station => station.name == "Quick Connect");






    function printProps() {
        console.log(StoreWalk);
        console.log(PlayCaller);

    }

    function handleChangeTime(e) {
        console.log(e.target.value);
        setTime(e.target.value)
        
    }

    async function handleCheckTask(e) {
        let wasChecked = $(`.${e.target.value}`).attr('data-ischecked');

        
        if(wasChecked == "true") {
            $(`.${e.target.value}`).removeClass("text-success");
            $(`#${e.target.value}`).html("&#9633;");
            $(`span.${e.target.value}`).removeClass("text-decoration-line-through");
            
        } 
        else if(wasChecked == "false") {
            $(`span.${e.target.value}`).removeClass("text-dark");
            $(`.${e.target.value}`).addClass("text-success");
            $(`#${e.target.value}`).html("&#x2713;");
            $(`span.${e.target.value}`).addClass("text-decoration-line-through");
        }

        const results = await fetch('/api/checkTask', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskId: e.target.value }),
        })

        const data = await results.json()
        

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



                <Link href="/position">
                    <a type="button" className="nav-link" ><FontAwesomeIcon className='mx-2' icon={faArrowLeft} style={{ fontSize: "1.5em", color: "black" }} />Switch position</a>
                </Link>

                <main className="my-5 text-center">


                    <h1 className="my-5">
                        What time is it?
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
                            <h2 className="accordion-header" id="PlayCaller">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#13a37b" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapsePlayCaller" aria-expanded="false" aria-controls="collapsePlayCaller">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light " >Play Caller</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faClipboard} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>

                                </button>
                            </h2>
                            <div id="collapsePlayCaller" className="accordion-collapse collapse" aria-labelledby="PlayCaller" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <h5 className="text-dark">Play Caller:</h5>
                                    {
                                        PlayCaller.tasks.map((task, index) =>
                                            task.role == "Play Caller" && task.time == time ? (
                                                <>
                                                   
                                                    <div className="d-flex my-1 mx-4" >
                                                        
                                                        {task.checked ? (<><button id={task._id} className={`${task._id} btn fs-2 text-success task-check`} data-station={task.station} data-ischecked="true" value={task._id} onClick={handleCheckTask}> &#x2713;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-decoration-line-through text-success`}>
                                                            {task.description}
                                                        </span> </>) : (<> <button id={task._id} className={`${task._id} btn fs-2 task-check`} data-station={task.station} data-ischecked="false" value={task._id} onClick={handleCheckTask}> &#9633;
                                                        </button> <span className={`${task._id} mx-4 mt-3 text-dark`}>
                                                            {task.description}
                                                        </span> </>)}

                                                        {/* <button id={task._id} className={task.checked ? 'btn fs-2 text-success task-check' : 'btn fs-2 task-check'} data-ischecked={task.checked} value={task._id} onClick={handleCheckTask}> &#x2611;
                                                        </button> */}

                                                        {/* <span className={`mx-4 mt-3 ${task.checked ? 'text-decoration-line-through text-success' : "text-dark"}`}>
                                                            {task.description}
                                                        </span> */}
                                                    </div>
                                                </>

                                            ) : (
                                                null

                                            )

                                        )

                                    }
                                    <h5 className="text-dark">Team work:</h5>
                                    {
                                        PlayCaller.tasks.map((task, index) =>
                                            task.role == "Teamwork" && task.time == time ? (
                                                <div className="form-check mx-4">
                                                    <input className="form-check-input" type="checkbox" value="" id={task._id} />
                                                    <label className="form-check-label" for={task._id}>
                                                        {task.description}
                                                    </label>
                                                </div>
                                            ) : (
                                                null
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="QuickConnect">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#041014" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseQuickConnect" aria-expanded="false" aria-controls="collapseQuickConnect">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Quick Connect</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faComments} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseQuickConnect" className="accordion-collapse collapse" aria-labelledby="QuickConnect" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <h5 className="text-dark">Quick Connect:</h5>
                                    {QuickConnect.tasks.map((task, index) => <div className="form-check mx-4">
                                        <input className="form-check-input" type="checkbox" value="" id={task._id} />
                                        <label className="form-check-label" for={task._id}>
                                            {task.description}
                                        </label>
                                    </div>)}
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="StoreWalk">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#041014" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseStoreWalk" aria-expanded="false" aria-controls="collapseStoreWalk">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Store Walk</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faShoePrints} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseStoreWalk" className="accordion-collapse collapse" aria-labelledby="StoreWalk" data-bs-parent="#accordionExample">
                                <div className="accordion-body text-dark">
                                    <h5 className="text-dark">Play Caller:</h5>
                                    {StoreWalk.tasks.map((task, index) => <div className="form-check mx-4">
                                        <input className="form-check-input" type="checkbox" value="" id={task._id} />
                                        <label className="form-check-label" for={task._id}>
                                            {task.description}
                                        </label>
                                    </div>)}
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="Temps">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#c4443e" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTemps" aria-expanded="false" aria-controls="collapseTemps">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Temps</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faTemperatureHalf} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseTemps" className="accordion-collapse collapse" aria-labelledby="Temps" data-bs-parent="#accordionExample">
                                <div className="accordion-body">

                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="Expresso">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#833a30" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExpresso" aria-expanded="false" aria-controls="collapseExpresso">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Expresso</h2>
                                        <p className="px-2">

                                            <FontAwesomeIcon icon={faMugHot} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseExpresso" className="accordion-collapse collapse" aria-labelledby="Expresso" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="ColdBeverage">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#9ba49c" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseColdBeverage" aria-expanded="false" aria-controls="collapseColdBeverage">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Cold Beverage</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faBlender} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseColdBeverage" className="accordion-collapse collapse" aria-labelledby="ColdBeverage" data-bs-parent="#accordionExample">
                                <div className="accordion-body">

                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="Draft">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#c37228" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseDraft" aria-expanded="false" aria-controls="collapseDraft">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Draft (Nitro)</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faWhiskeyGlass} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseDraft" className="accordion-collapse collapse" aria-labelledby="Draft" data-bs-parent="#accordionExample">
                                <div className="accordion-body">

                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="MOP">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#4c6977" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseMOP" aria-expanded="false" aria-controls="collapseMOP">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Mobile Order & Pay</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faMobileScreen} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseMOP" className="accordion-collapse collapse" aria-labelledby="MOP" data-bs-parent="#accordionExample">
                                <div className="accordion-body">

                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="Brewing">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#784e4e" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseBrewing" aria-expanded="false" aria-controls="collapseBrewing">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Brewing </h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faGlassWaterDroplet} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseBrewing" className="accordion-collapse collapse" aria-labelledby="Brewing" data-bs-parent="#accordionExample">
                                <div className="accordion-body">

                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="Warming">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#ac5b33" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseWarming" aria-expanded="false" aria-controls="collapseWarming">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Warming</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faFireFlameCurved} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseWarming" className="accordion-collapse collapse" aria-labelledby="Warming" data-bs-parent="#accordionExample">
                                <div className="accordion-body">

                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="FoodCase">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#b77046" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFoodCase" aria-expanded="false" aria-controls="collapseFoodCase">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Food Case</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faCookie} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseFoodCase" className="accordion-collapse collapse" aria-labelledby="FoodCase" data-bs-parent="#accordionExample">
                                <div className="accordion-body">

                                </div>
                            </div>
                        </div>

                        {/* <div className="accordion-item">
                            <h2 className="accordion-header" id="MultiStationTasks">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#62555e" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseMultiStationTasks" aria-expanded="false" aria-controls="collapseMultiStationTasks">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Multi-Station tasks</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faSprayCanSparkles} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseMultiStationTasks" className="accordion-collapse collapse" aria-labelledby="MultiStationTasks" data-bs-parent="#accordionExample">
                                <div className="accordion-body">

                                </div>
                            </div>
                        </div> */}

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="CycleTaskList">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#041014" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseCycleTaskList" aria-expanded="false" aria-controls="collapseCycleTaskList">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Cycle Task List</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faClock} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseCycleTaskList" className="accordion-collapse collapse" aria-labelledby="CycleTaskList" data-bs-parent="#accordionExample">
                                <div className="accordion-body">

                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="CustomerArea">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#748e8c" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseCustomerArea" aria-expanded="false" aria-controls="collapseCustomerArea">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Customer Area</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faPeopleGroup} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseCustomerArea" className="accordion-collapse collapse" aria-labelledby="CustomerArea" data-bs-parent="#accordionExample">
                                <div className="accordion-body">

                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="BackOfHouse">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#b3a8a2" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseBackOfHouse" aria-expanded="false" aria-controls="collapseBackOfHouse">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Back Of House</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faDoorClosed} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseBackOfHouse" className="accordion-collapse collapse" aria-labelledby="BackOfHouse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">

                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="DishWashing">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#d43436" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseDishWashing" aria-expanded="false" aria-controls="collapseDishWashing">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Dish Washing</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faSoap} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseDishWashing" className="accordion-collapse collapse" aria-labelledby="DishWashing" data-bs-parent="#accordionExample">
                                <div className="accordion-body">

                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="ReadySetGo">
                                <button className="accordion-button collapsed" style={{ backgroundColor: "#041014" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseReadySetGo" aria-expanded="false" aria-controls="collapseReadySetGo">
                                    <div className="station-name d-flex justify-content-between ">
                                        <h2 className="text-light">Ready-Set-Go!</h2>
                                        <p className="px-2">
                                            <FontAwesomeIcon icon={faListCheck} style={{ fontSize: "2em", color: "white" }} />
                                        </p>
                                    </div>
                                </button>
                            </h2>
                            <div id="collapseReadySetGo" className="accordion-collapse collapse" aria-labelledby="ReadySetGo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">

                                </div>
                            </div>
                        </div>

                    </div>




                </main>

            </div>
            <Footer />

        </>
    )
}

export async function getStaticProps() {
    await connectMongo()

    const stations = await Station.find().populate('tasks');
    

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
            timeNow: timeNow
        },
        revalidate: 10, // In seconds
    };

}


export default Home;


