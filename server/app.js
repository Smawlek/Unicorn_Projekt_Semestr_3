const express = require("express");
const bodyParser = require("body-parser"); 
const cors = require("cors");

const app = express();
const port = 4000;

// Routery
const userRouter = require("./controller/user-controller"); 
const runsRouter = require("./controller/runs-controller"); 
const subjectsRouter = require("./controller/subjects-controller"); 
const rolesRouter = require("./controller/roles-controller"); 
const typesRouter = require("./controller/types-controller");
const fieldsRouter = require("./controller/fields-controller"); 
const assigmentsRouter = require("./controller/assigments-controller"); 
const ratingsRouter = require("./controller/ratings-controller"); 

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
  res.send('Server pro skupinový projekt na 3. semestr | v0.0.1');
});

app.use("/user", userRouter);
app.use("/runs", runsRouter);
app.use("/subjects", subjectsRouter);
app.use("/roles", rolesRouter);
app.use("/types", typesRouter);
app.use("/fields", fieldsRouter);
app.use("/assigments", assigmentsRouter);
app.use("/ratings", ratingsRouter);