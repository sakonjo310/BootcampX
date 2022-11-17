const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortMonth = process.argv[2];
const values = [`${cohortMonth}` || 'JUL02'];
const queryString = `
SELECT DISTINCT teachers.name as name, cohorts.name as cohort
FROM teachers 
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teachers.name;
`

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.name}`);
  })
})
.catch(err => console.error('query error', err.stack));