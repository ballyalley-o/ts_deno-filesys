const express = require('express');
const workRoute = require('./routes/works')

const app = express();
const PORT = 3000;

app.use(express.json())
app.use('/works', workRoute)



app.listen(PORT, () => {
    console.log(`SERVER STATUS: RUNNING on PORT: ${PORT}`)
})