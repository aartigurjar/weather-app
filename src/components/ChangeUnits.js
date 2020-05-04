import React from 'react';

const ChangeUnits = (props) => {
    return (
            <div className="container" id="radio-units">
                <div className="form-check form-check-inline">
                    <input type="radio" onChange={props.toggleDegree} checked={props.units === "metric"}  className="with-gap" name="degree-type" id="celsius" value="metric" />
                    <span><label id="label-units" htmlFor="celsius">Celsius</label></span>
                </div>
                <div className="form-check form-check-inline">
                    <input type="radio" onChange={props.toggleDegree} checked={props.units === "imperial"} name="degree-type" id="farenheit" value="imperial" />
                    <span><label id="label-units" htmlFor="fahrenheit">Fahrenheit</label></span>
                </div>
            </div>
    )
}

export default ChangeUnits;