const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({"error": "Token expired or invalid"});
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(JSON.stringify(err));
      res.status(502).json({"error": "Server side issue: " + JSON.stringify(err)});
    } else if (!user) {

    } else {
      switch(true) {
        case user.hasOwnProperty("service_id"):
          req.body.officer.serviceId = user.service_id;
          req.body.officer.name = user.name;
          break;
        case user.hasOwnProperty("station_code"):
          req.body.policeStation.stationCode = user.station_code;
          req.body.policeStation.name = user.name;
          break;
        default:
          req.body.user._id = user._id;
          req.body.user.name = user.name;
      }
      next();
    }
  });
}

const generateToken = (req, res, next) => {

}

const refreshToken = (req, res, next) => {

}

module.exports = {
  authenticateToken,
  generateToken,
  refreshToken
}