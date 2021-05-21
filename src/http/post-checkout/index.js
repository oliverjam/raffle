const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.handler = async function http(req) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Ticket",
              // images: ["https://i.imgur.com/EHyR2nP.png"],
            },
            unit_amount: 500,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3333/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3333/cancel`,
    });

    return {
      headers: {
        "content-type": "application/json; charset=utf8",
        "cache-control":
          "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
      },
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    console.error(error);
    return {
      headers: {
        "content-type": "application/json; charset=utf8",
        "cache-control":
          "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
      },
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
