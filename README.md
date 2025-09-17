# 🥛 DoiBazaar - Yogurt E-Commerce Platform

**Live Link:** [👉 Visit DoiBazaar](https://arian2004-doibazar.netlify.app)

---

## 🎯 Purpose

DoiBazaar is a yogurt-based e-commerce platform designed to deliver a **user-friendly**, **visually appealing**, and **secure** shopping experience.  
The goal is to bring premium yogurt products online with seamless browsing, ordering, and payment facilities.

---

## ✨ Key Features

- **Beautiful UI/UX:** Modern, clean, and mobile-responsive design.  
- **Product Catalog:** Browse all yogurt items with filters and search functionality.  
- **Product Details:** Rich product descriptions, gallery, price, and nutrition info.  
- **Cart & Checkout:** Smooth cart management and secure checkout flow.  
- **Secure Payments:** Integrated payment gateway (SSLECOMMERCE).  
- **User Dashboard:** Order history, profile management, and saved addresses.  
- **Admin Panel:** Product CRUD, order tracking, user management, and analytics.  
- **Authentication:** Secure login/signup with optional social login.  
- **Feedback & Support:** Testimonials, FAQ, and contact form for user interaction.  

---

## 🧭 Pages & Structure

| Page                  | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| **Home**              | Brand intro, featured products, CTA       |
| **Products / Shop**   | All yogurt items with filters & search    |
| **Product Details**   | Detailed info of a single product         |
| **Cart**              | User’s selected items list                |
| **Checkout**          | Shipping, payment, order confirmation     |
| **Payment Success/Fail** | Feedback after payment                  |
| **About Us**          | Brand story, team, mission & vision       |
| **Contact**           | Contact form, store address, map          |
| **FAQ**               | Common questions & answers                |
| **Login / Signup**    | User account creation & login             |
| **Dashboard (User)**  | Order history, profile, addresses         |
| **Admin Panel**       | Product, order & user management          |

---

## ⚡ Quick Start

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/arian2004/doibazaar.git
cd doibazaar
```
2️⃣ Install Dependencies
```bash
npm install
# or
yarn install
```
3️⃣ Setup Environment Variables
Create a .env file in the root directory:

```bash
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_secret_key
PAYMENT_API_KEY=your_payment_gateway_key
```
4️⃣ Run Development Server
```bash
npm run dev
Now visit 👉 http://localhost:3000
```

5️⃣ Build for Production
```bash
npm run build
npm start
```
🛠️ Tech Stack
- Frontend: React.js / Next.js, Tailwind CSS, DaisyUI
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Auth: Firebase Auth / JWT
- Payment: SSLECOMMERCE Gateway
- Deployment: Vercel (frontend), Vercel/Render (backend)

🚀 Future Improvements
- Multi-language support (Bangla + English)
- Subscription plans for regular yogurt delivery
- AI-based product recommendations
- Mobile app version

📩 Contact
For queries or collaboration:
- 📧 Email: arian2004feni@gmail.com
- 🌐 Website: DoiBazaar
