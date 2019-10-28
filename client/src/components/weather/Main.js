import React from 'react';
import Titles from './Titles';
import Form from './Form';
import Weather from './Weather';
import Navbar from '../navbar/Navbar';
import axios from 'axios'


const API_KEY = 'e091fff3f8e3f791f442a48960501083';

class Main extends React.Component {

  state = {
    city:[],
    locations: [],
    temperature: [],
    humidity:[],
    forcasttemp:[],
    forecasttime:[]
  };

 
  
  async componentDidMount() {
    await axios.get("/api/location")
      .then(res => {
        const location = res.data;
        let count = Object.keys(location.results).length;
        console.log(count);
        this.setState({
          locations: location.results[count - 1]
        });
        console.log(this.state.locations);
      })

    await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.locations.Latitude}&lon=${this.state.locations.Longitude}&appid=${API_KEY}&units=metric`)
      .then(res => {
        const temp1 = res.data;
        console.log("temper:", temp1);
        this.setState({
          temperature: temp1.main.temp,
          humidity:temp1.main.humidity,
          city:temp1.name
        })
        console.log("temper:",this.state.temperature);
        console.log("humidity:",this.state.humidity);
      })

      let temperatures = [];
      let datetext = [];

    await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.locations.Latitude}&lon=${this.state.locations.Longitude}&appid=${API_KEY}&units=metric`)
      .then(res => {
        const temps = res.data;


        let wetherdata = temps.list;
        for (let i = 0; i < 6; i++) {
          temperatures.push(wetherdata[i].main.temp);
          datetext.push(wetherdata[i].dt_txt);
        }

        this.setState({
          forcasttemp:temperatures,
          forecasttime:datetext
        })       

        console.log("tempers:", temps)   
        
        console.log("temper1:",temperatures);
        console.log("date:",datetext);
      })
  }

  

  render() {
    let styles = {
      marginTop: '250px',
    };

    let forecastStyle = {
      width: '110px'
    };

    return (
      <div>
        <div className="wrapper">
          <div className="row">
            <div className=" col-sm-12 title-container">
              <Navbar />
            </div>
          </div>
          <div className="main">

            <div className="container">

              <div className="row" style={styles}>
                <div className="col-md-7 col-sm-12 form-container">
                  <div className="row">
                    <div class="forecast-container">

                      <div class="today forecast">
                        <div class="forecast-header">
                          <div class="day"></div>
                          <div class="date"></div>
                        </div>
                        <div class="forecast-content">
                          <div class="location">{this.state.city}</div>
                          <div class="degree">
                            <div class="num">{this.state.temperature}<sup>o</sup>C</div>
                            <div class="day">humidity:{this.state.humidity}</div>
                            <div class="forecast-icon">
                              <img src="assets/images/icons/icon-1.svg" alt="" width="90" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="forecast" style={forecastStyle}>
                        <div class="forecast-header">
                          <div class="day">{this.state.forecasttime[0]}</div>
                        </div>
                        <div class="forecast-content">
                          <div class="forecast-icon">
                            <img src="assets/images/icons/icon-3.svg" alt="" width="48" />
                          </div>
                          <div class="degree">{this.state.forcasttemp[0]}<sup>o</sup>C</div>
                        </div>
                      </div>

                      <div class="forecast" style={forecastStyle}>
                        <div class="forecast-header">
                          <div class="day">{this.state.forecasttime[1]}</div>
                        </div>
                        <div class="forecast-content">
                          <div class="forecast-icon">
                            <img src="assets/images/icons/icon-3.svg" alt="" width="48" />
                          </div>
                          <div class="degree">{this.state.forcasttemp[1]}<sup>o</sup>C</div>

                        </div>
                      </div>

                      <div class="forecast" style={forecastStyle}>
                        <div class="forecast-header">
                          <div class="day">{this.state.forecasttime[2]}</div>
                        </div>
                        <div class="forecast-content">
                          <div class="forecast-icon">
                            <img src="assets/images/icons/icon-3.svg" alt="" width="48" />
                          </div>
                          <div class="degree">{this.state.forcasttemp[2]}<sup>o</sup>C</div>

                        </div>
                      </div>

                      <div class="forecast" style={forecastStyle}>
                        <div class="forecast-header">
                          <div class="day">{this.state.forecasttime[3]}</div>
                        </div>
                        <div class="forecast-content">
                          <div class="forecast-icon">
                            <img src="assets/images/icons/icon-3.svg" alt="" width="48" />
                          </div>
                          <div class="degree">{this.state.forcasttemp[3]}<sup>o</sup>C</div>

                        </div>
                      </div>

                      <div class="forecast" style={forecastStyle}>
                        <div class="forecast-header">
                          <div class="day">{this.state.forecasttime[4]}</div>
                        </div>
                        <div class="forecast-content">
                          <div class="forecast-icon">
                            <img src="assets/images/icons/icon-3.svg" alt="" width="48" />
                          </div>
                          <div class="degree">{this.state.forcasttemp[4]}<sup>o</sup>C</div>

                        </div>
                      </div>

                      <div class="forecast" style={forecastStyle}>
                        <div class="forecast-header">
                          <div class="day">{this.state.forecasttime[5]}</div>
                        </div>
                        <div class="forecast-content">
                          <div class="forecast-icon">
                            <img src="assets/images/icons/icon-3.svg" alt="" width="48" />
                          </div>
                          <div class="degree">{this.state.forcasttemp[5]}<sup>o</sup>C</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;