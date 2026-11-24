# Flight Booking Application

This is a simple Spring Boot application that allows users to book flights based on special deals and view their existing bookings.

## Project Overview

This application is built using Java and the Spring Boot framework. It provides a REST API for managing special flight deals and handling flight bookings. The application uses a PostgreSQL database to store data.

### Core Technologies

- **Java 17**: The programming language used for the application.
- **Spring Boot**: The framework used to build the application. It simplifies the development of stand-alone, production-grade Spring-based applications.
- **Spring Web**: Provides features for building web applications, including RESTful applications.
- **Spring Data JPA**: Simplifies data access using the Java Persistence API (JPA).
- **PostgreSQL**: The relational database used to store application data.
- **Maven**: A build automation tool used for project management and dependencies.

## How to Run the Application

1.  **Prerequisites**:
    *   Java 17 or later installed.
    *   Maven installed.
    *   PostgreSQL database running.

2.  **Database Setup**:
    *   Create a PostgreSQL database named `flightdb`.
    *   Update the `src/main/resources/application.properties` file with your PostgreSQL username and password.

3.  **Build and Run**:
    *   Open a terminal in the project's root directory.
    *   Run the following Maven command to build and start the application:
        ```bash
        mvn spring-boot:run
        ```
    *   The application will start on `http://localhost:8080`.

## Project Structure

The project follows a standard Spring Boot application structure:

-   `src/main/java/com/flightapp/flightapp`: The root package for the application's source code.
    -   `controller`: Contains the REST controllers that handle incoming HTTP requests.
    -   `service`: Contains the business logic of the application.
    -   `model`: Contains the entity classes that represent the data model.
    -   `repository`: Contains the Spring Data JPA repositories for database interactions.
-   `src/main/resources`: Contains static resources, templates, and the application configuration file.
    -   `application.properties`: The configuration file for the application, including database connection settings.

## Request Flow

In a Spring Boot application, the request flow typically follows the Model-View-Controller (MVC) pattern, which in this case is adapted for a REST API.

### 1. Special Deals Flow

#### Fetching Active Special Deals

1.  **HTTP Request**: A `GET` request is sent to `/deals`.
2.  **Controller**: The `SpecialDealController`'s `getDeals()` method is invoked.
3.  **Service**: The controller calls the `getActiveDeals()` method in the `SpecialDealService`.
4.  **Repository**: The service uses the `SpecialDealRepository` to query the database for all deals that have not expired.
5.  **Database**: The database returns the list of active special deals.
6.  **Response**: The list of deals is returned up the chain and sent back as the HTTP response body in JSON format.

### 2. Booking Flow

#### Booking a Flight

1.  **HTTP Request**: A `POST` request is sent to `/booking/{dealId}?phone={phoneNumber}`.
2.  **Controller**: The `BookingController`'s `book()` method is invoked, capturing the `dealId` from the path and the `phone` number from the request parameters.
3.  **Service**: The controller calls the `bookFlight()` method in the `BookingService`.
4.  **Repository**:
    *   The service first uses the `SpecialDealRepository` to find the deal by its ID.
    *   It then creates a new `Booking` object, associates it with the deal, and saves it using the `BookingRepository`.
5.  **Database**: The new booking record is saved in the database.
6.  **Response**: The newly created booking object is returned as the HTTP response body in JSON format.

## API Endpoints

### Special Deal Endpoints

-   `GET /deals`: Get a list of all active special deals.
-   `POST /deals`: Create a new special deal.
-   `PUT /deals/{id}`: Update an existing special deal.
-   `DELETE /deals/{id}`: Delete a special deal.

### Booking Endpoints

-   `POST /booking/{dealId}`: Book a flight for a given deal ID. Requires a `phone` request parameter.
-   `GET /booking/phone/{phone}`: Get all bookings for a specific phone number.
-   `GET /booking`: Get all bookings for a specific phone number (alternative to the above, using a request parameter).
