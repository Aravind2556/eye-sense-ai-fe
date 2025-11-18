import React, { useState, useEffect } from 'react'
import LiveChart from '../blocks/LiveChart'

function Home() {

  // Think Speak one
  const [fieldOne, setFieldOne] = useState(null) // field 1 
  const [fieldTwo, setFieldTwo] = useState(null) // field 2

  const [recentfieldOneValue, setRecentFieldOneValue] = useState(null) // field 1
  const [recentfieldTwoValue, setRecentFieldTwoValue] = useState(null) // field 2
  const [recentfieldThreeValue, setRecentFieldThreeValue] = useState(null) // field 3
  const [recentfieldFourValue, setRecentFieldFourValue] = useState(null) // field 4
  const [recentfieldSixValue, setRecentFieldFiveValue] = useState(null) // field 5
  const [recentfieldSevenValue, setRecentFieldSixValue] = useState(null) // field 6

  // Think Speak Two
  const [thinkTowFieldOne, setThinkTowFieldOne] = useState(null) //field 1

  const [recentThinkTowFieldOneValue, setRecentThinkTowFieldOneValue] = useState(null) // field 1
  const [recentThinkTowFieldTwoValue, setRecentThinkTowFieldTwoValue] = useState(null) // field 2

  // Think Speak urls
  const url = process.env.REACT_APP_ThinkSpeak_URL // Think url one
  const urlTow = process.env.REACT_APP_ThinkSpeak_URL_Two // Think url Two

  // const clearValueRange = process.env.CLEAR_VALUE_RANGE 
  // const nirRange = process.env.NIR_RANGE 
  const rednessRange = process.env.RED_NESS_RANGE ?? 50
  // const moistureRange = process.env.MOISTURE_RANGE 
  const eyeTemperatureRange = process.env.EYE_TEMPERATRUE_RANGE ?? 35
  // const eyeFatigueRage = process.env.FATIGUE_RANGE 
  // const pepilDiameterRange = process.env.PEPIL_DIAMETER_RANGE 
  // const blinkCountRange = process.env.BLINK_COUNT_RANGE 

  const controls = {
    show: true,
    download: true,
    selection: false,
    zoom: false,
    zoomin: true,
    zoomout: true,
    pan: true,
    reset: true,
    zoomEnabled: true,
    autoSelected: 'zoom'
  };

  useEffect(() => {
    const fetchData = async () => {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log("data:", data)
          if (data && data.feeds && data.feeds.length > 0) {
            const xAxis = data.feeds.map(feed => new Date(feed.created_at).getTime())

            setFieldOne({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field1) || 0),
              color: "blue",
              seriesName: 'CLEAR VALUE'
            })

            setFieldTwo({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field2) || 0),
              color: "red",
              seriesName: 'NIR'
            })

            const recentFieldOneLevel = data.feeds.slice(-1)[0].field1.toUpperCase()
            setRecentFieldOneValue(recentFieldOneLevel)

            const recentFieldTwoLevel = data.feeds.slice(-1)[0].field2.toUpperCase()
            setRecentFieldTwoValue(recentFieldTwoLevel)

            const recentFieldThreeLevel = data.feeds.slice(-1)[0].field3.toUpperCase()
            setRecentFieldThreeValue(recentFieldThreeLevel)

            const recentFieldFourLevel = data.feeds.slice(-1)[0].field4.toUpperCase()
            setRecentFieldFourValue(recentFieldFourLevel)

            const recentFieldFiveLevel = data.feeds.slice(-1)[0].field5.toUpperCase()
            setRecentFieldFiveValue(recentFieldFiveLevel)

            const recentFieldSixLevel = data.feeds.slice(-1)[0].field6.toUpperCase()
            setRecentFieldSixValue(recentFieldSixLevel)

          }
          else {
            setFieldOne({
              "x-axis": [],
              "y-axis": [],
              color: "blue",
              seriesName: 'CLEAR VALUE'
            })
            setFieldTwo({
              "x-axis": [],
              "y-axis": [],
              color: "black",
              seriesName: 'NIR'
            })

            setRecentFieldOneValue("No Data")
            setRecentFieldTwoValue("No Data")
            setRecentFieldThreeValue("No Data")
            setRecentFieldFourValue("No Data")
            setRecentFieldFiveValue("No Data")
            setRecentFieldSixValue("No Data")
          }
        })
        .catch(err => {
          console.log("Error in fetching from Thinkspeak:", err)
        })
    };

    let intervalId
    if (url) {
      fetchData();
      // Optionally, set up polling for live data updates (e.g., every 30 seconds)
      intervalId = setInterval(fetchData, 5000);
    }
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [url]);


  useEffect(() => {
    const fetchData = async () => {
      fetch(urlTow)
        .then(res => res.json())
        .then(data => {
          console.log("data:", data)
          if (data && data.feeds && data.feeds.length > 0) {
            const xAxis = data.feeds.map(feed => new Date(feed.created_at).getTime())

            setThinkTowFieldOne({
              "x-axis": xAxis,
              "y-axis": data.feeds.map(feed => Number(feed.field1) || 0),
              color: "green",
              seriesName: 'Pupil Diameter'
            })

            const recentThinkTowFieldOneLevel = data.feeds.slice(-1)[0].field1.toUpperCase()
            setRecentThinkTowFieldOneValue(recentThinkTowFieldOneLevel)

            const recentThinkTowFieldTwoLevel = data.feeds.slice(-1)[0].field2.toUpperCase()
            setRecentThinkTowFieldTwoValue(recentThinkTowFieldTwoLevel)

          }
          else {
            setThinkTowFieldOne({
              "x-axis": [],
              "y-axis": [],
              color: "white",
              seriesName: 'Pupil Diameter'
            })

            setRecentThinkTowFieldOneValue("No Data")
            setRecentThinkTowFieldTwoValue("No Data")
          }
        })
        .catch(err => {
          console.log("Error in fetching from Thinkspeak:", err)
        })
    };

    let intervalId
    if (urlTow) {
      fetchData();
      // Optionally, set up polling for live data updates (e.g., every 30 seconds)
      intervalId = setInterval(fetchData, 5000);
    }

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [urlTow]);



  if (!fieldOne || !fieldTwo || !thinkTowFieldOne) {
    return <div>Loading...</div>
  }

  return (
    <div className="mx-auto space-y-10 md:px-10 px-2 mb-10">
      <div className="flex flex-col md:flex-row md:justify-evenly gap-6 mt-6 w-full">

        {/* Left Section → Current Values */}
        <div className="w-full md:w-1/2 lg:w-2/3">

          <div className="border rounded-2xl shadow-md bg-white w-full p-4">

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Current Values
              </h2>

              <div className="flex items-center gap-6">
                {/* Warning */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <p className="text-sm text-gray-700 font-medium">Warning</p>
                </div>

                {/* Normal */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary-400"></span>
                  <p className="text-sm text-gray-700 font-medium">Normal</p>
                </div>
              </div>
            </div>




            <div className="text-center text-primary-950 font-bold text-2xl mb-6 tracking-wide uppercase">
              WEAR 2 SENSE
            </div>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

              <CardRow
                label="Clear value"
                value={recentfieldOneValue}
                className="bg-primary-100"

              />

              <CardRow
                label="NIR"
                value={recentfieldTwoValue}
                className="bg-primary-100"
              />

              <CardRow
                label="Redness"
                value={recentfieldThreeValue}
                className={
                  Number(recentfieldThreeValue) >= Number(rednessRange)
                    ? "bg-red-500"
                    : "bg-primary-100"
                }
              />

              <CardRow
                label="Moisture"
                value={recentfieldFourValue}
                className="bg-primary-100"

              />

              <CardRow
                label="Eye temperature"
                value={recentfieldSixValue}
                className={
                  Number(recentfieldSixValue) >= Number(eyeTemperatureRange)
                    ? "bg-red-500"
                    : "bg-primary-100"
                }
              />

              <CardRow
                label="Fatigue"
                value={recentfieldSevenValue}
                className="bg-primary-100"
              />

              <CardRow
                label="Pupil Diameter"
                value={recentThinkTowFieldOneValue}
                className="bg-primary-100"
              />

              <CardRow
                label="Blink count"
                value={recentThinkTowFieldTwoValue}
                className="bg-primary-100"
              />

            </div>
          </div>
        </div>

        {/* Right Section → Alert */}
        {/* <div className="w-full md:w-1/2 lg:w-1/3">
          <div className="border bg-white px-10 py-10 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Alert</h2>

          
          </div>
        </div> */}

      </div>


      {/* Charts Section */}
      <div className="flex flex-wrap justify-center md:justify-between gap-4">
        {[fieldOne, fieldTwo, thinkTowFieldOne].map(
          (chartData, i) => (
            <div
              key={i}
              className="
          w-full md:w-[48%] 
          bg-white rounded-2xl p-4 
          transition-all duration-300 
          hover:-translate-y-1 shadow shadow-primary-300
        "
            >
              {/* Title */}
              <h3 className="text-center font-semibold text-primary-600 mb-3 text-lg">
                {chartData.seriesName}
              </h3>

              {/* Chart Component */}
              <LiveChart
                data={[chartData]}
                lineStyle={"straight"}
                lineWidth={1}
                chartType={"line"}
                controls={controls}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Home


const CardRow = ({ label, value, className }) => (
  <div className={` shadow-lg rounded-2xl p-4 w-full max-w-sm mx-auto bg-white`}>
    <ul className="text-gray-700 text-base font-medium">
      <li className="flex justify-between">
        <span className="font-semibold">{label}</span>
        <span className={`${className} text-primary-900 text-white py-1 px-4 rounded-xl`}>{value}</span>
      </li>
    </ul>
  </div>
);


