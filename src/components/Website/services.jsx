import React from 'react';
import './hb.css';

export const Services = (props) => {
  return (
    <div id='services' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h1 id='HdService'>Our Services</h1>
          <p>
            CUSTOMER SATISFACTION & SERVICE STANDARDS IS OUR PRIMRAY FOCUS IN THE FOOD INDUSTRY.
          </p>
        </div>
        <div className='row'>
          {props.data
            ? props.data.map((d, i) => (
              <div key={`${d.name}-${i}`} className='col-md-4'>
                {' '}
                {/* <i className={d.icon}></i> */}
                <div className='service-desc'>
                  <img src={d.img} width='72px' height='72px' />
                  <h3>{d.name}</h3>
                  <p>{d.text}</p>
                  {/* <hr/> */}
                </div>
              </div>
            ))
            : 'loading'}
        </div>
      </div>
    </div>
  )
}
