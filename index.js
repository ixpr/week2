const [{ Server: h1 }, x] = [require('http'), require('express')];
const fs = require('fs');

const Router = x.Router();
const PORT = 4321;
const { log } = console;
const hu = { 
  'Content-Type': 'text/plain; charset=UTF-8',
  'Access-Control-Allow-Origin': '*'
};  
const app = x();
const mw0 = (r, rs, n) => rs.status(200).set(hu) && n();
Router
  .route('/')
  .get(r => r.res.end('Привет мир!'));
app
  .use(mw0)
  .use(x.static('.'))
  .use('/', Router)
  .get('/login/', (req, res, next) => res.send('amalgamate.apart'))
  .get('/sample/', (req, res, next) => {
    const filePath = './function.js';
    fs.readFileSync(filePath, {encoding: 'utf-8'}, function (err, data){
      if (!err) {
          res.send(data);
          cb(data);
      } else {
         cb("False");
      }
    });
  })
  .use((req, res, next) => { req.errorMessage = 'Нет страницы'; next(); })
  .use(r => r.res.status(404).set(hu).send(r.errorMessage))
  .use((e, r, rs, n) => rs.status(500).set(hu).send(`Ошибка: ${e}`))
  .set('x-powered-by', false);
module.exports = h1(app)
  .listen(process.env.PORT || PORT, () => log(process.pid));
