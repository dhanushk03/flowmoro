import React from "react"
import './newsNav.css'

export const NewsNav = (props) => {
    const elements = props.topicsList.map(item => {
        return (
            <li class="css-cwdrld">
                <a class="css-1wjnrbv" href = "javascript:;"
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
        );
    });
    
    return(

        <div class="css-umysuv">
            <ul class="css-397oyn">
                {elements}
            </ul>
        </div>
    )

};

