import { method } from "lodash";
import React, { useState,useEffect }  from "react";
import QuestionItem from "./QuestionItem";




function QuestionList() {
  const [question,setQuestion] = useState([]);

  useEffect(() =>{
    fetch("http://localhost:4000/questions")
      .then((r)=>r.json())
      .then((question)=>{
        setQuestion(question);
      } );
    },[]);

    function handleDelete(id){
      fetch(`http://localhost:4000/questions/${id}`,{
        method:"DELETE",
      }
      )
      .then((r) => r.json())
      .then(()=>{
        const newQuestion = question.filter((q)=> q.id !==id);
        setQuestion(newQuestion);
      });
    }
    function handleChangedAnswer(id, correctIndex){
      fetch(`http://localhost:4000/questions/${id}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",

        },
        body: JSON.stringify({ correctIndex }),
      })
      .then((r)=>r.json())
      .then((newQuestions)=>{
        const newQuestion = question.map((q)=>{
          if (q.id === newQuestions.id) return newQuestions;
          return q;
        });
        setQuestion(newQuestion);
      });
    }
    const items = question.map((q)=>(
      <QuestionItem key={q.id} question={q} onDelete={handleDelete} onChangeAnswer={handleChangedAnswer} />
    ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{items}</ul>
    </section>
  );
}

export default QuestionList;
