<div>
      <form>
                    <input type="text" value = {question} id='topic' name='topic' onChange={
                      e => setQuestion(e.target.value)
                    }/>
                    <input type='submit' value='submit' 
                    onClick={async () => {
                      console.log("clicked")
                      const response = await fetch("/sentiment", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ title: question }) 
                      });
          
                      if (response.ok) {
                        console.log("response worked!");
                        setData(response.articles)
                      }
                    }}/>
                </form>
      </div>