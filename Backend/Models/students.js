const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }, 
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },

    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    
}, {
    timestamps: true
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null,path.join( __dirname,'..',AVATAR_PATH));
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, file.fieldname + '-' + uniqueSuffix);
//     }
// });
  
//   STATIC METHODS 
// userSchema.statics.uploadAvatar = multer({storage : storage}).single('avatar');
// userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);
module.exports = User;