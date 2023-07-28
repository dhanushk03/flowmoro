import React, { useState, useEffect } from 'react'
import NewsItem from "./components/NewsItem"
import './App.css';
import { TopicForm } from "./components/TopicForm";
import { NewsNav } from "./components/NewsNav";
import { Container } from "semantic-ui-react";

function App(){
  const[data, setData] = useState([])
  //const[question, setQuestion] = useState([])

  
  useEffect(() => {
      fetch("/sentiment").then(
        res => res.json()
      ).then(
        data => {
          console.log(data.articles)
          setData(data.articles)
  
        }
      )
    
    

  }, [])



  var mapped = data.map(article => <NewsItem 
    author={article.author}
    content={article.content}
    description={article.description}
    publishedAt={article.publishedAt}
    sentiment={article.sentiment}
    source={article.source.name}
    title={article.title}
    url={article.url}
    urlToImage={article.urlToImage}
  />);

  const topicsList = ["general", "business", "science", "health", "entertainment", "sports", "technology"];

  return (
    <div class = "App">
      <div>
        <NewsNav topicsList = {topicsList} onNewTopic={news =>
          setData(news.articles)
        }/>
      </div>
      
      <div className = "cards-container container flex">
         {mapped}
      </div>
    </div>
      
    )
}

export default App