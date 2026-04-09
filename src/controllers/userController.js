// controller req, res, exception
//call services

const response = require("../helper/generalResponse");
const MessageConstant = require("../constant/MessageConstant");
const userService = require("../services/userService");
const buildUserFilter = require("../utils/buildUserFilter");
const { userQuerySchema } = require("../validation/userValidation");
const User = require("../models/user");
const EmailService = require("../services/emailService");

class UserController {
  //create user
  async createUser(req, res, next) {
    try {
      // call services
      const result = await userService.createUser(req?.body);
      return response.createdResponse(
        res,
        result,
        MessageConstant.USER_CREATED,
      );
    } catch (error) {
      console.log("error: ", error);
      next(error);
    }
  }

  //get  all users
  async getAllUsers(req, res, next) {
    try {
      //validate queary
      const Query = userQuerySchema.parse(req.query);

      //build filter object
      const filter = buildUserFilter(Query);

      //pagination
      const page = Query.page;
      const limit = Query.limit;

      //call services with filter
      const users = await userService.getAllUsers(filter, page, limit);

      return response.getOkResponse(res, users);
    } catch (error) {
      console.log("error: ", error);
      next(error);
    }
  }

  //get single user by id
  async getUserbyId(req, res, next) {
    try {
      const users = await userService.getUserbyId(req.params.id);

      return response.getOkResponse(res, users);
    } catch (error) {
      console.log("error: ", error);
      next(error);
    }
  }

  //update the user
  async updateUsers(req, res, next) {
    try {
      const updateUser = await userService.updateUsers(req.params.id, req.body);

      return response.updatedResponse(res, updateUser);
    } catch (error) {
      console.log("error: ", error);
      next(error);
    }
  }

  //delete users
  async deleteUsers(req, res, next) {
    try {
      const deleteuser = await userService.deleteUsers(req.params.id);

      return response.deletedResponse(res, deleteuser);
    } catch (error) {
      console.log("error: ", error);
      next(error);
    }
  }
}
module.exports = new UserController();
