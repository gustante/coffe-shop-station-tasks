// Imports
import Head from 'next/head'
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';

// Components
import logo from './logo.webp'

//


export default function Navbar() {

  async function handleLogOut() {
    console.log("executes handleLogout")

    const results = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })




  }
  return (

    <>
      <Head>

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossOrigin="anonymous" />
      </Head>

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossOrigin="anonymous" strategy="lazyOnload" />
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link href="/">
            <a><Image src={logo} alt="starbucks logo mermeid" height={50} width={50} /></a>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item btn">
                <Link href="/">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </Link>
              </li>
              <li className="nav-item btn">
                <Link href="/stations/home">
                  <a className="nav-link active" aria-current="page" href="#">Stations</a>
                </Link>
              </li>
              {/* <li className="nav-item btn">
                <a className="nav-link active" aria-current="page" href="#">View as PlayCaller</a>
              </li> */}
              <li className="nav-item btn">
                <Link href="/management">
                  <a className="nav-link active" aria-current="page" href="#">Manage stations and tasks</a>
                </Link>
              </li>
              <li className="nav-item btn">
                <Link href="/">
                  <a className="nav-link active" aria-current="page" href="#" onClick={handleLogOut}>Logout</a>
                </Link>

              </li>
            </ul>

          </div>
        </div>
      </nav>




    </>
  )
}
