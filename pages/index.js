import Head from 'next/head'
import Link from 'next/link';
import Script from 'next/script';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

} from "@fortawesome/free-solid-svg-icons";
require('../models/Station.js');
require('../models/Task.js');

//COMPONENTS
import Navbar from './navbar.js';
import Position from './position.js';
import Login from './login.js';
import Management from './management.js';
import Footer from './footer.js';

const Home = (props) => {
  



  

    return (


      <>
        <Head>
          <title>Virtual Operations Stations</title>
          <link rel="icon" type="image/x-icon" href="./public/favicon.ico"></link>
        </Head>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossOrigin="anonymous" strategy="lazyOnload" />

        <Navbar />

        <div className="container">





          <main className="text-center">
            <h1 className="title pt-5">
              Welcome to the virtual Operations Stations Cards
            </h1>


            <Login />


          </main>



        </div>
        <Footer />
      </>
    )
  

}

export default Home;