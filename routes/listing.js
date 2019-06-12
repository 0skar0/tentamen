// get = (req, res, next) => {
//   req.models.Listing.find().then((listings) => {
//       return res.send(listings);
//     }).catch((error) => next(error))
// }

get = (req, res, next) => {
  var query;
  if(req.query.type) {
    query = req.models.Listing.find({type: req.query.type})
  }
  else
  {
    query = req.models.Listing.find()
  }

  query.exec().then((listing) => {
      return res.send(listing);
    }).catch((error) => {
      next(error)
    })
}

getById = (req, res, next) => {
  req.models.Listing.findById(req.params.id).then((listing) => {
    return res.send(listing);
  })
}

// Create one listing with all info about the object
post = (req, res, next) => {
  req.models.Listing.create(
    {
      type: req.body.type,
      price: req.body.price,
      monthlyfee: req.body.monthlyfee,
      active: req.body.active,
      location: {
        street: req.body.location.street,
        number: req.body.location.number,
        city: req.body.location.city,
        municipality: req.body.location.municipality,
        country: req.body.location.country,
        lat: req.body.location.lat,
        lon: req.body.location.lon
      }
    }).then((listing) => {
    return res.status(201).send(listing)
  }).catch((error) => {
    next(error)
  })
}

put = (req, res, next) => {
  req.models.Listing.updateOne({_id: req.params.id},
    {
      type: req.body.type,
      price: req.body.price,
      monthlyfee: req.body.monthlyfee,
      active: req.body.active,
      location: {
        street: req.body.location.street,
        number: req.body.location.number,
        city: req.body.location.city,
        municipality: req.body.location.municipality,
        country: req.body.location.country,
        lat: req.body.location.lat,
        lon: req.body.location.lon
      }
    },
    {
      new: true,
      upsert: true,
      runvalidators: true,
    }).then((status) => {
      console.log("status: ", status)
      if (status.upserted)
        res.status(201)
      else if (status.nModified)
        res.status(200)
      else
        res.status(204)
    res.send()
    }).catch((error) => next(error))
}

deleteById = (req, res, next) => {
  req.models.Listing.findByIdAndDelete(req.params.id).then((deleted)=> {
    if (deleted)
      return res.send(deleted).status(200)
    res.sendStatus(204)
  }).catch((error) => next(error))
}

module.exports = {
  get,
  getById,
  post,
  put,
  deleteById
}
