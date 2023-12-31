
const fs = require('fs');
const rfs = require("rotating-file-stream");
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);


const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'demoKey',
    db: 'codeial-development-again',
    smtp: {
		service:'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		secure:false,
		auth: {
			user: 'kshitijr077@gmail.com',
			pass: 'telc fzaq ctrs rzvg'
		}
	},
	google_client_id: "187656538192-hs3d1k53inue3q29bkld1hldt08kvc7e.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial'
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_EMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CLIENT_URL, 
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
}

 module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);


// module.exports = development;
// module.exports = production;









// module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);

// // We will be using Morgan as a middleware
// // To save the logs in the file we will be using a middleware that will put those logs in the file but also that file can grow huge, to prevent in growing huge either we create a backup for weekly logs or we keep on deleting the older logs