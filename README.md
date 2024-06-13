# lojiper-case-study

## Overview

This project is a personal finance tracking application developed using Next.js, TypeScript, and Tailwind CSS. The application allows users to manage their debts and payment plans efficiently. The core functionalities include user authentication (registration and login), dashboard display of financial data, and CRUD operations for debts and payment plans.

## Project Structure


## Pages

1. **Dashboard**
   - Displays a summary of debts and payment plans using charts.
   - Fetches data from the backend and renders it using Chart.js.

2. **Debts**
   - Lists all debts with options to add, edit, and delete debts.
   - Utilizes a popup form (`NewDebtsPopup`) for adding and editing debts.

3. **Login**
   - User authentication page for logging in.
   - Uses context to manage authentication state.

4. **Payment**
   - Displays all payment plans.
   - Similar to the Debts page, it fetches data from the backend.

5. **Register**
   - User registration page with validation for email, password, and name.

## Components

1. **Navbar**
   - Provides navigation links based on authentication state.
   - Links to Debts, Payment, Dashboard, and Login/Register pages.

2. **NewDebtsPopup**
   - Popup form for adding and editing debts.
   - Calculates the payment plan based on input values.

## Contexts

1. **AuthContext**
   - Manages authentication state (login, logout, token storage).
   - Provides authentication context to the entire application.

## Types

1. **PaymentPlan**
   - Defines the structure for payment plans.

2. **Debt**
   - Defines the structure for debts, including payment plans.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
