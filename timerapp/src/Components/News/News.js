// import React from "react";
// import "./News.css"

// const News = () => {
//     return (
//         <div className="news">
//             <h1 className="title">This is the news page</h1>
//         </div>
//     );
// }

// export default News;

import React, { useState, useEffect } from 'react'
import NewsItem from "./components/NewsItem"
import './News.css';
//import { TopicForm } from "./components/TopicForm";
import { NewsNav } from "./components/NewsNav";
//import MongoDb from './server';

function News(collection_name){
  
  //var axios = require('axios');
  const[data, setData] = useState([])
  //const[question, setQuestion] = useState([])

  
  /*useEffect(() => {
      fetch("/sentiment").then(
        res => res.json()
      ).then(
        data => {
          console.log(data.articles)
          setData(data.articles)
  
        }
      )
    
    

  }, [])*/


  useEffect(() => {
    fetch("http://localhost:5050/articles/").then(
      res => res.json()
    ).then(
      data => {
        console.log(data);
        setData(data);

      }
    )
  
  

  }, [])



  /*useEffect(() => {
    
    setData(MongoDb("general"));
  

  }, [])*/





  /*var mapped = data.map(article => <NewsItem 
    author={article.author}
    content={article.content}
    description={article.description}
    publishedAt={article.publishedAt}
    sentiment={article.sentiment}
    source={article.source.name}
    title={article.title}
    url={article.url}
    urlToImage={article.urlToImage}
  />);*/

  var mapped2 = data.map(article => <NewsItem 
    author={article.author}
    category={article.category}
    country={article.country}
    description={article.description}
    image={article.image}
    language={article.language}
    published_at={article.published_at}
    sentiment={article.sentiment}
    source={article.source}
    title={article.title}
    url={article.url}
  />);

  const topicsList = ["general", "business", "science", "health", "entertainment", "sports", "technology"];

  return (
    <div class = "News">
      <div>
        <NewsNav topicsList = {topicsList} onNewTopic={news =>
          setData(news)
        }/>
      </div>
      
      <div className = "cards-container container flex">
         {mapped2}
      </div>
    </div>
      
    );
}

export default News;