import './newsNav.css'
import React, { useState, useEffect } from 'react'

export const NewsNav = (props) => {
  const[isPressed, setIsPressed] = useState(false);
    const elements = props.topicsList.map(item => {
        /*return (
            <li>
                <a href = "#"
                onClick={async () => {
                    const response = await fetch("/change_topic", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({topic: item})
                    }).then(
                      res => res.json()
                    ).then(
                      data => {
                        console.log(data.articles)
                        props.onNewTopic(data);
                
                      }
                    );
        
                    
                  }}>{item}</a>
            </li>
        );*/

        return (
          <li>
              <a href = "#"
              onClick={() => {
                fetch("http://localhost:5050/articles/" + item + "/").then(
                  res => res.json()
                ).then(
                  data => {
                    console.log(data);
                    props.onNewTopic(data);
            
                  }
                )
      
                  
                }}>{item}</a>
          </li>
      );
    });
    return(
      
      <div class="dropdown">
        <button class="dropdown-btn"  
        onClick = {() => {
          setIsPressed(!isPressed)
          console.log(isPressed);
        }}>
          <span>Topics</span>
          <span class="arrow"></span>
        </button>
        {
          isPressed && 
          <ul class="dropdown-content" role="menu" id="dropdown-menu">
            {elements}
          </ul>
        }
        
        <script>
          
        </script>
      </div>
      

        /*<div class="css-umysuv">
            <ul class="css-397oyn">
                {elements}
            </ul>
        </div>*/
    )
    

};

