module.exports = {
    openapi: "3.0.3", // present supported openapi version
    info: {
      title: "Junk Report API", // short title.
      description: "Junk Report API", //  desc.
      version: "1.0.0", // version number
      contact: {
        name: "Amjad C P", // your name
        email: "amjadcp@gmail.com", // your email
        url: "nothing.com", // your website
      },
    },
    servers: [
        {
          url: "http://localhost:8000", // url
          description: "Local server", // name
        },
      ],
  };
  