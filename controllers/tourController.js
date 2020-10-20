const fs = require('fs');
const express=require('express');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`))
const router=express.Router();


exports.checkBody=(req,res,next)=>{
  if(!req.body.name|| !req.body.price){
    return res.status(400).json({
      status:'fail',
      message:'Missing name or price'
    })
  } next()
}
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours
    }
  });
}
exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  const tour = tours.find(el => el.id === id)

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
}

exports.createTour = (req, res) => {

  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({
    id: newId
  }, req.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/../starter/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })
}
exports.updateTour=(req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: '<updated tour>'
    }
  })
}
exports.deleteTour=(req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  res.status(204).json({
    status: "success",
    data:null
  })
}