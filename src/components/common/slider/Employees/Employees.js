import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  NextArrow,
  PrevArrow,
  Slider
} from 'components/common';

const useStyles = makeStyles(theme => ({
  root:{
    margin:'16px ' + theme.margins.paddingLarge,
    display:'flex',
    alignItems:'flex-start',
    justifyContent:'space-evenly',
    flexDirection:'row',
    position:'relative'
  }
}))

const Employees = ({children, ...props}) => {
  const classes = useStyles();
  const settings = {
     speed: 1000,
     slidesToShow: 3,
     slidesToScroll: 2,
     dots:true,
     autoplay:true,
     nextArrow: <NextArrow />,
     prevArrow:<PrevArrow />,
     responsive: [{
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        center:false,
        dots:true,
      }
    }]
   };

  return (
    <Slider
      {...settings}
      className={classes.root}>
      {children}
    </Slider>
  )
}

export default Employees;
