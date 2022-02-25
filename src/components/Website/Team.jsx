
import React from 'react';
import './index.css';


export const Team = (props) => {

  return (

    <div id='team' className='text-center'>



      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title colections' >
          <h1>Collections</h1>
          <p style={{ color: 'black' }}>
            Explore curated lists of top restaurants, cafes, pubs, and bars in Canada, based on trends
          </p>
        </div>





        <div id='row' className='collections'>
          {props.data
            ? props.data.map((d, i) => (
              <div key={`${d.name}-${i}`} className='col-md-3 col-sm-6 team'>
                <div className='thumbnail'>

                  <img style={{ borderRadius: "150px" }} src={d.img} alt='...' className='team-img' />
                  <div className='caption'>
                    <h4>{d.name}</h4>
                    {/* <p>{d.job}</p> */}
                  </div>
                </div>
              </div>
            ))
            : 'loading'}
        </div>





      </div>
    </div>
  )
}
