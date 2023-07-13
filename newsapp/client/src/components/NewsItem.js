import React from "react"
import './newsItem.css'

const NewsItem = (props) => {
    var replacementURL = "https://via.placeholder.com/400x300"
    return (
        
            <div className = "card">
                <div className="card-header">
                    <img src = {props.urlToImage} alt = {replacementURL}/>
                </div>
                <div className = "card-content">
                    <h3>
                        <a href = {props.url}>
                            {props.title}
                        </a>
                    </h3>
                    <h6 className="news-source" id="news-source">{props.source} {props.publishedAt}</h6>
                    <p>
                        {props.description}
                    </p>
                    <h1>Sentiment: {props.sentiment}</h1>
                </div>
                
            </div>
        
    )
}

export default NewsItem