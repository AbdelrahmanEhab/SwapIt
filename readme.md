# SwapIt - A Marketplace for Students

**SwapIt** is a modern, easy-to-use marketplace specifically designed for university students to swap goods and services. It makes it simple to buy, sell, and trade items within the campus community. Whether you're looking to exchange textbooks, electronics, or offer tutoring services, SwapIt connects you with peers in a trusted and convenient way.

## 🚀 Features

- **User-Friendly Interface**: Designed with a sleek, modern interface using ReactJS and TailwindCSS, ensuring ease of navigation and interaction.
- **User Profiles**: Each user has a personal profile where they can manage their listings, ratings, and account settings.
- **Product Listings**: Quickly post and browse items, complete with detailed descriptions, images, and pricing information.
- **Search & Filters**: Advanced search functionality with multiple filters to help users find items based on category, price, and more.
- **Ratings System**: Users can rate transactions, providing a secure and trusted environment within the community.
- **Admin Dashboard**: Admin panel for managing users, listings, and monitoring activities within the marketplace.
- **Secure Authentication**: Login and signup functionality with a password visibility toggle for convenience.

## 💻 Tech Stack

- **Frontend**: ReactJS, TailwindCSS
- **Backend**: AWS (API Gateway, Lambda, DynamoDB, S3)
- **Database**: AWS DynamoDB (for storing user data, products, transactions)
- **Authentication**: Firebase or AWS Cognito (Future implementation for secure authentication)
- **Hosting**: AWS S3 (for static file hosting), AWS Lambda (serverless functions)

## 🌐 Deployment

SwapIt is deployed on AWS to ensure scalability and performance:

- **Frontend**: Deployed using AWS S3 and CloudFront for fast delivery and caching.
- **Backend**: Serverless API powered by AWS Lambda, integrated with API Gateway.
- **Database**: Data stored in AWS DynamoDB for fast, scalable, and reliable storage

## 🔄 Future Enhancements

- **User Ratings & Reviews**: Adding transaction reviews to increase user trust and transparency.
- **Payment Integration**: Enabling secure transactions by integrating payment gateways (e.g., Stripe).
- **Mobile Application**: Developing a mobile version of SwapIt using React Native for better accessibility on the go.
