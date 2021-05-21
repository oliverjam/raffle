const html = String.raw;

exports.handler = async function http(req) {
  let body = html` <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Buy raffle tickets</title>
        <script src="https://js.stripe.com/v3/"></script>
      </head>
      <body>
        <h1>Buy raffle tickets</h1>

        <form>
          <button type="button">Pay</button>
        </form>

        <script>
          let stripe = Stripe(
            "pk_test_51ItaspKpIW7lGQZ7VSCq4Be4g6m9aZcHKYddNRFsDQ6UMO3micZX7VTJSPTtigV7Z70vGLquMrjL1LQN2OsfklH300uWE7uk3N"
          );
          document.querySelector("button").addEventListener("click", () => {
            fetch("/checkout", {
              method: "POST",
            })
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
                if (result.name === "Error") {
                  throw new Error(result.message);
                } else {
                  return result;
                }
              })
              .then((session) =>
                stripe.redirectToCheckout({ sessionId: session.id })
              )
              .then((result) => {
                if (result.error) {
                  alert(result.error.message);
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          });
        </script>
      </body>
    </html>`;

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
