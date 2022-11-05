const express = require("express");
const bodyParser = require("body-parser"); 
const cors = require("cors");

const app = express();
const port = 4000;

// Routery
const userRouter = require("./controller/user-controller"); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}))

//nastavení portu, na kterém má běžet HTTP server

app.listen(port, () => {
  console.log(`App starts at http://localhost:${port}`)
});

/*
const server = app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});*/

//jednoduchá definice routy s HTTP metodou GET, která pouze navrací text
app.get("/", (req, res) => {
  res.send('Server pro skupinový projekt');
});

app.use("/user", userRouter);