// Imports
import Head from 'next/head'
import Script from 'next/script';

export default function Footer() {
  return (

    <>


      <Head>
        
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"/>
      </Head>

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous" strategy="lazyOnload"/>

      
        
    <footer className="d-flex flex-column py-2">
    
        <div className=" p-4 ">
          <small className="mb-4 d-block">&copy; 2022 Gustavo Faria. All rights reserved. </small> 
          <small className="d-block">This app is confidential and for internal use. Do not distribute. </small>
        </div>

      </footer>
   
    </>
  )
}
