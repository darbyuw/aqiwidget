import React, {useState} from 'react';
import './index.css';
import Image from './images/Logo.png';
import mapToday from './images/map-today.png';
import mapYesterday from './images/map-yesterday.png'

const AQI_BREAKPOINTS = [
  {value:0, color:'#01E400'},    // Green
  {value:50, color:'#FFFF00'},   // Yellow
  {value:100, color:'#FF7E00'},  // Orange
  {value:150, color:'#FF0000'},  // Red
  {value:200, color:'#8F3F97'},  // Purple
  {value:300, color:'#7E0023'}   // Maroon
];

const App = () => {
  const [yesterdayData] = useState({min:54, avg:175, max:200});
  const [past7DaysData] = useState({min:21, avg:145, max:295});
  const [forecastInfo] = useState({
    title:'Smoke Outlook',
    location:'NW New Mexico/SW Colorado',
    issued:'8/13/2025 06:55 (PDT)',
    image: Image
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
        <div className="min-label" style={{left:`0`}}>Min.</div>
        <div className="avg-marker" style={{left:`${avgLeft}%`}}>▼</div>
        <div className="avg-label" style={{left:`${avgLeft}%`}}>Average</div>
        <div className="max-label" style={{right:`0`}}>Max.</div>
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

          <a href="https://outlooks.airfire.org/outlook/18d97a5d?">
          <div className="outlook-card">
            <img src={forecastInfo.image} alt="Forecast" className="outlook-icon" />
            <div className="outlook-text">
              <h3 style={{fontSize: '20px'}}>{forecastInfo.title}</h3>
              <p style={{fontSize: '14px'}}>{forecastInfo.location}</p>
              <p style={{fontSize: '14px'}}>Forecast Issued: <strong>{forecastInfo.issued}</strong> </p>
            </div>
            <p className="external-link"> <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                <mask id="path-1-inside-1_1259_691" fill="white">
                <path d="M7.14551 3.49121H1.41895C1.08691 3.49131 0.817486 3.76074 0.817383 4.09277V11.5732C0.817383 11.9054 1.08684 12.1747 1.41895 12.1748H8.89941C9.2316 12.1748 9.50098 11.9054 9.50098 11.5732V5.74121H10.3193V11.5732L10.3115 11.7188C10.2437 12.3867 9.71283 12.9175 9.04492 12.9854L8.89941 12.9932H1.41895L1.27441 12.9854C0.558634 12.9128 0 12.3081 0 11.5732V4.09277C0.000103749 3.30916 0.63533 2.67393 1.41895 2.67383H7.14551V3.49121Z"/>
                </mask>
                <path d="M7.14551 3.49121H1.41895C1.08691 3.49131 0.817486 3.76074 0.817383 4.09277V11.5732C0.817383 11.9054 1.08684 12.1747 1.41895 12.1748H8.89941C9.2316 12.1748 9.50098 11.9054 9.50098 11.5732V5.74121H10.3193V11.5732L10.3115 11.7188C10.2437 12.3867 9.71283 12.9175 9.04492 12.9854L8.89941 12.9932H1.41895L1.27441 12.9854C0.558634 12.9128 0 12.3081 0 11.5732V4.09277C0.000103749 3.30916 0.63533 2.67393 1.41895 2.67383H7.14551V3.49121Z" fill="black"/>
                <path d="M7.14551 3.49121V4.30886H7.96316V3.49121H7.14551ZM1.41895 3.49121L1.41895 2.67356L1.41869 2.67356L1.41895 3.49121ZM0.817383 4.09277L-0.000271142 4.09252V4.09277H0.817383ZM1.41895 12.1748L1.41869 12.9925H1.41895V12.1748ZM9.50098 5.74121V4.92356H8.68332V5.74121H9.50098ZM10.3193 5.74121H11.137V4.92356H10.3193V5.74121ZM10.3193 11.5732L11.1358 11.6171L11.137 11.5952V11.5732H10.3193ZM10.3115 11.7188L11.125 11.8014L11.127 11.782L11.128 11.7626L10.3115 11.7188ZM9.04492 12.9854L9.08876 13.8018L9.10818 13.8008L9.12753 13.7988L9.04492 12.9854ZM8.89941 12.9932V13.8108H8.92135L8.94325 13.8096L8.89941 12.9932ZM1.41895 12.9932L1.37481 13.8096L1.39686 13.8108H1.41895V12.9932ZM1.27441 12.9854L1.19201 13.7988L1.21111 13.8008L1.23028 13.8018L1.27441 12.9854ZM0 4.09277L-0.817654 4.09267V4.09277H0ZM1.41895 2.67383L1.41895 1.85617L1.41884 1.85617L1.41895 2.67383ZM7.14551 2.67383H7.96316V1.85617H7.14551V2.67383ZM7.14551 3.49121V2.67356H1.41895V3.49121V4.30886H7.14551V3.49121ZM1.41895 3.49121L1.41869 2.67356C0.635274 2.6738 -2.64811e-05 3.3091 -0.000271102 4.09252L0.817383 4.09277L1.63504 4.09303C1.635 4.21237 1.53854 4.30883 1.4192 4.30886L1.41895 3.49121ZM0.817383 4.09277H-0.000271142V11.5732H0.817383H1.63504V4.09277H0.817383ZM0.817383 11.5732H-0.000271142C-0.000271142 12.3572 0.635462 12.9922 1.41869 12.9925L1.41895 12.1748L1.4192 11.3572C1.53822 11.3572 1.63504 11.4535 1.63504 11.5732H0.817383ZM1.41895 12.1748V12.9925H8.89941V12.1748V11.3572H1.41895V12.1748ZM8.89941 12.1748V12.9925C9.68318 12.9925 10.3186 12.357 10.3186 11.5732H9.50098H8.68332C8.68332 11.4539 8.78003 11.3572 8.89941 11.3572V12.1748ZM9.50098 11.5732H10.3186V5.74121H9.50098H8.68332V11.5732H9.50098ZM9.50098 5.74121V6.55886H10.3193V5.74121V4.92356H9.50098V5.74121ZM10.3193 5.74121H9.50168V11.5732H10.3193H11.137V5.74121H10.3193ZM10.3193 11.5732L9.50286 11.5294L9.49505 11.6749L10.3115 11.7188L11.128 11.7626L11.1358 11.6171L10.3193 11.5732ZM10.3115 11.7188L9.49805 11.6361C9.46945 11.9178 9.24399 12.1433 8.96231 12.1719L9.04492 12.9854L9.12753 13.7988C10.1817 13.6918 11.0179 12.8555 11.125 11.8014L10.3115 11.7188ZM9.04492 12.9854L9.00108 12.1689L8.85558 12.1767L8.89941 12.9932L8.94325 13.8096L9.08876 13.8018L9.04492 12.9854ZM8.89941 12.9932V12.1755H1.41895V12.9932V13.8108H8.89941V12.9932ZM1.41895 12.9932L1.46308 12.1767L1.31855 12.1689L1.27441 12.9854L1.23028 13.8018L1.37481 13.8096L1.41895 12.9932ZM1.27441 12.9854L1.35682 12.1719C1.0545 12.1412 0.817654 11.8844 0.817654 11.5732H0H-0.817654C-0.817654 12.7319 0.0627706 13.6845 1.19201 13.7988L1.27441 12.9854ZM0 11.5732H0.817654V4.09277H0H-0.817654V11.5732H0ZM0 4.09277L0.817654 4.09288C0.817698 3.76076 1.08693 3.49153 1.41905 3.49148L1.41895 2.67383L1.41884 1.85617C0.183728 1.85634 -0.81749 2.85756 -0.817654 4.09267L0 4.09277ZM1.41895 2.67383V3.49148H7.14551V2.67383V1.85617H1.41895V2.67383ZM7.14551 2.67383H6.32785V3.49121H7.14551H7.96316V2.67383H7.14551Z" fill="black" mask="url(#path-1-inside-1_1259_691)"/>
                <path d="M5.02246 7.97852L12.0003 1.00066" stroke="black" stroke-width="0.817654" stroke-linecap="round"/>
                <path d="M11.9941 4.34766V1.00096" stroke="black" stroke-width="0.817654" stroke-linecap="round"/>
                <path d="M8.64648 1L11.9932 1" stroke="black" stroke-width="0.817654" stroke-linecap="round"/>
                </svg></p>
          </div>
          </a>

          <div className="data-section">
            <h4 style={{marginBottom:'50px', fontSize: '20px'}}>Yesterday</h4>
            {renderAQIBar(yesterdayData.min, yesterdayData.avg, yesterdayData.max)}

            <h4 style={{marginBottom:'50px', fontSize: '20px'}}>Past 7 Days</h4>
            {renderAQIBar(past7DaysData.min, past7DaysData.avg, past7DaysData.max)}
          </div>
        </div>

        <div className="right-section">
          <div className="map-header">
            <h4 style={{fontWeight: '400'}}>Max Observed NowCast PM2.5</h4> 
          </div>
          <div className="map-container">
             <img 
              src={selectedDay === 'Today' ? mapToday : mapYesterday} 
              alt="Map" 
              className="map-image" 
            /> {/* TODO: Intsert embedded map here! */}
            <div className="update-time">
            <p>Updated 2 min ago</p>
            </div>
          </div>
          <div className="day-buttons">
            <div className="Yesterday">
              <button className={selectedDay === 'Yesterday' ? 'active' : ''} onClick={() => setSelectedDay('Yesterday')}>Yesterday</button>
            </div>
            <div className="Today">              
              <button className={selectedDay === 'Today' ? 'active' : ''} onClick={() => setSelectedDay('Today')}>Today</button>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default App;