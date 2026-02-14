import React from 'react';
import {Link} from 'react-router-dom'

function Universe() {
    return ( 
          <div className="container mb-5 mt-5">
      <div className="row text-center mt-5">
        <h1 className="fs-4">The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <img
            src="media/smallcaseLogo.png"
            style={{ width: "50%", paddingBottom: "6px" }}
          ></img>
          <p className="text-small text-muted mt-3">
            Thematic investing platform
            <br />
            that helps you invest in diversified
            <br />
            baskets of stocks on ETFs.
          </p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img src="media/streakLogo.png" style={{ width: "40%" }}></img>
          <p className="text-small text-muted mt-3">
            Systematic trading platform
            <br />
            that allows you to create and backtest
            <br />
            strategies without coding.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img
            src="media/sensibullLogo.svg"
            style={{ width: "50%", paddingBottom: "15px" }}
          ></img>
          <p className="text-small text-muted mt-3">
            Options trading platform that lets you
            <br />
            create strategies, analyze positions, and examine
            <br />
            data points like open interest, FII/DII, and more.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img
            src="media/zerodhaFundhouse.png"
            style={{ width: "50%", paddingBottom: "15px" }}
          ></img>
          <p className="text-small text-muted mt-3">
            Our asset management venture
            <br />
            that is creating simple and transparent index
            <br />
            funds to help you save for your goals.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img
            src="media/goldenpiLogo.png"
            style={{ width: "50%", paddingBottom: "15px" }}
          ></img>
          <p className="text-small text-muted mt-3">
            Investment research platform
            <br />
            that offers detailed insights on stocks,
            <br />
            sectors, supply chains, and more.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img
            src="media/dittoLogo.png"
            style={{ width: "50%", paddingBottom: "15px" }}
          ></img>
          <p className="text-small text-muted mt-3">
            Personalized advice on life
            <br />
            and health insurance. No spam
            <br />
            and no mis-selling.
          </p>
        </div>
         <Link to="/signup" className="btn btn-primary" style={{ width: '200px', margin: '0 auto' }}>
                    Sign up now
                </Link>
      </div>
    </div>
     );
}

export default Universe;