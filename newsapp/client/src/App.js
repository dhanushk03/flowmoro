import React, { useState, useEffect } from 'react'
import NewsItem from "./components/NewsItem"
import './App.css';

function App(){
  const[data, setData] = useState([])
  const[question, setQuestion] = useState([])

  
  useEffect(() => {
      fetch("/sentiment").then(
        res => res.json()
      ).then(
        data => {
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

  return (
    <main>
      <div className = "cards-container container flex">
         {mapped}
      </div>
    </main>
      
    )
}

export default App