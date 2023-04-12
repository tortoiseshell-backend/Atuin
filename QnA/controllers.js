const db = require('./postgres/db.js')


// TODO add pagination
exports.productQuestions = (req, res) => {
  /* faster version that is currently a rough draft */
  var questions = db.one(
    `SELECT
      $1 as product_id,
      json_agg(
        json_build_object(
          'question_id',questions.id,
          'question_body',questions.body,
          'question_date', TO_TIMESTAMP((questions.date_written/1000))::date ,
          'asker_name', questions.asker_name,
          'question_helpfulness', questions.helpful,
          'reported', questions.reported,
          'answers', (SELECT json_object_agg(
            answers.id,
            json_build_object(
              'id', answers.id,
              'body', answers.body,
              'date', TO_TIMESTAMP((answers.date_written/1000))::date,
              'answerer_name', answers.answerer_name,
              'helpfulness', answers.helpfulness,
              'photos', (select ARRAY(select url from answers_photos where answers_photos.answer_id=answers.id))
            )
          ) FROM answers WHERE answers.question_id = questions.id)
        )) as results
      FROM questions WHERE product_id= $1;`
  // `select question.id as question_id,
  // question.body as question_body,
  // TO_TIMESTAMP((question.date_written/1000))::date as question_date,
  // question.asker_name,
  // question.helpful as question_helpfulness,
  // question.reported,
  // case
  //   when answers.id is null then '{}'::json
  //   else
  //     json_build_object(answers.id,
  //       json_build_object(
  //         'id', answers.id,
  //         'body', answers.body,
  //         'date', answers.date_written,
  //         'answerer_name', answers.answerer_name,
  //         'helpfulness', answers.helpfulness,
  //         'photos', (select ARRAY(select url from answers_photos where answers_photos.answer_id=answers.id))
  //       )
  //     )
  //   end as answers
  // from (select * from questions where product_id= $1) question
  // left join answers on question.id=question_id;`
    , [req.query.product_id]).then((results) => {res.send(results)})
}

// TODO: Add pagination, add photos
exports.QuestionAnswers = (req,res) => {
  db.any(`
    select
      $1 as question,
      json_agg(
        json_build_object(
          'id', answers.id,
          'body', answers.body,
          'date', TO_TIMESTAMP((answers.date_written/1000))::date,
          'answerer_name', answers.answerer_name,
          'helpfulness', answers.helpfulness,
          'photos', (select ARRAY(select url from answers_photos where answers_photos.answer_id=answers.id))
          )
        ) as results
    from answers where question_id=$1;
    `
    , [req.params.question_id])
  .then((results) => {
    res.send(results)
  })
  // .catch((err) => {
  //   res.sendStatus(500)
  // })
}

exports.AddQuestion = (req,res) => {
  db.none(`
  INSERT INTO questions
    (product_id, date_written, asker_name, asker_email)
    VALUES ($1, $2, $3, $4)`, [req.body.product_id, Date.now(), req.body.name, req.body.email])
  .then(() => {
    res.sendStatus(201)
  })
  // Optional logging content, comment out when stress testing
  // .then(() => (
  //   db.one('select * from questions order by id desc limit 1;', [req.params.question_id])
  // ))
  // .then((result) => {
  //   console.log(result)
  // })
  .catch((err) => {
    res.sendStatus(500)
  })
}

//TODO add photos
exports.AddAnswer = (req,res) => {
  db.one(`
  INSERT INTO answers
    (question_id, body, date_written, answerer_name, answerer_email)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id`, [req.params.question_id, req.body.body, Date.now(), req.body.name, req.body.email])
  .then((results) => {
    Promise.all(
      req.body.photos.map((photo) => (
        db.none(`
        INSERT INTO answers_photos
          (answer_id, url)
          VALUES ($1, $2)`, [results.id, photo])
      )))
  })
  .then(() => {
    res.sendStatus(201)
  })
  // Optional logging content, comment out when stress testing
  // .then(() => (
  //   db.one('select * from answers order by id desc limit 1;')
  // ))
  // .then((result) => {
  //   console.log(result)
  // })
  // .then(() => (
  //   db.one('select * from answers_photos order by id desc limit 1;')
  // ))
  // .then((result) => {
  //   console.log(result)
  // })
  .catch((err) => {
    res.sendStatus(500)
  })
}


exports.HelpfulQuestion = (req,res) => {
  db.none('UPDATE questions SET helpful=helpful+1 where id=$1', [req.params.question_id])
  .then(() => {
    res.sendStatus(204)
  })
  // Optional logging content, comment out when stress testing
  // .then(() => (
  //   db.one('select * from questions where id=$1;', [req.params.question_id])
  // ))
  // .then((result) => {
  //   console.log(result)
  // })
  .catch((err) => {
    res.sendStatus(500)
  })
}

exports.HelpfulAnswer = (req,res) => {
  db.none('UPDATE answers SET helpfulness=helpfulness+1 where id=$1', [req.params.answer_id])
  .then(() => {
    res.sendStatus(204)
  })
  // Optional logging content, comment out when stress testing
  // .then(() => (
  //   db.one('select * from answers where id=$1;', [req.params.answer_id])
  // ))
  // .then((result) => {
  //   console.log(result)
  // })
  .catch((err) => {
    res.sendStatus(500)
  })
}
exports.ReportQuestion = (req,res) => {
  db.none('UPDATE questions SET reported=true where id=$1', [req.params.question_id])
  .then(() => {
    res.sendStatus(204)
  })
  // Optional logging content, comment out when stress testing
  // .then(() => (
  //   db.one('select * from questions where id=$1;', [req.params.question_id])
  // ))
  // .then((result) => {
  //   console.log(result)
  // })
  .catch((err) => {
    res.sendStatus(500)
  })
}
exports.ReportAnswer = (req,res) => {
  db.none('UPDATE answers SET reported=true where id=$1', [req.params.answer_id])
  .then(() => {
    res.sendStatus(204)
  })
  // Optional logging content, comment out when stress testing
  // .then(() => (
  //   db.one('select * from answers where id=$1;', [req.params.answer_id])
  // ))
  // .then((result) => {
  //   console.log(result)
  // })
  .catch((err) => {
    res.sendStatus(500)
  })
}