import React, { useEffect } from "react";
import { Typography } from "antd";
import logo from '../../../assets/star.png';
import styles from "./cookie.module.scss";

const Button = ({ ...props }) => {
  useEffect(() => {
    var cookieSeen = localStorage.getItem("cookieSeen");

    if(typeof(cookieSeen) === "undefined" || cookieSeen === null || cookieSeen === ""){
      document.getElementById("cookieWarningContainer").style.display = "unset";
    }
  })

  function disableCookiePopup() {
    localStorage.setItem("cookieSeen", "true");
    document.getElementById("cookieWarningContainer").style.display = "none";
  }
  
  return (
    <div id="cookieWarningContainer" style={{display: "none"}}>
      <div id="cookieWarning" className={styles["cookie"]} >
        <Typography.Paragraph className={styles["info-text"]} style={{textAlign: "center"}}>
          Vi använder cookies för att optimera vår webbplats för en bättre kundupplevelse. Genom att använda webbplatsen godkänner du att vi använder cookies. <a href="about:blank" target="_blank" rel="noopener noreferrer" style={{textDecoration: "underline"}}>Läs mer om cookies</a> eller <span className={styles.cookiesButton} onClick={() => disableCookiePopup()}> klicka här</span> för att gömma detta meddelande.
        </Typography.Paragraph>
      </div>

      <a href="about:blank">
        <img className={styles.cookieLogo} src={logo} alt="logo" />
      </a>
    </div>
  );
};

export default Button;
