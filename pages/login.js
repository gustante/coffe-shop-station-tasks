// Imports
import Head from 'next/head'
import Script from 'next/script';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";

// Components
import Footer from './footer.js';


//


export default function Login() {
  return (

    <>

      <Head>
        <title>Virtual Operations Stations</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"/>
      </Head>

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous" strategy="lazyOnload"/>

    <div className="container">
        <main className="text-center">

            <h1 className="my-5">
                Please log in
            </h1>

            <div className="input-group mb-4">
                <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faUserLarge} style={{ fontSize: "1.5em" }}/></span>
                <input type="text" name="name" className="form-control p-3" placeholder="name" aria-label="name" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-4">
                <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faKey} style={{ fontSize: "1.5em"}}/></span>
                <input type="password" name="password" className="form-control p-3" placeholder="password" aria-label="password" aria-describedby="basic-addon1"/>
            </div>

            <div class="d-grid gap-2">
              <Link href="/position">
                <a className="btn btn-lg btn-login py-3" >Log In</a>
              </Link>
            </div>
            
            
        </main>

    </div>
    </>
  )
}
