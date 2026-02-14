import React from 'react';
import {Link} from 'react-router-dom'

function OpenAccount() {
    return ( 
        <div className='container p-5 mt-5'>
            <div className='row text-center'>
                <h1 className='mt-5'>
                   Open a StockYard account
                </h1>
                <p>
                Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O traders.
                </p>
                <Link to="/signup" className="btn btn-primary" style={{ width: '200px', margin: '0 auto' }}>
                    Sign up now
                </Link>
            </div>
        </div>
     );
}

export default OpenAccount;