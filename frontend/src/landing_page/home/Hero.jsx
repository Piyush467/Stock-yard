import React from 'react';

function Hero() {
    return ( 
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <img src='media/homeHero.png' className='mb-5' alt='Hero Image'/>
                <h1 className='mt-5'>Invest in everything</h1>
                <p>Online platform to invest in stocks, derivatives,mutual funds</p>
                <Link to="/signup" className="btn btn-primary" style={{ width: '200px', margin: '0 auto' }}>
                    Sign up now
                </Link>
                
            </div>
            
        </div>
     );
}

export default Hero;