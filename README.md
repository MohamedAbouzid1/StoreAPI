# Store API

A RESTful API for managing product data built with Node.js, Express, and MongoDB. This API provides endpoints to retrieve, filter, sort, and paginate product information.

## Features

- **Product Management**: Retrieve product information with advanced filtering
- **Search & Filter**: Search by name, company, featured status, and price/rating ranges
- **Sorting**: Sort products by various fields (name, price, rating, etc.)
- **Field Selection**: Choose specific fields to return in the response
- **Pagination**: Navigate through large datasets with page and limit parameters
- **Numeric Filters**: Apply range-based filtering for price and rating

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Environment Management**: dotenv
- **Error Handling**: express-async-errors
- **Development**: nodemon for auto-restart

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StoreAPI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Populate the database**
   ```bash
   node populate.js
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Base URL
```
http://localhost:5000/api/v1/products
```

### Get All Products
```http
GET /api/v1/products
```

### Get Static Products (Price < $30)
```http
GET /api/v1/products/static
```

## Query Parameters

### Basic Filtering
- `featured`: Filter by featured status (`true` or `false`)
- `company`: Filter by company name (`ikea`, `liddy`, `caressa`, `marcos`)
- `name`: Search products by name (case-insensitive partial match)

### Numeric Filtering
Use `numericFilters` parameter with the following operators:
- `>`: Greater than
- `>=`: Greater than or equal
- `=`: Equal to
- `<`: Less than
- `<=`: Less than or equal

**Supported fields**: `price`, `rating`

Example:
```
?numericFilters=price>50,rating>=4.5
```

### Sorting
- `sort`: Comma-separated list of fields to sort by
- Default: Sorted by `createdAt`

Example:
```
?sort=name,price
?sort=-price (descending order)
```

### Field Selection
- `fields`: Comma-separated list of fields to include in response

Example:
```
?fields=name,price,company
```

### Pagination
- `page`: Page number (default: 1)
- `limit`: Number of items per page (default: 10)

Example:
```
?page=2&limit=5
```

## Example Requests

### Get featured products under $100
```http
GET /api/v1/products?featured=true&numericFilters=price<100
```

### Search for chairs from IKEA
```http
GET /api/v1/products?name=chair&company=ikea
```

### Get products sorted by price (highest first) with only name and price fields
```http
GET /api/v1/products?sort=-price&fields=name,price
```

### Get second page of products with 5 items per page
```http
GET /api/v1/products?page=2&limit=5
```

### Complex filtering: Featured products from Caressa or Liddy, price between $20-$100, rating above 4
```http
GET /api/v1/products?featured=true&numericFilters=price>=20,price<=100,rating>4&sort=-rating
```

## Response Format

```json
{
  "products": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "price": 99,
      "company": "company_name",
      "rating": 4.5,
      "featured": true,
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "nbHits": 1
}
```

## Product Schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| name | String | Yes | - | Product name |
| price | Number | Yes | - | Product price |
| company | String | No | - | Company name (ikea, liddy, caressa, marcos) |
| rating | Number | No | 4.5 | Product rating |
| featured | Boolean | No | false | Featured status |
| createdAt | Date | No | Date.now() | Creation timestamp |

## Project Structure

```
store-api/
├── controllers/
│   └── products.js          # Product controller logic
├── db/
│   └── connect.js           # Database connection
├── middleware/
│   ├── error-handler.js     # Global error handler
│   └── not-found.js         # 404 handler
├── models/
│   └── product.js           # Product mongoose model
├── routes/
│   └── products.js          # Product routes
├── app.js                   # Main application file
├── populate.js              # Database seeding script
├── products.json            # Sample product data
├── package.json             # Dependencies and scripts
└── .env                     # Environment variables
```

## Scripts

- `npm start`: Start the development server with nodemon
- `node populate.js`: Populate the database with sample data

## Error Handling

The API includes comprehensive error handling:
- **404 Not Found**: For non-existent routes
- **500 Internal Server Error**: For server errors
- All async errors are caught and handled appropriately

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Contact

Mohamed Abouzid - [Your Contact Information]

---

**Note**: Make sure to keep your MongoDB connection string and other sensitive information secure by using environment variables and never committing them to version control.
