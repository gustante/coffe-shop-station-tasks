// Imports
import Head from 'next/head'
import Script from 'next/script';
import Link from 'next/link';

// Components
import Warming from './warming.js';
import BackOfHouse from './back-of-house.js';
import Brewing from './brewing.js';
import ColdBeverage from './cold-beverage.js';
import CustomerArea from './customer-area.js';
import CycleTaskList from './cycle-task-list.js';
import DishWashing from './dish-washing.js';
import Draft from './draft.js';
import Expresso from './expresso.js';
import FoodCase from './food-case.js';
import MOP from './MOP.js';
import MultiStationTasks from './multi-station-tasks.js';
import PlayCaller from './play-caller.js';
import QuickConnect from './quick-connect.js';
import ReadySetGo from './ready-set-go.js';
import StoreWalk from './store-walk.js';
import Temps from './temps.js';
import Navbar from '../navbar.js';

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


//


export default function Home() {
  return (
    
    <>
    <Navbar />

    <div className="container">

      <Head>
        <title>Virtual Operations Stations</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"/>
      </Head>

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous" strategy="lazyOnload"/>



      <Link href="/">
        <a type="button" className="nav-link" ><FontAwesomeIcon className='mx-2' icon={faArrowLeft} style={{ fontSize: "1.5em", color: "black" }}/>Switch position</a>
        </Link>

      <main className="my-5 text-center">
          

        <h1 className="my-5">
            What time is it?
        </h1>

            <ul className="nav nav-pills my-5 d-flex justify-content-center" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Open-11am</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">11am-2pm</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">2pm-4pm</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">4pm-close</button>
                </li>
            </ul>




        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="PlayCaller">
                <button className="accordion-button collapsed" style={{backgroundColor: "#13a37b"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapsePlayCaller" aria-expanded="false" aria-controls="collapsePlayCaller">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light " >Play Caller</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faClipboard} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>
                    
                </button>
                </h2>
                <div id="collapsePlayCaller" className="accordion-collapse collapse" aria-labelledby="PlayCaller" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <PlayCaller />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="QuickConnect">
                <button className="accordion-button collapsed" style={{backgroundColor: "#041014"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseQuickConnect" aria-expanded="false" aria-controls="collapseQuickConnect">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Quick Connect</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faComments} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>
                </button>
                </h2>
                <div id="collapseQuickConnect" className="accordion-collapse collapse" aria-labelledby="QuickConnect" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <QuickConnect />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="StoreWalk">
                <button className="accordion-button collapsed" style={{backgroundColor: "#041014"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseStoreWalk" aria-expanded="false" aria-controls="collapseStoreWalk">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Store Walk</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faShoePrints} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>
                </button>
                </h2>
                <div id="collapseStoreWalk" className="accordion-collapse collapse" aria-labelledby="StoreWalk" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <StoreWalk />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="Temps">
                <button className="accordion-button collapsed" style={{backgroundColor: "#c4443e"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTemps" aria-expanded="false" aria-controls="collapseTemps">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Temps</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faTemperatureHalf} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>
                </button>
                </h2>
                <div id="collapseTemps" className="accordion-collapse collapse" aria-labelledby="Temps" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <Temps />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="Expresso">
                <button className="accordion-button collapsed" style={{backgroundColor: "#833a30"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExpresso" aria-expanded="false" aria-controls="collapseExpresso">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Expresso</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faMugHot} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>
                </button>
                </h2>
                <div id="collapseExpresso" className="accordion-collapse collapse" aria-labelledby="Expresso" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <Expresso />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="ColdBeverage">
                <button className="accordion-button collapsed" style={{backgroundColor: "#9ba49c"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseColdBeverage" aria-expanded="false" aria-controls="collapseColdBeverage">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Cold Beverage</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faBlender} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>
                </button>
                </h2>
                <div id="collapseColdBeverage" className="accordion-collapse collapse" aria-labelledby="ColdBeverage" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <ColdBeverage />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="Draft">
                <button className="accordion-button collapsed" style={{backgroundColor: "#c37228"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseDraft" aria-expanded="false" aria-controls="collapseDraft">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Draft (Nitro)</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faWhiskeyGlass} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>
                </button>
                </h2>
                <div id="collapseDraft" className="accordion-collapse collapse" aria-labelledby="Draft" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <Draft />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="MOP">
                <button className="accordion-button collapsed" style={{backgroundColor: "#4c6977"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseMOP" aria-expanded="false" aria-controls="collapseMOP">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Mobile Order & Pay</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faMobileScreen} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>  
                </button>
                </h2>
                <div id="collapseMOP" className="accordion-collapse collapse" aria-labelledby="MOP" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <MOP />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="Brewing">
                <button className="accordion-button collapsed" style={{backgroundColor: "#784e4e"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseBrewing" aria-expanded="false" aria-controls="collapseBrewing">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Brewing </h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faGlassWaterDroplet} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                        </div>
                </button>
                </h2>
                <div id="collapseBrewing" className="accordion-collapse collapse" aria-labelledby="Brewing" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <Brewing />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="Warming">
                <button className="accordion-button collapsed" style={{backgroundColor: "#ac5b33"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseWarming" aria-expanded="false" aria-controls="collapseWarming">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Warming</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faFireFlameCurved} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>
                </button>
                </h2>
                <div id="collapseWarming" className="accordion-collapse collapse" aria-labelledby="Warming" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <Warming />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="FoodCase">
                <button className="accordion-button collapsed" style={{backgroundColor: "#b77046"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFoodCase" aria-expanded="false" aria-controls="collapseFoodCase">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Food Case</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faCookie} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>
                </button>
                </h2>
                <div id="collapseFoodCase" className="accordion-collapse collapse" aria-labelledby="FoodCase" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <FoodCase />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="MultiStationTasks">
                <button className="accordion-button collapsed" style={{backgroundColor: "#62555e"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseMultiStationTasks" aria-expanded="false" aria-controls="collapseMultiStationTasks">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Multi-Station tasks</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faSprayCanSparkles} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>
                </button>
                </h2>
                <div id="collapseMultiStationTasks" className="accordion-collapse collapse" aria-labelledby="MultiStationTasks" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <MultiStationTasks />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="CycleTaskList">
                <button className="accordion-button collapsed" style={{backgroundColor: "#041014"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseCycleTaskList" aria-expanded="false" aria-controls="collapseCycleTaskList">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Cycle Task List</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faClock} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>
                </button>
                </h2>
                <div id="collapseCycleTaskList" className="accordion-collapse collapse" aria-labelledby="CycleTaskList" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <CycleTaskList />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="CustomerArea">
                <button className="accordion-button collapsed" style={{backgroundColor: "#748e8c"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseCustomerArea" aria-expanded="false" aria-controls="collapseCustomerArea">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Customer Area</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faPeopleGroup} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>
                </button>
                </h2>
                <div id="collapseCustomerArea" className="accordion-collapse collapse" aria-labelledby="CustomerArea" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <CustomerArea />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="BackOfHouse">
                <button className="accordion-button collapsed" style={{backgroundColor: "#b3a8a2"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseBackOfHouse" aria-expanded="false" aria-controls="collapseBackOfHouse">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Back Of House</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faDoorClosed} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>
                </button>
                </h2>
                <div id="collapseBackOfHouse" className="accordion-collapse collapse" aria-labelledby="BackOfHouse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <BackOfHouse />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="DishWashing">
                <button className="accordion-button collapsed" style={{backgroundColor: "#d43436"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseDishWashing" aria-expanded="false" aria-controls="collapseDishWashing">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Dish Washing</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faSoap} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>
                </button>
                </h2>
                <div id="collapseDishWashing" className="accordion-collapse collapse" aria-labelledby="DishWashing" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <DishWashing />
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="ReadySetGo">
                <button className="accordion-button collapsed" style={{backgroundColor: "#041014"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseReadySetGo" aria-expanded="false" aria-controls="collapseReadySetGo">
                    <div className="station-name d-flex justify-content-between ">
                        <h2 className="text-light">Ready-Set-Go!</h2>
                        <p className="px-2">
                            <FontAwesomeIcon icon={faListCheck} style={{ fontSize: "2em", color: "white" }}/>
                        </p>
                    </div>
                </button>
                </h2>
                <div id="collapseReadySetGo" className="accordion-collapse collapse" aria-labelledby="ReadySetGo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <ReadySetGo />
                    </div>
                </div>
            </div>

            </div>




      </main>
      <hr></hr>
      <footer className="d-flex ">
      
        <div className="d-flex p-5 flex-column ">
        
          <small className="my-4 ">Copyright Gustavo Faria 2022. All rights reserved. </small> 
          <small className="">This app is confidential and for internal use only. Developed for Starbucks business purposes only. Do not distribute.</small>
        </div>
          
        
      </footer>



    </div>  
    </>
  )
}
