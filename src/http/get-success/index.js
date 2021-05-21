const html = String.raw;

exports.handler = async function http(req) {
  console.log(req.queryStringParameters);

  let body = html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Thanks for playing</title>
      </head>
      <body>
        <h1>Thanks for playing</h1>
      </body>
    </html>
  `;

  return {
    headers: {
      "content-type": "text/html; charset=utf8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    statusCode: 200,
    body,
  };
};
