const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://rudramanu:rudramanu@cluster0.l4qfum1.mongodb.net/airTicketBooking?retryWrites=true&w=majority"
);

module.exports = { connection };
