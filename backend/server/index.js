const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
mongoose
  .connect("mongodb://localhost/nearmanager", {
    useNewUrlParser: true
  })
  .catch(err => console.log(err));

//middleware

app.use(bodyParser.json());
app.use(cors());

const users = require("./routes/user");
const login = require("./routes/login");
const projects = require("./routes/project");
const authenticate = require("./routes/authenticate");


app.use("/api/users", users);
app.use("/api/login", login);
app.use("/api/projects", projects);
app.use("/api/authenticate", authenticate);


const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`Server started on port ${port}`));
