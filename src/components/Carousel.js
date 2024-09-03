import React from 'react'
import {makeStyles} from '@material-ui/core/styles'; 
import axios from 'axios';
import { useState,useEffect } from 'react';
import {TrendingCoins} from '../../src/config/api';
import { CryptoState } from '../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import { trendingdata,tabledata } from '../config/coinsdata';

const useStyles=makeStyles((theme)=>({

    carousel:{
        height:"50%",
        display:"flex",
        alignItems:"center",
    },
    carouselItem:{
       display:"flex",
       flexDirection:"column",
       alignItems:"center",
       cursor:"pointer",
       textTransform:"uppercase",
       color:"white",
    },
  
}))

export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const Carousel = () => {
  const [trending,settrending]=useState([]);
  const classes=useStyles();
  
  const {currency,symbol}=CryptoState();
  const fetchTrendingCoins=async()=>{
    //const {data}=await axios.get(TrendingCoins(currency));
    const data = trendingdata();
    settrending(data);
  }
  //console.log("main");
  useEffect(()=>{
    //console.log("changed");
    fetchTrendingCoins();
  },[currency]);
  //console.log(trending);
  const items =trending.map((it)=>{
    let profit=it.price_change_percentage_24th>=0; 
    
    return(<Link
     className={classes.carouselItem}
     to={'/coins/${it.id}'}>
     <img
     src={it?.image}
     alt={it.image}
     height="80"
     style={{marginBottom:10}} />
     <span>
      {it?.symbol}
      &nbsp;
      <span style={{
        color:profit>0?"rgb(14,203,129)" : "red",
        fontWeight:500,
      }}>
      {profit && "+"} {it?.price_change_percentage_24h?.toFixed(2)}%
      </span>
     </span>
     <span style={{fontSize:22 ,fontWeight:500 ,color:"black",}}>
     {symbol}{numberWithCommas(it?.current_price.toFixed(2))}
      </span>
     </Link>);
  }
   );
  const responsive={
    0:{
      items:2,
    },
    512:{
      items:4,
    },
  };
  return (
    <div className={classes.carousel}>
      <AliceCarousel
       mouseTracking 
       infinite
       autoPlayInterval={1000}
       animationDuration={1500}
       disableDotsControls
       disableButtonsControls
       responsive={responsive}
       autoPlay
       items={items}

      />
    </div>
  )
}

export default Carousel


