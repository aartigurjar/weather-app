import React, { Component } from 'react';
import ChangeUnits from './ChangeUnits';
import WeatherDetails from './weatherDetails';
import toastr from 'toastr'; // To display the warning when user enters invalid location

class SearchLocation extends Component {

    state = {
        location: '',
        currentweather: '',
        fivedayweather:'',
        units: 'imperial',
        submitted: false
    }

    // function to set state when user toggles units

    toggleDegree = (e) => {

        this.setState({
          units: e.target.value
        })
        
    }

    // function to update state when user enters location

    handleChange=(e)=>{

        this.setState({
             location : e.target.value
            })
 
    }
 
    // function to make fetch request when user submits location

    handleSubmit = (e) => {
        
        e.preventDefault();
        const currentweatherURL = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&units=imperial&APPID=1c36bd3eeb515ec7acb402b1a8165ce2`;
        const fivedayweatherURL=`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${this.state.location}&units=imperial&appid=1c36bd3eeb515ec7acb402b1a8165ce2`;
        
        Promise.all([fetch(currentweatherURL),fetch(fivedayweatherURL)])
        
        .then(([res1, res2]) => {

            return Promise.all([res1.json(), res2.json()]) 

        })
        .then(([res1, res2]) => {

            const fivedayweather=res2.list.filter(day=>day.dt_txt.includes("18:00:00"));
            this.setState({
                currentweather:res1,
                fivedayweather: fivedayweather,
                submitted: true
            })
        })
        .catch((error) => {
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-bottom-full-width",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "1000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
              }
            toastr["error"]("Please enter valid location!", "Warning");
            
          });
    }    
        
    render() {
        return (
                
                <div id="main-section">
                    <form onSubmit= {this.handleSubmit.bind(this)}>
                        <div className="md-form active-cyan-2 mb-3" id="search-input">
                            <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleChange} />
                        </div>
                        <button type="button" className="btn btn-cyan" id="search-btn">Get Weather Details   <i className="fa fa-paper-plane"></i> </button>
                    </form>   

                {/* Loading following components when user submits location */}
                    {
                        this.state.submitted && 
                            <div>
                                <ChangeUnits units={this.state.units} toggleDegree={this.toggleDegree} /> 
                                <WeatherDetails units={this.state.units} currentweather={this.state.currentweather} fivedayweather={this.state.fivedayweather} />
                            </div>
                    
                    }  
                </div>
        )
    }
}

export default SearchLocation
