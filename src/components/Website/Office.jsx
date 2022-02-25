import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class Welcome extends React.Component{
    render() {
       
     return(
        <>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-12 col-sm-6'>
                {/* <Map 
                    google={this.props.google}
                    style={style}
                    initialCenter={{
                        lat: 24.80605293079498,
                        lng: 67.02710511059624
                    }}
                    zoom={14}>
                        
                    <Marker 
                    onClick={this.onMarkerClick}
                    name={'Current location'}
                    />
                    <InfoWindow onClose={this.onInfoWindowClose}>
                         <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        </div> 
                    </InfoWindow>  
                </Map> */}
                </div>
            </div>
        </div>
        
        </>
     )
    
    }
}


const style = {
    width: '100%',
    height: '350px'
    // position: 'relative',
    //margin: '50px'
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCZQdWZWsNyakL30EbvVherjO4c9HcqFc8")
    //API Key 1
    //AIzaSyDQsRv-RuX4V0ftSYnA_pv79t89bYkj0DE
    //API Key 2
    //AIzaSyCZQdWZWsNyakL30EbvVherjO4c9HcqFc8
  })(Welcome)

//export default cDemo;