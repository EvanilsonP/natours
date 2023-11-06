const Tour = require('./../models/tourModel');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
};

exports.getAllTours = async (req, res) => {

  try {
    // Build query
    const queryObj = {...req.query};
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Filtering data
    // const query = Tour.find(queryObj);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = query.sort(req.query.sort.split(',').join(''));
      console.log(sortBy);
    } else {
      query = query.sort('createdAt');
    };

    // Field limiting
    if(req.query.fields) {
      const fields = req.query.fields.split(',').join('');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    };

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if(req.query.page) {
      const numTours = await Tour.countDocuments();
      if(skip >= numTours) throw new Error('This page does not exist.');
    }
 
    // Filtering data
    // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

    // Execute the query
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });

  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save();

     const newTour = await Tour.create(req.body);
     res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: err
    });
    console.log(err);
  }

};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: 'Invalid data sent'
    });
    console.log(err);
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findOneAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: err
    });
    console.log(err);
  }
};