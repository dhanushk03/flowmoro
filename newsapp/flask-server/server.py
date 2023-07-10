from flask import Flask
import nltk
from newsapi import NewsApiClient
# importing requests package
import requests    
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
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

    sentiment = scores['compound']

    return sentiment

 
def News():
     
    # Init
    newsapi = NewsApiClient(api_key='2675fca71af44d579f7488241c5158de')

    # /v2/top-headlines
    top_headlines = newsapi.get_everything(q='language',
                                            language='en',
                                            sort_by='relevancy',
                                            from_param='2023-06-09' )["articles"][:75]
    #print(top_headlines)
    list1 = []
    list2 = []
    
    for ar in top_headlines:
        currSentence = preprocess_text(ar["description"])
        ar["sentiment"] = get_sentiment(currSentence)
        

    #results = [val for (_, val) in sorted(zip(list2, list1), key=lambda x: x[0])]
    #results.reverse()
    
    top_headlines = sorted(top_headlines, key= lambda x: x["sentiment"], reverse=True)

    data = {"articles": top_headlines}
    return data


app = Flask(__name__)

#Members Api route
@app.route("/sentiment")
def members():
    return News()

if __name__ == "__main__":
    app.run(debug=True)