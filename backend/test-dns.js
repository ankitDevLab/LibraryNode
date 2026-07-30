const dns = require("dns");

dns.resolveSrv("_mongodb._tcp.librarysphere.zoxpkqg.mongodb.net", (err, records) => {
  console.log("Error:", err);
  console.log("Records:", records);
});