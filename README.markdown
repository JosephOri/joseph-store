# E-Commerce Website

This is an e-commerce website built with modern web technologies. It allows users to browse products, add them to a cart, and make purchases using PayPal or Stripe. The project is currently in development and not yet complete.

## Features

- User authentication with NextAuth
- Product browsing and searching
- Shopping cart functionality
- Payment integration with PayPal and Stripe
- Admin dashboard for managing products and orders (in progress)

## Technologies Used

- Next.js
- Prisma
- NextAuth
- PayPal API
- Stripe API

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JosephOri/joseph-store.git
   ```

2. Navigate to the project directory:

   ```bash
   cd joseph-store
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```
NEXT_PUBLIC_APP_NAME="Joseph Store"
NEXT_PUBLIC_APP_DESCRIPTION="A modern E-commerce platform build with nextjs"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000" #change in production 

NEXTAUTH_URL="http://localhost:3000" #change in production 
NEXTAUTH_SECRET="your secret"
NEXTAUTH_URL_INTERNAL="http://localhost:3000"

PAYMENT_METHODS="PayPal, Stripe, CashOnDelivery"
DEFAULT_PAYMENT_METHOD="PayPal"

DATABASE_URL="your_database_url"
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

## Usage

Once the development server is running, you can access the website at `http://localhost:3000`. From there, you can browse products, add them to your cart, and proceed to checkout using PayPal or Stripe.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the code style and include tests where applicable.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please open an issue on the GitHub repository or contact me at yourname@example.com.

## Current Status

This project is currently in development. Some features are still being implemented, and there may be bugs or incomplete functionality. Please check the issue tracker for known issues and planned features.
