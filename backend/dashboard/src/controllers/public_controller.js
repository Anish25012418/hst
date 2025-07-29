// Import - default
const nodemailer = require("nodemailer");

// Import - models
const blogModel = require("../models/blog_model");
const categoryModel = require("../models/category_model");
const categoryMenuModel = require("../models/category_menu_model");
const staticPageModel = require("../models/static_page_model");
const subcategoryModel = require("../models/subcategory_model");

// Import - services
const { convertMongoDecimalToString } = require("../services/default_service");

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
// Global variables
const allPages = [
  "whyUsPage",
  "contactPage",
  "homePage",
  "socialResponsibilityPage",
  "ourTeamPage",
]; // List of all static pages
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

// Import - utils
const rm = require("../utils/constants/response_constant");
const { safeParseJSON, toParamCase, toTitleCase } = require("../utils/methods/string_methods");

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const items = await categoryModel.find({});

    // Populate foreign key individually
    // for (const item of items) {
    //   const subcategories = await subcategoryModel.find({
    //     categoryIds: { $in: item._id },
    //   });
    //   item.relatedSubcategories = subcategories;
    // }

    return rm.restFetchAllResponse(res, "category", items);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
};

// Get all the category menus
const getAllCategoryMenu = async (req, res) => {
  try {
    // Get all the items in the model
    let items = await categoryMenuModel.find({});

    // If no items found, create an empty item
    if (items.length === 0) {
      const emptyItem = new categoryMenuModel({
        /* specify the default properties for an empty item here */
        menu_pattern: categoryMenuJson
      });
      await emptyItem.save();

      // Fetch the items again to include the newly created empty item
      items = await categoryMenuModel.find({});
    }

    // // Modify the items to obtain a clean data
    // const resultItems = items?.map((item) => {
    //   const itemKeys = Object.keys(item.toObject());
    //   const newItem = { ...item.toObject() };

    //   const updatedItem = allPages.reduce((acc, singlePage) => {
    //     if (!itemKeys.includes(singlePage)) {
    //       acc[singlePage] = "";
    //     }
    //     return acc;
    //   }, newItem);

    //   return updatedItem;
    // });

    return rm.restFetchAllResponse(res, "(Category Menu)", items);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
};

// Get all subcategories
const getAllSubcategories = async (req, res) => {
  try {
    const items = await subcategoryModel.find({}).populate("categoryIds");

    // Transform the price fields for each item
    const transformedItems = items.map((model) => {
      return {
        ...model.toObject(), // Convert the Mongoose document to a plain object
        slug: toParamCase(model.title),
        slugs: model?.categoryIds?.map(({ title }) =>
          toParamCase(`${title}/${model.title}`)
        ),
        priceOffer: convertMongoDecimalToString(model.priceOffer),
        priceOriginal: convertMongoDecimalToString(model.priceOriginal),
      };
    });

    return rm.restFetchAllResponse(res, "subcategory", transformedItems);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
};

// Get all the blogs
const getAllBlogs = async (req, res) => {
  try {
    const items = await blogModel.find({});
    return rm.restFetchAllResponse(res, "blog", items);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
};

// Get all static pages data
const getAllStaticPage = async (req, res) => {
  try {
    // Get all the items in the model
    let items = await staticPageModel.find({});

    // If no items found, create an empty item
    if (items.length === 0) {
      const emptyItem = new staticPageModel({
        /* specify the default properties for an empty item here */
      });
      await emptyItem.save();

      // Fetch the items again to include the newly created empty item
      items = await staticPageModel.find({});
    }

    // Modify the items to obtain a clean data
    const resultItems = items.map((item) => {
      // Variables
      const itemObject = item.toObject();
      const itemKeys = Object.keys(itemObject);
      let socialResponsibilityPage = [];

      // Modify socialResponsibilityPage
      const givenSRPage = safeParseJSON(itemObject?.socialResponsibilityPage)
      Object?.values(givenSRPage)?.map((singleItem) => socialResponsibilityPage.push({
        image: singleItem?.image || "",
        header: singleItem?.title || "",
        description: {
          subHeader: singleItem?.nestedList?.title || "",
          list: singleItem?.nestedList?.list
        }
      }))
      const newItem = { ...itemObject, socialResponsibilityPage };

      const updatedItem = allPages.reduce((acc, singlePage) => {
        if (!itemKeys.includes(singlePage)) {
          acc[singlePage] = "";
        }
        return acc;
      }, newItem);

      return updatedItem;
    });

    return rm.restFetchAllResponse(res, "static_page", resultItems);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
};

// Get all the homepage data
const getHomepageData = async (req, res) => {
  try {
    // Fetch all data in parallel using Promise.all
    const [categories, categoryMenu, subcategories, blogs, staticPages] = await Promise.all([
      categoryModel.find({}, "_id slug title imageThumbnailPic imageCoverPic"),
      categoryMenuModel.find({}),
      subcategoryModel.find({}, "_id slug title categoryIds imageThumbnailPic departureFrom numberOfDays priceOriginal")
        .populate("categoryIds", "_id title slug"),
      blogModel.find({}, "_id slug title author imageThumbnailPic"),
      staticPageModel.find({})                  // Fetch all static pages
    ]);

    // If no category menu items found, create an empty item
    if (categoryMenu.length === 0) {
      const emptyCategoryMenu = new categoryMenuModel({
        menu_pattern: categoryMenuJson,
      });
      await emptyCategoryMenu.save();
    }

    // If no static pages found, create an empty item
    if (staticPages.length === 0) {
      const emptyStaticPage = new staticPageModel({
        // Specify default properties for an empty item here if needed
      });
      await emptyStaticPage.save();
    }

    // Transform subcategories
    const transformedSubcategories = subcategories.map((model) => {
      return {
        ...model.toObject(),
        slug: toParamCase(model.title),
        slugs: model?.categoryIds?.map(({ title }) =>
          toParamCase(`${title}/${model.title}`)
        ),
        priceOriginal: convertMongoDecimalToString(model.priceOriginal),
      };
    });

    // Modify static pages to obtain a clean data
    const transformedStaticPages = staticPages.map((item) => {
      const itemObject = item.toObject();
      const itemKeys = Object.keys(itemObject);
      let socialResponsibilityPage = [];

      const givenSRPage = safeParseJSON(itemObject?.socialResponsibilityPage);
      Object?.values(givenSRPage)?.forEach((singleItem) =>
        socialResponsibilityPage.push({
          image: singleItem?.image || "",
          header: singleItem?.title || "",
          description: {
            subHeader: singleItem?.nestedList?.title || "",
            list: singleItem?.nestedList?.list,
          },
        })
      );

      const newItem = { ...itemObject, socialResponsibilityPage };

      const updatedItem = allPages.reduce((acc, singlePage) => {
        if (!itemKeys.includes(singlePage)) {
          acc[singlePage] = "";
        }
        return acc;
      }, newItem);

      return updatedItem;
    });

    // Construct the final aggregated object
    const homepageData = {
      categories,
      categoryMenu,
      subcategories: transformedSubcategories,
      blogs,
      staticPages: transformedStaticPages,
    };

    // Send the combined data as the response
    return rm.restFetchAllResponse(res, "homepage_data", homepageData);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
};

// Define the email sending function
const postSendEmail = async (req, res) => {
  try {
    // Extract information from the request body
    const { full_name, email, phone, tour_interested, country, question, subject } = req.body;

    // Other variables
    const currentYear = new Date().getFullYear();

    // Basic validation
    if (!full_name) {
      return res.status(400).json({ message: 'Full name is required.' });
    }
    if (!email && !phone) {
      return res.status(400).json({ message: 'Either email or phone number is required.' });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Phone number validation (simple check for digits)
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format.' });
    }

    // Create a transporter object using Gmail's SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // user: 'udiprai28@gmail.com', // Your Gmail address
        // pass: 'eeaoprxztpblgito', // Your Gmail password or App Password (recommended)
        user: 'info@himalayansingletrack.com',
        pass: 'xwywskgwdazglbhq',
      },
    });

    // Define email options with the custom HTML template
    const mailOptions = {
      from: email, // Sender address
      // to: 'udiprai28@gmail.com', // Your recipient's email address
      to: 'udiprai28@gmail.com', // Your recipient's email address
      subject: `Subject: ${toTitleCase(subject)} | From ${toTitleCase(full_name)}`,
      text: `Name: ${full_name}\nEmail: ${email}\nPhone: ${phone}\nTour Interested: ${tour_interested}\nCountry: ${country}\nQuestion: ${question}`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
          <style>
              body {
                  font-family: 'Poppins', Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  color: #333333;
              }
              .email-container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #ffffff;
                  border: 1px solid #dddddd;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .header {
                  background-color: #000000;
                  color: #f6a306;
                  text-align: center;
                  padding: 20px;
              }
              .header h1 {
                  margin: 0;
                  font-size: 28px;
                  text-transform: uppercase;
                  letter-spacing: 2px;
              }
              .header p {
                  margin: 5px 0 0;
                  font-size: 16px;
              }
              .content {
                  padding: 20px;
              }
              .content p {
                  font-size: 16px;
                  line-height: 1.6;
                  margin-bottom: 20px;
              }
              .content p strong {
                  color: #f6a306;
              }
              .footer {
                  background-color: #333333;
                  color: #ffffff;
                  text-align: center;
                  padding: 10px;
                  font-size: 14px;
              }
              .footer a {
                  color: #f6a306;
                  text-decoration: none;
              }
              .footer a:hover {
                  text-decoration: underline;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <!-- Header -->
              <div class="header">
                  <h1>Himalayan Single Track</h1>
                  <p>The Leaders in Mountain Biking in Nepal</p>
              </div>
      
              <!-- Content -->
              <div class="content">
                  <p><strong>Name:</strong> ${full_name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Phone:</strong> ${phone}</p>
                  <p><strong>Tour Interested:</strong> ${tour_interested}</p>
                  <p><strong>Country:</strong> ${country}</p>
                  <p><strong>Question:</strong> ${question}</p>
              </div>
      
              <!-- Footer -->
              <div class="footer">
                  <p>&copy; ${currentYear} Himalayan Single Track. All rights reserved.</p>
                  <p>
                      <a href="https://web.himalayansingletrack.com" target="_blank">Visit our website</a> |
                      <a href="mailto:info@himalayansingletrack.com">Contact us</a>
                  </p>
              </div>
          </div>
      </body>
      </html>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Log the response
    console.log('Email sent: ' + info.response);

    // Send a success response to the client
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);

    // Send an error response to the client
    res.status(500).json({ message: 'Failed to send email' });
  }
};

module.exports = {
  getAllBlogs,
  getAllCategories,
  getAllCategoryMenu,
  getAllSubcategories,
  getAllStaticPage,
  getHomepageData,
  postSendEmail
};
