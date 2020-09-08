# Parking Lot API

A Parking Lot system implementation in RESTful API

## Data Models

- ParkingSpace
  - parking_lot_name: "default"
  - spot_no
  - is_reserved
  - vehicle_id
- Vehicle
  - owner_id
  - registraion_no
- User
  - name
  - can_use_reserved_space
  - reason_for_reserve
- Booking
  - booked_at
  - allotted_parking_space_id
  - vehicle_id

### Relationships and Embedding

- ParkingSpace
- User:
  - embeds Vehicles
  - embeds Bookings

---

## Notes

- Used ES6 Wherever possible

---

## APIs

- /api/v1/parking_lots/init - For Initialing System (creates a parking lot with default name)
- /api/v1/parking_spaces/search - Generic Search API for getting all and occupied parking spaces
- /api/v1/users - Returns list of registered Users
- /api/v1/users/book
- /api/v1/parking_spaces/park
- /api/v1/parking_spaces/leave

---

## Features
- APIs the RESTful in nature, I tried to follow RESTful design as much as possible
- Accomodated if user has multiple vehicles

---

## Pre-requisites

- NodeJS
- MongoDB

## Installation

```shell
# Using npm
npm install

# Using yarn
yarn add
```

---

## Running

```shell
# For Local Development
npm run dev

# On Production, Use pm2 or docker container
pm2 start src/app.js

# OR

node src/app.js
```

---

## Future Enhancements
- We can have a schedular
- API result should be paginated
- Input Validations
- CORS
- Can use Depedency Injection / IoC
- Use denormalized form to store vehicles inside user document, but we could have separate vehicles decuments as well

---

### Development Notes

```shell

- ParkingLot
  - name
  - capacity
  - address


db.parking_spaces.update({ '_id': ObjectId('5f579e688d8deb218866c219')}, {'vehicle_id': ObjectId('5f579e688d8deb218866c219')})


```
