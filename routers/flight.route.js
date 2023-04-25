const express = require("express");
const { FlightModel } = require("../models/flights.model");

const flightRouter = express.Router();

flightRouter.get("/flights", async (req, res) => {
  const flights = await FlightModel.find();
  res.send(flights);
});
flightRouter.get("/flights/:id", async (req, res) => {
  const id = req.params.id;
  const flights = await FlightModel.find({ _id: id });
  res.send(flights);
});

flightRouter.post("/flights", async (req, res) => {
  const payload = req.body;
  try {
    const new_flight = new FlightModel(payload);
    await new_flight.save();
    res.send("New Flight Added to the List");
  } catch (error) {
    res.send({ message: "Something went wrong" });
  }
});
flightRouter.patch("/flights/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    await FlightModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Flight updated");
  } catch (error) {
    res.send("Something went wrong");
  }
});
flightRouter.delete("/flights/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await FlightModel.findByIdAndRemove({ _id: id });
    res.send("Flight Deleted");
  } catch (error) {
    res.send("Something went wrong");
  }
});

module.exports = { flightRouter };
