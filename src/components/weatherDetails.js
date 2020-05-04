import React, { Component } from 'react';
var moment = require('moment');

class WeatherDetails extends Component {
     
     render(){

        const { weather, main, wind, sys, name, dt } = this.props.currentweather;
        const units = this.props.units;
        let newDate = new Date();
        const weekday = dt * 1000;
        newDate.setTime(weekday);

        return (

            // Returns the component when the state updates with fetch response

            (this.props.currentweather) ? 
            (
                <div>
                    <div className="card weather-card card-lg animated fadeInUp">
                        <div className="card-body pb-3">
                            <h4 className="card-title font-weight-bold">{name}, {sys.country}</h4>
                            <p className="card-text">{moment(newDate).format('MMMM Do, h:mm a')}, {weather[0].description}</p>
                            <div className="d-flex justify-content-between">
                                <p className="display-1 degree center-temp">{units === "imperial" ? Math.round(main.temp) + "°F" : Math.round((Math.round(main.temp) - 32) * 5/9) + "°C" }</p>
                            </div>
                            <div className="d-flex justify-content-between mb-4 ">
                                <p><i className="fas fa-tint fa-lg text-info pr-2"></i>
                                    {
                                        (this.props.currentweather.rain) ? (Object.values(this.props.currentweather.rain)+"%") : ("0%")
                                    } Precipitation</p>
                                <p><i className="fas fa-leaf fa-lg grey-text pr-2"></i>{wind.speed} m/h Winds</p>
                            </div>

                            <div className="collapse-content">
                                <div className="collapse" id="collapseExample">
                                    <table className="table table-borderless table-sm mb-0">
                                        <tbody>
                                        {
                                            (this.props.fivedayweather) ? (
                                                
                                                this.props.fivedayweather.map(day=>{
                                                    return(
                                                        <tr key={day.dt}>
                                                            <td className="font-weight-normal align-middle">
                                                                {moment(day.dt * 1000).format('dddd')}</td>
                                                            <td className="float-right font-weight-normal">
                                                                <p className="mb-1">{units === "imperial" ? Math.round(main.temp) + "°F" : Math.round((Math.round(main.temp) - 32) * 5/9) + "°C" }<span className="text-muted"></span></p>
                                                            </td>
                                                            <td className="float-right mr-3">
                                                                <i className= {`owf owf-${day.weather[0].id} owf-2x`} ></i>
                                                            </td>
                                                        </tr>
                                                    )
                                                    }     
                                                )
                                            ) : (
                                                <div>
                                                Loading....
                                                </div>
                                            )

                                            
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <hr></hr>
                                <a className="btn btn-flat btn-cyan p-1 my-1 mr-0 mml-1 collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Five Day Forecast</a>
                            </div>
                        </div>
                    </div>
                </div>
                
            )
            
            : 
            
            (

            <div>
                Loading...
            </div>

            )
            
        )
    }
    
}

export default WeatherDetails
