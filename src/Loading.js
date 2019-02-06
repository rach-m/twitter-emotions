import React from "react";
import "./App.css"

function Loading (){



  return(
    < div style = {
      {
        background: 'black',
        height: "100vh",
        width: "100vw",
        color: "lightgrey",
        textAlign: "center",

      }
    } >
      < div style = {
        {
          paddingTop: "150px",
          paddingBottom: "150px"
        }
      } >
      <p>This is an emotional representation of the</p>
        < p >world 's state based on live tweets </p>
      </div>

    < div class = "large progress" > < div > Loading… </div></div >
</div>
  )
}

export default Loading;
