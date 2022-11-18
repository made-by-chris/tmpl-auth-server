import jwt from  "jsonwebtoken"

const generateToken = (data) =>
  jwt.sign(data, `${process.env.JWT_SECRET}`, { expiresIn: "604800s" })

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(" ")[1]

    jwt.verify(token, `${process.env.JWT_SECRET}`, (err, user) => {
      if (err) {
        console.log(err)
        return res.sendStatus(403)
      }

      req.user = user
      next()
    })
  } else {
    res.sendStatus(401)
  }
}

const decodeToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  try {
    if (authHeader) {
      const token = authHeader.split(" ")[1]
      jwt.verify(token, `${process.env.JWT_SECRET}`, (err, token) => {
        req.token = token
        next()
      })
    } else {
      next()
    }
  } catch (error) {
    next()
  }
}

export {
  generateToken,
  verifyToken,
  decodeToken,
}
