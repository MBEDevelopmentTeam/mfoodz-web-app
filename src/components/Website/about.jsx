import React from 'react';


// import './hb.css';

export const About = (props) => {
  return (
    <div id='about'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-1 col-sm-6'>

          </div>
          <div className='col-md-5 col-sm-6'>
            <div className='about-text'>
              <h2 id='HdAbout'>About M-Foodz</h2>
              <p style={{ color: 'black' }}>{props.data ? props.data.paragraph : 'loading...'}</p>
              <h3 id='HdWhy'>Why Choose Us?</h3>
              <div className='list-style'>
                <div className='col-lg-6 col-sm-6 col-xs-12'>



                  <ul className='About00'>
                    {props.data
                      ? props.data.Why.map((d, i) => {

                        return (

                          <div style={{ display: "flex", flexDirection: 'row' }}> 

                            <span className='dot' style={{ backgroundColor: '#f26c2a', width: '8px', height: '8px', borderRadius: '50%', marginTop: '5px' }}></span>
                            <li style={{ fontSize: '13px' }} key={`${d}-${i}`}> {d}</li>

                          </div>
                        )


                      })
                      : 'loading'}
                  </ul>



                </div>
                <div className='col-lg-6 col-sm-6 col-xs-12'>



                  <ul className='About00'>
                    {props.data
                      ? props.data.Why2.map((d, i) => {

                        return (

                          <div style={{ display: "flex", flexDirection: 'row' }}>

                            <span className='dot' style={{ backgroundColor: '#f26c2a', width: '8px', height: '8px', borderRadius: '50%', marginTop: '5px' }}></span>
                            <li style={{ fontSize: '13px' }} key={`${d}-${i}`}> {d}</li>

                          </div>
                        )


                      })
                      : 'loading'}
                  </ul>



                </div>
              </div>
            </div>
          </div>
          <div className='col-md-5 col-sm-6'>

            <img src='images/About2.jpg' className='i' alt='' />



          </div>
          <div className='col-md-1 col-sm-6'>
          </div>
        </div>
      </div>
    </div>
  )
}

