const express = require('express')
const Profile = require('../Classes/Profile')
const router = express.Router()

router.post('/profile/create', async (req, res, next) => {
     //  const { firstname, lastname, contact_number, address, birthday, gender } =
     //       req.body

     try {
          const rawToken = req.headers['authorization']

          const profile = await Profile.createProfile(req.body, rawToken)

          res.status(200).json(profile)
     } catch (error) {
          next(error)
     }
})

router.patch('/profile/update', async (req, res, next) => {
     //  const { firstname, lastname, contact_number, address, birthday, gender } =
     //       req.body

     try {
          const rawToken = req.headers['authorization']

          const profile = await Profile.updateProfile(req.body, rawToken)

          res.status(200).json(profile)
     } catch (error) {
          next(error)
     }
})
module.exports = router