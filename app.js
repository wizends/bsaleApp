const express = require("express")
const path = require('path')

const app = express()


app.use(express.static(path.join(__dirname)));

const port_number = app.listen(process.env.PORT || 3000);
app.listen(port_number);

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
}) 