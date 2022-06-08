// Imports
import Head from 'next/head'
import Script from 'next/script';
import Link from 'next/link';

// Components
import sbuxlogo from './sbux_logo.webp'
import Navbar from './navbar.js';
//


export default function Position() {
  return (

    <>


      <Head>
        <title>Virtual Operations Stations</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"/>
      </Head>

      <Navbar />

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous" strategy="lazyOnload"/>

    <div className="container">
        <main className="text-center">

            <h1 className="my-5">
                Hello <span>Gustavo, </span>what is your position?
            </h1>



            <ul className="nav nav-pills flex-column my-5 d-flex justify-content-center" id="pills-tab" role="tablist">
                <li className="nav-item d-flex justify-content-center " role="presentation">
                    <Link href="/stations/home">
                        <a className="nav-link positions">Till / Oven / Brewing</a>
                    </Link>
                </li>
                <li className="nav-item d-flex justify-content-center" role="presentation">
                    <Link href="/stations/home">
                        <a className="nav-link positions">Bar / MOP </a>
                    </Link>
                </li>
                <li className="nav-item d-flex justify-content-center" role="presentation">
                    <Link href="/stations/home">
                        <a className="nav-link positions" >Order support</a>
                    </Link>
                </li>
                <li className="nav-item d-flex justify-content-center" role="presentation">
                    <Link href="/stations/home">
                        <a className="nav-link positions" >Customer Support</a>
                    </Link>
                </li>
                <li>
              
                </li>
             </ul>
        </main>




    </div>
    </>
  )
}
