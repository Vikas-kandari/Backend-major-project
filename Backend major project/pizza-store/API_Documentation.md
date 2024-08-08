# Pizza Store API Documentation

## Base URL
http://localhost:3000


## Endpoints

### 1. **Create a New Item**

- **Request Type**: POST
- **URL**: `/items`
- **Request Body**:
 # ```json
 # {
   # "name": "Margherita",
    # "description": "Classic cheese pizza",
    # "price": 9.99
  }
# Status Code: 302 Found (Redirect to /items)
# 2. Retrieve All Items
# Request Type: GET
# URL: /items
# [
  # {
    # "_id": "60d1b2f4e1b1c2f4e0aebd42",
    # "name": "Margherita",
    # "description": "Classic cheese pizza",
    # "price": 9.99
  },
  # {
    # "_id": "60d1b2f4e1b1c2f4e0aebd43",
    # "name": "Pepperoni",
    # "description": "Pizza with pepperoni slices",
    # "price": 12.99
  }
]
 # Retrieve a Specific Item by ID
# Request Type: GET
# URL: /items/:id
# {
  # "_id": "60d1b2f4e1b1c2f4e0aebd42",
  # "name": "Margherita",
  # "description": "Classic cheese pizza",
  # "price": 9.99
}
# Update an Existing Item by ID
# Request Type: PUT
# URL: /items/:id
# {
  # "name": "Margherita Deluxe",
  # "description": "Classic cheese pizza with extra cheese",
  # "price": 11.99
}
# Delete an Item by ID
# Request Type: DELETE
# URL: /items/:id
# Response:
# Status Code: 302 Found (Redirect to /items)
