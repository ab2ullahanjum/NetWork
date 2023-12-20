const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
    name:{type: String,
        required:true
    },
    revenue:{type: String,
    },
    password: {type: String,
        required:true
    },
    email: {type: String,
        required:true
    },
    pkg: {type: String,
        required:true
    },
    pkgactivationdate: {type: String,
    },
    profile: {type: String,
        required:true
    },
    is_Admin:{type: Boolean,
        required:true
    },
   date:{type: String,
    required:true
    },
   bio:{type: String,
    },
   birthdate:{type: String,
    },
   phone:{type: String,
    },
   lastmonthusage:{type: String,
    },
   totalusage:{type: String,
    },
   wallet:{type: String,
    },
   deposit:{type: String,
    },
   pending:{type: String,
    },
   totalbill:{type: String,
    },
   remainingbill:{type: String,
    },
    
   paid:{type: String,
    },
    tokens: [{
            token: {
                type: String,
                required:true
            }
        }]
});




module.exports = mongoose.model('users', UserSchema);
