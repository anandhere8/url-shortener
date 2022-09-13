const express          = require('express')
const app              = express()
const buildList        = require('./models/buildList')
const databaseObj      = require('./models/database');
// const sum = require('./sum')

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : false}));

app.get('/', async(req, res) => {
  const client = await databaseObj.connect();
  const list = await databaseObj.getAllData(client);    
  res.render('index',{ list: list });
});

app.get('/:shortUrl', async(req, res) => {

  const client = await databaseObj.connect();
  const Obj = await databaseObj.getOneData(client, req.params.shortUrl);    
  if (obj.fullUrl)
    res.redirect(Obj.fullUrl);
  else 
    res.render('/');
});

app.post('/shortUrls', async(req, res) => {
  try {
    console.log(req.body.fullUrl);

    const list = buildList(req.body.fullUrl);
    const client = await databaseObj.connect();
    await databaseObj.insertData(client, list);
    res.redirect('/')
  }
  catch(error) {
    console.log(error);
    res.redirect('/')
  }
});

app.listen(process.env.PORT || 5000);

