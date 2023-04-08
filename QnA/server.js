require("dotenv").config();
const express = require("express");
const morgan = require('morgan')
const path = require("path");
const controllers = require("./controllers.js");

const app = express();

// middleware
app.use(morgan('tiny'));
app.use(express.json());


app.get('/api/qa/questions', controllers.productQuestions);
app.get('/api/qa/questions/:question_id/answers', controllers.QuestionAnswers)
app.post('/api/qa/questions', controllers.AddQuestion)
app.post('/api/qa/questions/:question_id/answers', controllers.AddAnswer)
app.put('/api/qa/questions/:question_id/helpful', controllers.HelpfulQuestion)
app.put('/api/qa/answers/:answer_id/helpful', controllers.HelpfulAnswer)
app.put('/api/qa/questions/:question_id/report', controllers.ReportQuestion)
app.put('/api/qa/answers/:answer_id/report', controllers.ReportAnswer)
const PORT = process.env.PORT || 80;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);