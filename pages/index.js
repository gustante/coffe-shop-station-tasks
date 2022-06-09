import Head from 'next/head'
import Link from 'next/link';
import Script from 'next/script';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

} from "@fortawesome/free-solid-svg-icons";

//COMPONENTS
import Navbar from './navbar.js';
import Position from './position.js';
import Login from './login.js';
import Management from './management.js';
import Footer from './footer.js';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      partnerName: "",
      password: "",
      station: "",
      stationsDropDown: [],
    }

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateStation = this.handleCreateStation.bind(this);
    this.handleCreateTask = this.handleCreateTask.bind(this);


  }



  async handleLogIn() {
    console.log("executes handleLogin")

    const results = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ partnerName: this.state.partnerName }),
    })

    const data = await results.json()
    console.log(data.partnerName)


  }

  async handleCreateStation() {

  }
  async handleCreateTask() {

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
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


            <Login handleChange={this.handleChange} handleLogIn={this.handleLogIn}/>


          </main>



        </div>
        <Footer />
      </>
    )
  }

}

export default Home;