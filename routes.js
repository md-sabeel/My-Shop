const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<head><title>Enter Message</title></head>");
    res.write("<html>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hi From My Node.Js Server!</h1></body>");
  res.write("</html>");
  res.end();
};
// Method - 0

// module.exports = requestHandler;
// Method - 1

// module.exports = {
//   handler: requestHandler,
//   someText: "Some hard coded text",
// };
// Method - 2

exports.handler = requestHandler;
exports.someText = "Some Hard Coded Text";
// Method - 3

// module.exports.handler = requestHandler;
// module.exports.someText = "Some Text";
