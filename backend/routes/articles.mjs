import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("general");
  let results = await collection.find().toArray();
  //console.log(results);
  res.send(results).status(200);
});

router.get("/general", async (req, res) => {
    let collection = await db.collection("general");
    let results = await collection.find().toArray();
    //console.log(results);
    res.send(results).status(200);
  });

// This section will help you get a list of all the records.
router.get("/sports", async (req, res) => {
    let collection = await db.collection("sports");
    let results = await collection.find().toArray();
    res.send(results).status(200);
  });

// This section will help you get a list of all the records.
router.get("/science", async (req, res) => {
    let collection = await db.collection("science");
    let results = await collection.find().toArray();
    res.send(results).status(200);
  });

// This section will help you get a list of all the records.
router.get("/health", async (req, res) => {
    let collection = await db.collection("health");
    let results = await collection.find().toArray();
    res.send(results).status(200);
  });

// This section will help you get a list of all the records.
router.get("/entertainment", async (req, res) => {
    let collection = await db.collection("entertainment");
    let results = await collection.find().toArray();
    res.send(results).status(200);
  });

// This section will help you get a list of all the records.
router.get("/business", async (req, res) => {
    let collection = await db.collection("business");
    let results = await collection.find().toArray();
    res.send(results).status(200);
  });

// This section will help you get a list of all the records.
router.get("/technology", async (req, res) => {
    let collection = await db.collection("technology");
    let results = await collection.find().toArray();
    res.send(results).status(200);
  });

export default router;