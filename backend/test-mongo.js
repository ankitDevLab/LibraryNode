const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.librarysphere.zoxpkqg.mongodb.net",
  (err, addresses) => {
    console.log(err);
    console.log(addresses);
  }
);