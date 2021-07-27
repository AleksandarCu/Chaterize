var db = require("../database/models");
var User = db.user;
var passport = require('passport')

var JSONResponse = function (res, status, content) {
    res.status(status);
    res.send(content);
};

//Create a new user
exports.create = (req, res) => {
    if (!req.body.name || !req.body.surname || !req.body.email
        || !req.body.username || !req.body.password) {
        JSONResponse(res, 400, {
            message: "Invalid format"
        });
        return;
    }

    const passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;
    const emailRe = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(!passwordRe.test(req.body.password)){
        JSONResponse(res, 400, {
            message: "Invalid password format"
        });
        return;
    }

    if(!emailRe.test(req.body.email)){
        JSONResponse(res, 400, {
            message: "Invalid email format"
        });
        return;
    }

    var user = User.build({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        username: req.body.username,
    });
    user.makePassword(req.body.password);

    user.save()
        .then(data => {
            //res.send(data);
            JSONResponse(res, 200, {
                message:
                    "Successfully created user.",
                token: user.generirajJwt()
            });
        })
        .catch(err => {
            try{
                var errReport = err.errors[0]
                if(errReport.type == 'unique violation'){
                    JSONResponse(res, 500, {
                        message:
                            errReport.path + " is already taken."
                    });
                }
            }catch (e){
                JSONResponse(res, 500, {
                    message:
                        err.message || "Some error occurred while creating user."
                });
            }
        });
};

exports.login = (req, res) => {
    if (!req.body.username || !req.body.password) {
        JSONResponse(res, 400, {
            message: "Invalid format"
        });
        return;
    }

    passport.authenticate('local', function(error, user, data) {
        if (error) {
          JSONResponse(res, 404, {
              message: "Invalid username/email or password!"
          });
          return;
        }
        else if (user) {
          JSONResponse(res, 200, {
            "token": user.generirajJwt()
          });
        } else {
          JSONResponse(res, 401, data);
        }
      })(req, res);
}


exports.getAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            JSONResponse(res, 500, err);
        })
}

exports.findById = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            JSONResponse(res, 500, err);
        })
};

exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                JSONResponse(res, 200, {
                    message: "User was updated successfully."
                });
            } else {
                JSONResponse(res, 404, {
                    message: `Cannot update user with id=${id}.`
                });
            }
        })
        .catch(err => {
            JSONResponse(res, 500, {
                message: "Error updating user with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                JSONResponse(res, 200, {
                    message: "User was deleted successfully!"
                });
            } else {
                JSONResponse(res, 404, {
                    message: `Cannot delete user with id=${id}.`
                });
            }
        })
        .catch(err => {
            JSONResponse(res, 404, {
                message: "Could not delete user with id=" + id
            });
        });
};