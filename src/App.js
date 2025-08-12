import React, {useState} from 'react';
import './index.css';

const AQI_BREAKPOINTS = [
  {value:0, color:'#01E400'},    // Green
  {value:50, color:'#FFFF00'},   // Yellow
  {value:100, color:'#FF7E00'},  // Orange
  {value:150, color:'#FF0000'},  // Red
  {value:200, color:'#8F3F97'},  // Purple
  {value:300, color:'#7E0023'}   // Maroon
];

const App = () => {
  const [yesterdayData] = useState({min:51, avg:175, max:200});
  const [past7DaysData] = useState({min:21, avg:145, max:295});
  const [forecastInfo] = useState({
    title:'Smoke Outlook',
    location:'North Central Arizona - Dragon Bravo',
    issued:'07/14/2025 08:37 (PDT)',
    image:'blank.png'
  });
  const [selectedDay, setSelectedDay] = useState('Today');

  const renderAQIBar = (min, avg, max) => {
    // Ensure breakpoints cover the range
    let extendedBreakpoints = [{value:min, color: getColorForValue(min)}];
    for (let bp of AQI_BREAKPOINTS) {
      if (bp.value > min && bp.value < max) extendedBreakpoints.push(bp);
    }
    extendedBreakpoints.push({value:max, color:getColorForValue(max)});

    // Create segments
    const segments = [];
    for (let i = 0; i < extendedBreakpoints.length - 1; i++) {
      const start = extendedBreakpoints[i];
      const end = extendedBreakpoints[i + 1];
      const widthPercent = ((end.value - start.value) / (max - min)) * 100;
      segments.push(<div key={i} style={{backgroundColor:start.color, width:`${widthPercent}%`}}></div>);
    }

    const avgLeft = ((avg - min) / (max - min)) * 100;

    return (
      <div className="aqi-bar-container">
        <div className="avg-marker" style={{left:`${avgLeft}%`}}>▼</div>
        <div className="avg-label" style={{left:`${avgLeft}%`}}>Average</div>
        <div className="bar">
          <div className="bar-color">{segments}</div>
        </div>
        <div className="bar-values">
          <span>{min}</span>
          <span style={{left:`${avgLeft}%`}} className="bar-avg-value">{avg}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  };

  const getColorForValue = (value) => {
    for (let i = AQI_BREAKPOINTS.length - 1; i >= 0; i--) {
      if (value >= AQI_BREAKPOINTS[i].value) return AQI_BREAKPOINTS[i].color;
    }
    return AQI_BREAKPOINTS[0].color;
  };

  return (
    <div className="widget-container">
      <h2 className="title">Air Quality</h2>
      <div className="divider"></div>
      <div className="widget-content">
        <div className="left-section">
          <div className="outlook-card">
            <img src={forecastInfo.image} alt="Forecast" className="outlook-icon" />
            <div className="outlook-text">
              <h3>{forecastInfo.title}</h3>
              <p>{forecastInfo.location}</p>
              <p><strong>Forecast Issued:</strong> {forecastInfo.issued}</p>
            </div>
            <a href="#" className="external-link">↗</a>
          </div>

          <div className="data-section">
            <h4 style={{marginTop:'50px'}}>Yesterday</h4>
            {renderAQIBar(yesterdayData.min, yesterdayData.avg, yesterdayData.max)}

            <h4 style={{marginTop:'50px'}}>Past 7 Days</h4>
            {renderAQIBar(past7DaysData.min, past7DaysData.avg, past7DaysData.max)}
          </div>
        </div>

        <div className="right-section">
          <div className="map-header">
            <h4>Max Observed NowCast PM2.5</h4>
            <div className="day-buttons">
              <button className={selectedDay === 'Today' ? 'active' : ''} onClick={() => setSelectedDay('Today')}>Today</button>
              <button className={selectedDay === 'Yesterday' ? 'active' : ''} onClick={() => setSelectedDay('Yesterday')}>Yesterday</button>
            </div>
          </div>
          <div className="map-container">
            <img src="blank.png" alt="Map" className="map-image" />
          </div>
          <p className="update-time">Updated 2 min ago</p>
        </div>
      </div>
    </div>
  );
};

export default App;