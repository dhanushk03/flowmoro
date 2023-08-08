/*import React, { useState } from "react";
import { Form, Input, Rating, Button } from "semantic-ui-react";

export const TopicForm = ({ onNewTopic }) => {
  const [question, setQuestion] = useState("");

  return (
    <Form>
      <Form.Field>
        <Input
          placeholder="topic"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Button
          onClick={async () => {
            const news = { question };
            const response = await fetch("/change_topic", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(news)
            }).then(
              res => res.json()
            ).then(
              data => {
                console.log(data.articles)
                onNewTopic(data);
        
              }
            );

            
          }}
        >
          submit
        </Button>
      </Form.Field>
    </Form>
  );
};*/