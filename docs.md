Essential Ecommerce Models

1. User
Stores customer info and optionally admin data

Fields:

name, email, passwordHash

role (user/admin)

address, phone

createdAt, updatedAt

2. Product
Info about products you sell

Fields:

name, description, price, category

images (array of URLs)

stockQuantity

ratings, reviews (optional subdocs)

createdAt, updatedAt

3. Category
Optional but good for product organization

Fields:

name, description

parentCategory (for nested categories)

4. Order
Tracks customer orders

Fields:

user (reference to User)

orderItems (array of products with quantity & price)

shippingAddress

paymentMethod

paymentStatus, orderStatus

totalPrice

createdAt, updatedAt

5. Cart
Optional model for active shopping carts

Fields:

user (reference)

items (array of product references and quantities)

6. Review
Customer product reviews

Fields:

product (ref)

user (ref)

rating

comment

createdAt

7. Payment
Records of payment transactions (optional)

Fields:

order (ref)

paymentId

status

amount

paymentMethod

createdAt


```json
{
  "users": [
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "password": "password123",
      "role": "user",
      "address": "123 Main Street, Lagos",
      "phone": "+2348123456789"
    },
    {
      "name": "Admin User",
      "email": "admin@example.com",
      "passwordHash": "adminhashed123",
      "role": "admin",
      "address": "456 Admin Rd, Abuja",
      "phone": "+2348000000000"
    }
  ],
  "categories": [
    {
      "name": "Electronics",
      "description": "Electronic gadgets and devices"
    },
    {
      "name": "Smartphones",
      "description": "Latest smartphones",
      "parentCategory": "Electronics"
    }
  ],
  "products": [
    {
      "name": "iPhone 14 Pro",
      "description": "Apple smartphone with A16 Bionic chip",
      "price": 1200,
      "category": "Smartphones",
      "images": [
        "https://example.com/images/iphone14-front.jpg",
        "https://example.com/images/iphone14-back.jpg"
      ],
      "stockQuantity": 50,
      "ratings": 4.8
    },
    {
      "name": "Samsung Galaxy S23",
      "description": "Flagship Samsung phone",
      "price": 1100,
      "category": "Smartphones",
      "images": [
        "https://example.com/images/galaxy-s23.jpg"
      ],
      "stockQuantity": 35,
      "ratings": 4.5
    }
  ],
  "carts": [
    {
      "user": "jane@example.com",
      "items": [
        {
          "product": "iPhone 14 Pro",
          "quantity": 1
        },
        {
          "product": "Samsung Galaxy S23",
          "quantity": 2
        }
      ]
    }
  ],
  "orders": [
    {
      "user": "jane@example.com",
      "orderItems": [
        {
          "product": "iPhone 14 Pro",
          "quantity": 1,
          "price": 1200
        }
      ],
      "shippingAddress": {
        "address": "123 Main Street",
        "city": "Lagos",
        "postalCode": "100001",
        "country": "Nigeria"
      },
      "paymentMethod": "PayPal",
      "paymentStatus": "paid",
      "orderStatus": "shipped",
      "totalPrice": 1200
    }
  ],
  "payments": [
    {
      "order": "iPhone 14 Pro",
      "paymentId": "PAYID-12345678",
      "status": "completed",
      "amount": 1200,
      "paymentMethod": "PayPal"
    }
  ],
  "reviews": [
    {
      "product": "iPhone 14 Pro",
      "user": "jane@example.com",
      "rating": 5,
      "comment": "Amazing phone! Battery life is great.",
      "createdAt": "2024-06-01T12:00:00Z"
    },
    {
      "product": "Samsung Galaxy S23",
      "user": "jane@example.com",
      "rating": 4,
      "comment": "Very good but a bit pricey.",
      "createdAt": "2024-06-02T09:30:00Z"
    }
  ]
}
```
