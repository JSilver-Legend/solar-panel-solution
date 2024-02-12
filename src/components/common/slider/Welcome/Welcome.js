import React from 'react';
import {withRouter} from "react-router-dom";
import Slider from "react-slick";

import {
  Page,
  PageTitle,
  PageSubtitle,
  PageSection,
  PageIconContainer,
  TextSection,
  Typography
} from 'components/common';
import {Employee,Employees,NavCard,Quote} from 'components/welcome';
import {Grid} from '@material-ui/core';

import routes from 'constants/routes';

import strings from 'assets/texts/welcome'
import background from 'assets/backgrounds/BG_Welcome_new.png';
import icecreamIcon from  'assets/icons/Pineapple.png';
import employees from 'assets/welcome/employees';
import quotes from 'assets/welcome/quotes';

import ElisbethPic from 'assets/welcome/BILD.jpg_0000_Lager-5.png';
import Image003Pic from 'assets/welcome/BILD.jpg_0001_Lager-4.png';
import jesperPic from 'assets/welcome/BILD.jpg_0002_Lager-2.png';
import MartinPic from 'assets/welcome/Martin_2_0006_Lager-12.png';

import UlrikaPic from 'assets/welcome/BILD.jpg_0003_Lager-11.png';
import AslıPic from 'assets/welcome/BILD.jpg_0005_Lager-7.png';
import GustavPic from 'assets/welcome/BILD.jpg_0004_Lager-9.png';

import smallImages from 'assets/backgrounds/small-backgrounds';

const Welcome = ({history,...props}) => {

  function routeTo(url){
    history.push(url);
  }

  const quoteSliderSettings = {
     speed: 3000,
     slidesToShow: 1,
     slidesToScroll: 1,
     fade: true,
     autoplay: true,
     autoplaySpeed: 6000,
     infinite: true,
     dots:true
   }

  return (
    <Page backgroundUrl={background}>
      <PageSection largePadding>
      <PageSubtitle paragraph={false}>{strings.subtitletop}</PageSubtitle>
        <PageTitle>{strings.title}</PageTitle>
        <PageSubtitle paragraph={false}>{strings.subtitle}</PageSubtitle>
      </PageSection>

      <PageSection largePadding background={"#179AAA"} >
        <PageIconContainer iconSize="large"  iconUrl={icecreamIcon}>
          <Typography paragraph variant="subtitle1" style={{color:"#FFFFFF"}}>{strings.iconBox.text1}</Typography>
          {/* <Typography paragraph variant="body1">{strings.iconBox.text2}</Typography> */}
        </PageIconContainer>
      </PageSection>

      <PageSection fullWidth>
        <Employees>
          <Employee profileUrl={ElisbethPic} name={employees.employees[0].name} statement={employees.employees[0].statement} />
          <Employee profileUrl={MartinPic} name={employees.employees[1].name} statement={employees.employees[1].statement} />
          <Employee profileUrl={Image003Pic} name={employees.employees[2].name} statement={employees.employees[2].statement} />
          <Employee profileUrl={jesperPic} name={employees.employees[3].name} statement={employees.employees[3].statement} />
       
           <Employee profileUrl={UlrikaPic} name={employees.employees[4].name} statement={employees.employees[4].statement} />
          <Employee profileUrl={AslıPic} name={employees.employees[5].name} statement={employees.employees[5].statement} /> 
          <Employee profileUrl={GustavPic} name={employees.employees[6].name} statement={employees.employees[6].statement} /> 
        </Employees>
      </PageSection>

      <TextSection
        largePadding
        title={strings.chapters.title}
        texts={strings.chapters.text}
      />

      <PageSection>
        <Grid container spacing={4}>
        {routes.map((route,i) => (
          <Grid key={i} item xs={12} sm={4}>
            <NavCard
              onClick={() => routeTo(route.url)}
              image={smallImages[i]}
              title={route.name}
              description={route.description} />
          </Grid>
          )
        )}
        </Grid>
      </PageSection>

      {/* <PageSection style={{margin:'128px 0'}}>
        <Slider {...quoteSliderSettings}>
          {quotes.map((q,i) => (
            <Quote key={i} quote={q.quote} caption={q.caption} />
          ))}
        </Slider>
      </PageSection> */}
    </Page>
  )
}

export default withRouter(Welcome);
