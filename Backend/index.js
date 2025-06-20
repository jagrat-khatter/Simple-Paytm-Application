const express = require('express');
const rootRouter = require('./routes/index')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1' , rootRouter) ;


const PORT  = 3000

app.listen(PORT , (req , res)=>{
    console.log(`App is listening on port ${PORT}`)
})
// in the first layer we use app.use() where the root router is used 
// in middlle layers we use router.use()
// in the last layer we use router.get() , router.post
// we ca create multiple layers of routes 