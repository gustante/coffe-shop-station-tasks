import Head from 'next/head'
import Link from 'next/link';
import Script from 'next/script';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugHot,
  faAnchor,
} from "@fortawesome/free-solid-svg-icons";

//COMPONENTS
import Navbar from './navbar.js';
import Position from './position.js';


export default function Home() {
  return (
      <>
      <Head>
        <title>Virtual Operations Stations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous" strategy="lazyOnload"/>

      <Navbar />
    
    <div className="container">
      

      
      

      <main className="text-center">
        <h1 className="title pt-5">
          Welcome to the virtual Operations Stations Cards
        </h1>
        

        <Position />


      </main>

      <footer className="d-flex ">
        <div className="d-flex p-5 flex-column ">
          <small className="my-4 mt-5">Copyright Gustavo Faria 2022. All rights reserved. </small> 
          <small className="">This app is confidential and for internal use only. Developed for Starbucks business purposes only. Do not distribute.</small>
        </div>
          
        
      </footer>

    </div>
    </>
  )
}
