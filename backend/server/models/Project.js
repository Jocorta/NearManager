const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

mongoose.set("useFindAndModify", false);
const { Schema } = mongoose;

const Project = new Schema(
  {
    id_leader: String,
    name: String,
    members: Array,
    files: Array
    
  },
  {
    collection: "projects"
  }
);

/*Project.pre("save", function(next) {
  if (!this.isModified("tipo")) {
    return next();
  }
  this.tipo = bcrypt.hashSync(this.tipo, 9);
  next();
});

Project.methods.compareTipo = function(plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.tipo));
};*/

module.exports = mongoose.model("Project", Project);
