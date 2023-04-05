const db = require('./db.js')

db.result('explain (analyze,verbose)  select * from answers where question_id=1683011;').then((data) => {console.log(data)})

// No index on question_id
// { 'QUERY PLAN': 'Planning Time: 0.678 ms' },
// { 'QUERY PLAN': 'Execution Time: 1534.522 ms' }

// With index on question_id
// { 'QUERY PLAN': 'Planning Time: 3.198 ms' },
// { 'QUERY PLAN': 'Execution Time: 1.528 ms' }