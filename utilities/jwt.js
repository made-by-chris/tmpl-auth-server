import jwt from  "jsonwebtoken"

const generateToken = (data) =>
  jwt.sign(data, `${process.env.JWT_SECRET}`, { expiresIn: "604800s" })


const decodeToken = (req, res, next) => {
  const token = req.cookies.token
  if (token) {
    jwt.verify(token, `${process.env.JWT_SECRET}`, (err, decoded) => {
      if (err) {
        res.clearCookie("token")
        res.status(401).send({
          message: "Invalid token",
          success: false,
          data: err,
        })
      } else {
        req.token = decoded
        next()
      }
    })
  } else {
    next()
  }
}

export {
  generateToken,
  decodeToken,
}
