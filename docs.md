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