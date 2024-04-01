import { useEffect, useState } from "react";



export default function Index() {
    const [country, setCountry] = useState("istanbul");
    const [data, setData] = useState();
    const [inputvalue, setInputvalue] = useState();
    const [inputbtn, setinputBtn] = useState(false); 

    const key = "e30bf81ae98c4350aa8110842241503";
    const api =`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${country}&days=7`;
    
    useEffect(()=> {
        
    const getData = async () =>{

        try {
            const response = await fetch(api) 
            const json = await response.json();
            setData(json);
            console.log(data);
            console.log(json);

        }catch(error){
            console.error("hatta",error);
            
        }
    }
    getData();
    },[country]);

   
    const isRain = data && data.forecast.forecastday.map((x) => { return( x.day.daily_chance_of_rain >= 50  ? true  : false )});
    // console.log(isRain[0]);
  
    const handleChage = (e) => {
        setInputvalue( e.target.value );
    } 

    const onSearch = () => {
        setinputBtn(!inputbtn)
        inputbtn ? setCountry(inputvalue): null;
    } 
    
    return (
        <>
          <div className="container">
            <div className="top-main">
            <h1 className="header-text" style={{textAlign:"justify"}}>Havadurumu</h1>
                <div className="headerbtn">
                    <input className="inputSearch" style={{width:inputbtn ? "" : "0px"}} onChange={(e)=> handleChage(e)} type="text" />
                    <button onClick={onSearch}><img src="/src/img/search-alt-2-regular-24.png" alt="" /></button>
                </div>
                <p style={{display: isRain && isRain[0] ? "block" : "none"}}> <video autoPlay  loop muted><source style={{ width: "200px", visibility: isRain && isRain[0] ? "visible" : "hidden" }} src="/src/img/125753 (360p).mp4" type="video/mp4"></source></video></p>
                <p style={{display: isRain && isRain[0] ? "none" : "block"}}> <video autoPlay  loop muted><source style={{ width: "200px", visibility: isRain && isRain[0] ? "visible" : "hidden" }} src="/src/img/tree_-_3257 (360p).mp4" type="video/mp4"></source></video></p>

                {data ? <div className="day-main">
                    <h1 className="main-text">{data.location.name}</h1>
                    <img src={data.current.condition.icon}></img>
                    <h1>{data.current.last_updated.slice(0,11)}</h1>
                    <h2> Sıcaklık: {data.current.temp_c}°</h2>
                    <h2>Yağışmiktarı: % {data.forecast.forecastday[0].day.daily_chance_of_rain}</h2>
                </div> :""}
                
                
                
                <div className="forcast">
                {data ?  (data.forecast.forecastday.map((x,i)=> {
                        return(
                            i != 0 ?
                            
                            (
                            <div className="data-container" key={i}>
                                <div className="xname">
                                    <p style={{display: isRain && isRain[i] ? "block" : "none"}}> <video autoPlay  loop muted><source style={{ width: "200px", visibility: isRain && isRain[0] ? "visible" : "hidden" }} src="/src/img/125753 (360p).mp4" type="video/mp4"></source></video></p>
                                    <p style={{display: isRain && isRain[i] ? "none" : "block"}}> <video autoPlay  loop muted><source style={{ width: "200px", visibility: isRain && isRain[0] ? "visible" : "hidden" }} src="/src/img/tree_-_3257 (360p).mp4" type="video/mp4"></source></video></p>
                                </div>
                                <div className="data-content">
                                    <h3>{x.date}</h3>
                                    <img src={x.day.condition.icon} alt="" />
                                    <h3>Sıcaklık: {x.day.avgtemp_c}°</h3>
                                    <h3>Yağışmiktarı: % {x.day.daily_chance_of_rain} </h3>
                                </div>
                            </div>
                        ) : null
                        )
                    })) :"Yükleniyor"}
                </div>
            </div>
          </div>
        </>
    )
}