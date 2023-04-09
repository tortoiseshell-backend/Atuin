# Atuin# Adidae
A modernized e-commerce site built for an optimal user browsing experience.


## Authors
This project was created by:

[Jacob Sifodaskalakis](https://www.github.com/JakeSifo)\
[Jessica Tong](https://www.github.com/jessicatong43)\
[Neil Xia](https://www.github.com/NeilLXia)

### Built With
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)![NodeJS](https://img.shields.io/badge/Node.js-154a10?style=for-the-badge&logo=node.js)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux)![Jest](https://img.shields.io/badge/jest-DB7093?style=for-the-badge&logo=jest)![HTML5](https://img.shields.io/badge/HTML5-802d16?style=for-the-badge&logo=html5)![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3)![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws)![Tailwind](https://img.shields.io/badge/Tailwind-1572B6?style=for-the-badge&logo=tailwindcss)![Webpack](https://img.shields.io/badge/Webpack-6ba5bf?style=for-the-badge&logo=webpack)![Babel](https://img.shields.io/badge/Babel-b5a12d?style=for-the-badge&logo=babel)![Styled-components](https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components)

## Project Summary
This project is an e-commerce storefront with four main components:
- Product Overview
- Ratings and Reviews
- Questions and Answers
- Related Items and Outfits


## Key Features
- Prop-Types for typechecking React component props
- Optimized performance using Redux
- Linting with ESLint and airbnb style guide
- Modular Stars, Modal, Images, Buttons
- Light/Dark mode toggle using Tailwind+Redux
<img src="./readme-assets/Adidae_DarkMode.gif" alt= “dark_mode” width="600">

## Product Overview
### Image gallery
- Smooth scrolling carousel
- Animated theatre mode
- Image zoom with mouse-tracked panning

<img src="./readme-assets/Adidae_ImageGallery.gif" alt= “image_gallery” width="600">

### Product shopper
- Style selector
- Dynamic size and quantity rendering
- Add to cart

<img src="./readme-assets/Adidae_ProductShopper.gif" alt= “product_shopper” width="600">

## Ratings and Reviews
### Reviews
- Smooth infinite scrolling
- Rate review helpfulness
- Cut off long text with a ...Show more
- Regular image tile
- User friendly layout

<img src="./readme-assets/More_Reviews.gif" alt= “More_Reviews” width="600">

### Image Modal
- Smooth infinite zooming/panning
- Dynamic sizing
- User friendly layout

<img src="./readme-assets/Enlarge+Zoom.gif" alt= “Enlarge-Zoom” width="600">

### Sort Options
- Sort by newest, most helpful, and relavance
- Persists to new product for user preference

<img src="./readme-assets/Sort_Options.gif" alt= “Sort_Options” width="600">

### New Review
- User friendly layout
- Displays max/min character count
- Alerts missing information
- Submit up to 5 of any image file

<img src="./readme-assets/New_Review.gif" alt= “New_Review” width="600">
<img src="./readme-assets/New_Review_Fail.gif" alt= “New_Review_Fail” width="600">

### Product Breakdown
- User friendly design
- Dynamic

<img src="./readme-assets/Product_Breakdown.gif" alt= “Product_Breakdown” width="600">

### Reviews Breakdown
- User friendly design
- Sorts by rating
- Dynamic

<img src="./readme-assets/Reviews_Breakdown.gif" alt= “Reviews_Breakdown” width="600">
<img src="./readme-assets/Dynamic_Breakdown.gif" alt= “Dynamic_Breakdown” width="600">

## Questions and Answers
- Search functionality finds questions by keywords.
- Questions and answers are sorted by helpfulness ratings.
- Modal forms allow users to add questions and answers.
- Fits on one screen via dynamic sizing and scrollability.

<img src="./readme-assets/Adidae_QA_searchbar.gif" alt= “searchbar” width="600">
<img src="./readme-assets/Adidae_QA_modal.png" alt= “add_question_form” width="600">

## Related Items and Outfits

- Add products to outfit list
- See related items to product on horizontal carousel
<img src="./readme-assets/Adidae_RelatedItems.gif" alt= “product_shopper” width="600">

## Getting Started
1. Clone the repository to your local machine
    ```
    git clone https://github.com/Fullmetal-Alchemest/Atelier.git
    ```
2. Navigate into the repository folder, then install all necessary dependencies
    ```
    npm install
    ```
3. Make a copy of *rename.env*, name it *.env*, then fill in the following fields
    ```
    AUTH_SECRET="Insert GitHub API token here"
    ```
4. Run this script to start webpack and TailwindCSS watchers for compiling
    ```
    npm run dev
    ```
5. To run on a server and view on local IPv4:
    ```
    npm run react-dev
    ```

## Lighthouse Results
Desktop:
<img src="./readme-assets/Desktop.png" alt= “Desktop” width="600">

Mobile:
<img src="./readme-assets/Mobile.png" alt= “Mobile” width="600">