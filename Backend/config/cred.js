const crd = {
  user: process.env.user,
  pass: process.env.pass
}

const moncrd = {
  user: process.env.mongocred,
  pass: process.env.mongopass
}

const twiliocrd = {
  accountSid: process.env.twilioaccountSid,
  authToken: process.env.twilioauthToken
}

const tokens = {
  ACCESS_TOKEN_SECRET: process.env.tACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.tACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET: process.env.tREFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY: process.env.tREFRESH_TOKEN_EXPIRY
}

module.exports = { crd, moncrd, twiliocrd, tokens };