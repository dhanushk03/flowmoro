import React from "react"
import './newsItem.css'

const NewsItem = (props) => {
    return (
        <div className="news-app">
            <div className = "news-item">
                <img className="news-img" src = {props.urlToImage} alt = {props.urlToImage}/>
                <h3>
                    <a href = {props.url}>
                        {props.title}
                    </a>
                </h3>
                <p>
                    {props.description}
                </p>
                <h1>Sentiment: {props.sentiment}</h1>
            </div>
        </div>
    )
}

export default NewsItem