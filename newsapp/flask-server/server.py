from flask import Flask
import nltk
from newsapi import NewsApiClient
# importing requests package
import requests    
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from datetime import timedelta, date
from textblob import TextBlob
from flask import request
import flask

#nltk.download('all')
analyzer = SentimentIntensityAnalyzer()

# create preprocess_text function
def preprocess_text(text):

    # Tokenize the text
    tokens = word_tokenize(text.lower())
    # Remove stop words

    filtered_tokens = [token for token in tokens if token not in stopwords.words('english')]

    # Lemmatize the tokens

    lemmatizer = WordNetLemmatizer()

    lemmatized_tokens = [lemmatizer.lemmatize(token) for token in filtered_tokens]

    # Join the tokens back into a string

    processed_text = ' '.join(lemmatized_tokens)

    return processed_text

def get_sentiment(text):

    scores = analyzer.polarity_scores(text)

    sentiment = round((scores['compound'] + TextBlob(text).sentiment.polarity)/2,3)

    return sentiment

#returns the formated date x days ago

def days_ago(n):
  return date.today() - timedelta(n)
 
def News(search="everything"):
     
    # Init
    newsapi = NewsApiClient(api_key='2675fca71af44d579f7488241c5158de')

    # /v2/top-headlines
    top_headlines = newsapi.get_everything( q=search,
                                            language='en',
                                            sort_by='publishedAt',
                                            from_param=str(days_ago(29)))["articles"][:75]
    #print(top_headlines)
    list1 = []
    list2 = []
    
    i = 0
    for ar in top_headlines[:]:
        if type(ar["description"]) is None or type(ar["title"]) is None or ar["urlToImage"] is None:
            top_headlines.pop(i)
            i-=1
        else:
            currSentence = preprocess_text(ar["description"])
            currTitle = preprocess_text(ar["title"])
            ar["sentiment"] = round((get_sentiment(currSentence) + get_sentiment(currTitle))/2, 2)
            if ar["sentiment"] < 0.25:
                top_headlines.pop(i)
                i-=1
        
        i+=1    
        

    #results = [val for (_, val) in sorted(zip(list2, list1), key=lambda x: x[0])]
    #results.reverse()
    
    top_headlines = sorted(top_headlines, key= lambda x: x["sentiment"], reverse=True)

    data = {"articles": top_headlines[:40]}
    return data


app = Flask(__name__)
@app.after_request
def set_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    return response
topic = 'everything'
#Members Api route
@app.route("/sentiment")
def articles():
    return News("baseball")

@app.route("/change_topic", methods = ["GET", "POST"])
def topicChange():
    print(News(request.get_json()["question"]))
    if(request.method == 'POST'):
        return News(request.get_json()["question"])

if __name__ == "__main__":
    app.run(debug=True)