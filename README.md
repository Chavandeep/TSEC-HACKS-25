# Farmissan

## Statement ID: 1637

### Overview:
Farmissan is a mobile application designed to connect farmers directly with consumers and retailers, eliminating the middleman. By giving farmers access to fair markets, the app empowers them to showcase their products, negotiate prices, and manage transactions, leading to better income opportunities.

### Key Features:

1. **Homepage:**
   - Provides a brief overview of the platform and its mission to empower farmers.

2. **Product Listings:**
   - Displays all available products with filtering options to help users find specific items.

3. **Multilingual Support:**
   - The app supports all major Indian languages to cater to farmers and consumers across the country.

4. **Signup Page:**
   - A straightforward signup process for new users, with the option to choose whether they are a Farmer, Retailer, or Consumer.

5. **Login:**
   - Secure login system using Firebase authentication for easy access to the platform.

6. **Upload Feature:**
   - Farmers can upload photos of their products, with location metadata attached to ensure authenticity.

7. **Inventory Management:**
   - Allows farmers to manage their product listings, track stock, and update details as needed.

8. **Product Detail View:**
   - Provides detailed information about individual products, including the farmer's details and the product's origin.

9. **Loyalty Programs:**
   - Farmers and consumers can participate in loyalty programs that reward regular transactions and engagement.

10. **Negotiation Chat:**
    - A custom chat system that enables farmers and consumers/retailers to negotiate prices in private conversations.

11. **Market Price History:**
    - API integration to fetch historical market prices, helping farmers and buyers make informed decisions based on past trends.

12. **Farmer-Specific Dashboard:**
    - A personalized dashboard for farmers, enabling them to manage products, track sales, and analyze their performance.

13. **Shopping Cart:**
    - Users can add products to their cart for easy checkout and seamless purchasing.

14. **Checkout Process:**
    - Simple and secure checkout process for customers to complete their transactions.

15. **Blog/Posts:**
    - A blog section with posts on farming tips, market insights, and other useful content for both farmers and consumers.

16. **User Connections:**
    - Farmers, consumers, and retailers can connect with each other for direct communication, especially for negotiations.

17. **Loans and Educational Resources:**
    - Farmers have access to information on loans and educational resources such as videos on improving farming practices.

18. **In-Real-Life (IRL) Visits:**
    - Farmers can schedule in-person visits, allowing customers and retailers to see their farms directly.

19. **3D Virtual Farm Tours:**
    - Virtual 3D tours of farms to allow customers and retailers to explore farms remotely.

### Route Management:

The app implements protected routes for different user types, ensuring that each user has access to relevant dashboards based on their role:

- **Farmer Dashboard:** Accessible only by farmers to manage their products and track sales.
- **Retailer Dashboard:** Accessible by retailers for managing their inventory and viewing farmer products.
- **Consumer Dashboard:** Accessible by consumers to browse products, connect with farmers, and complete purchases.

Each of these dashboards is accessible through a protected route to ensure security and proper user access control.

### Conclusion:
Farmissan is a comprehensive platform designed to empower farmers by connecting them directly with consumers and retailers. The app’s user-friendly features, multilingual support, and various tools for product management, negotiation, and market analysis provide a seamless experience that benefits all users.
