import React, { useState, useEffect } from 'react'
import NewsItem from "./components/NewsItem"

function App(){

  const[data, setData] = useState([])

  useEffect(() => {
    fetch("/sentiment").then(
      res => res.json()
    ).then(
      data => {
        setData(data.articles)
        console.log(data)
      }
    )
  }, [])

  console.log(data);

  var mapped = data.map(article => <NewsItem 
    author={article.author}
    content={article.content}
    description={article.description}
    publishedAt={article.publishedAt}
    sentiment={article.sentiment}
    title={article.title}
    url={article.url}
    urlToImage={article.urlToImage}
  />);

  return (
      <div>
         {mapped}
      </div>
    )
}

export default App