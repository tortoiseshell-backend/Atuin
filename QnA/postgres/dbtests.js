const db = require('./db.js')

// db.result('explain (analyze,verbose)  select * from answers where question_id=1683011;').then((data) => {console.log(data)})

// No index on question_id
// { 'QUERY PLAN': 'Planning Time: 0.678 ms' },
// { 'QUERY PLAN': 'Execution Time: 1534.522 ms' }

// With index on question_id
// { 'QUERY PLAN': 'Planning Time: 3.198 ms' },
// { 'QUERY PLAN': 'Execution Time: 1.528 ms' }

// db.result(`SELECT pg_size_pretty( pg_total_relation_size('answers') );`).then((data) => {console.log(data)})

// Size with no index on question_id
// { pg_size_pretty: '1091 MB' }

// With index on question_id
// { pg_size_pretty: '1198 MB' }


// db.result(`SELECT pg_size_pretty( pg_total_relation_size('answers_photos') );`).then((data) => {console.log(data)})

// Size with no index on answer_id
// { pg_size_pretty: '380 MB' }

// With index on answer_id
// { pg_size_pretty: '424 MB' }

db.result(`SELECT pg_size_pretty( pg_total_relation_size('questions') );`).then((data) => {console.log(data)})

// Size with no index on product_id
// { pg_size_pretty: '561 MB' }

// With index on product_id
// { pg_size_pretty: '605 MB' }
