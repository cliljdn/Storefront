const express = require('express')
const Profile = require('../Classes/Profile')
const router = express.Router()

/* 
EXPECTED FIELDS  { firstname, lastname, contact_number, address, birthday, gender,image } 
*/

router.post('/profile/create', async (req, res, next) => {
     try {
          const rawToken = req.headers['authorization']

          const profile = await Profile.createProfile(req.body, rawToken)

          res.status(200).json(profile)
     } catch (error) {
          next(error)
     }
})

router.patch('/profile/update', async (req, res, next) => {
     try {
          const rawToken = req.headers['authorization']

          const profile = await Profile.updateProfile(req.body, rawToken)

          res.status(200).json(profile)
     } catch (error) {
          next(error)
     }
})

router.get('/profile/auth', async (req, res, next) => {
     try {
          const rawToken = req.headers['authorization']

          const decoded = await Profile.decodeToken(rawToken)

          const profile = await Profile.getProfile(decoded)

          res.status(200).json(profile)
     } catch (error) {
          next(error)
     }
})
module.exports = router
