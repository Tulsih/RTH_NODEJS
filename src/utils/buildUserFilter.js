const { Query } = require("mongoose");
const { email } = require("zod");

const buildUserFilter = (Query) => {
  const filter = {};

  //searching
  if (Query.search) {
    filter.$or = [
      { firstName: { $regex: Query.search, $options: "i" } },
      { middleName: { $regex: Query.search, $options: "i" } },
      { lastName: { $regex: Query.search, $options: "i" } },
      { mobileNumber: { $regex: Query.search, $options: "i" } },
      { email: { $regex: Query.search, $options: "i" } },
    ];
  }

  //filtering
  if (Query.firstName) filter.firstName = Query.firstName;
  if (Query.middleName) filter.middleName = Query.middleName;
  if (Query.lastName) filter.lastName = Query.lastName;
  if (Query.city) filter.city = Query.filter;
  if (Query.state) filter.state = Query.state;
  if (Query.mobileNumber) filter.mobileNumber = Query.mobileNumber;
  if (Query.gender) filter.gender = Query.gender;
  if (Query.status) filter.state = Query.status;
  if (Query.roles) filter.roles = Query.roles;

  //age range filter
  if (Query.minAge || Query.maxAge) {
    filter.age = {};

    if (Query.minAge) filter.age.$gte = Number(Query.minAge);
    if (Query.maxAge) filter.age.$lte = Number(Query.maxAge);
  }

  return filter;
};

module.exports = buildUserFilter;
