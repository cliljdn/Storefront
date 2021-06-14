const ProfileSchema = require('../../Models/Schemas/ProfileSchema')

const data = [
     {
          firstname: 'caw',
          lastname: 'nyaw',
          contact_number: '09078382454',
          address: 'blk 34 lot 12',
          birthday: '05-25-97',
          gender: 'Male',
     },

     {
          firstname: 'wow',
          lastname: 'nyaw',
          contact_number: '09078382454',
          address: 'blk 34 lot 12',
          birthday: '05-25-97',
          gender: 'Male',
     },

     {
          firstname: 'hehehhe',
          lastname: 'nyaw',
          contact_number: '09078382454',
          address: 'blk 34 lot 12',
          birthday: '05-25-97',
          gender: 'Male',
     },

     {
          firstname: 'qweqwe',
          lastname: 'nyasssw',
          contact_number: '09078382454',
          address: 'blk 34 lot 12',
          birthday: '05-25-97',
          gender: 'Male',
     },

     {
          firstname: 'qqq',
          lastname: 'nyaaaaaw',
          contact_number: '09078382454',
          address: 'blk 34 lot 12',
          birthday: '05-25-97',
          gender: 'Male',
     },
]

exports.up = async () => {
     let exists = await ProfileSchema.find()

     if (exists.length <= 0) {
          let inserted = await ProfileSchema.insertMany(data)
          if (inserted) return true
     } else {
          return false
     }
}

exports.down = async () => {
     try {
          let exists = await ProfileSchema.find()

          if (exists.length > 0) {
               let deleted = await ProfileSchema.deleteMany({})

               if (deleted) return true
          } else {
               return false
          }
     } catch (error) {
          console.error(error)
     }
}
