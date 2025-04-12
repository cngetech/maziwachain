# **App Name**: MaziwaChain

## Core Features:

- Streamlined UI: Simple, intuitive interfaces for Milk Men and Milk Shop owners to record deliveries and sales.
- Reporting Dashboards: Clear and concise reporting dashboards for Milk Men, Milk Shop owners, and Admins.
- Access control: Role-based access control to protect sensitive data.
- AI-Powered Sales Insights: Use an AI tool to generate insights from sales data.

## Style Guidelines:

- Primary color: Light green (#90EE90) to represent freshness.
- Secondary color: Cream (#FFFDD0) to evoke the natural color of milk.
- Accent: Light brown (#D2B48C) to ground the palette and add a touch of earthiness.
- Clean, grid-based layouts for easy data visualization.
- Simple, line-based icons to represent milk, deliveries, and payments.

## Original User Request:
Project Proposal: TastyMaziwa - Small-Scale Milk Supply Chain Management System  

 1. Introduction  
TastyMaziwa is a digital supply chain management system designed to streamline milk transactions between small-scale milk producers (Milk Men), milk shops, and administrators. The system ensures transparency, accountability, and efficiency in milk deliveries, sales, and financial tracking.  

 Problem Statement  
Small-scale milk supply chains often rely on manual record-keeping, leading to:  
- Inefficient tracking of milk deliveries and payments.  
- Lack of transparency between milk producers and sellers.  
- Difficulty in reconciling credit sales and digital payments (e.g., MPESA).  
- Poor reporting for business insights. 

 Solution  
TastyMaziwa automates milk transactions, providing:  
- Real-time tracking of milk deliveries and payments. 
- Digital recording of credit and MPESA sales. 
- Automated reporting for accountability. 
- A centralized admin dashboard for oversight. 

---

 2. Objectives  
1. Digitize milk transactions between milk producers and shops. 
2. Improve financial tracking with automated payment calculations. 
3. Enhance accountability with real-time sales and delivery reports. 
4. Offer business insights through data analytics.  

---

 3. System Features  

 A. User Roles & Access Levels  
| Role | Permissions |  
|------|------------|  
| Milk Man | Record milk deliveries, view expected payments, generate reports. |  
| Milk Shop | View deliveries, record sales (cash/credit/MPESA), manage customers, generate reports. |  
| Admin | View all transactions, generate system-wide reports, manage users. |  

 B. Functional Requirements  

 1. Milk Man View  
- Daily Milk Delivery Log  
  - Input liters delivered, expected payment, and date.  
  - Auto-calculate payment based on wholesale price.  
- Milk Reports  
  - Filter by date to view deliveries and payments.  
  - Export reports (PDF/Excel).  

 2. Milk Shop View  
- Milk Delivery Tracking  
  - View daily milk received and amount owed to milk man.  
- Sales Recording  
  - Credit Sales: Log customer name, liters sold, due date.  
  - MPESA Sales: Log MPESA transaction ID, amount, liters sold.  
- Customer Management  
  - Register customers (name, contact, credit limit).  
- Sales Reports  
  - Filter by date to reconcile MPESA, credit, and cash sales.  
  - Ensure total milk sold matches inventory.  

 3. Admin Dashboard  
- Transaction Monitoring  
  - View all milk deliveries, sales, and payments.  
- Financial Reports  
  - Track revenue, pending payments, and shop profitability.  
- User Management  
  - Add/edit/disable users (milk men, shop owners).  

---

 4. Technology Stack  
| Component | Technology |  
|-----------|------------|  
| Frontend | Next.js (TypeScript), Tailwind CSS |  
| Backend | Next.js API Routes |  
| Database | PostgreSQL (Prisma ORM) |  
| Authentication | NextAuth.js (JWT) |  
| Payments Integration | Safaricom Daraja API (MPESA) |  
| Reporting | Chart.js, PDF Kit (for exports) |  

---

 5. System Architecture  
 High-Level Flow  
1. Milk Man submits daily delivery → stored in DB.  
2. Milk Shop records sales (cash/credit/MPESA) → updates inventory.  
3. Admin monitors all transactions and generates reports.  

 Database Schema (Key Tables)  
- Users (id, name, role, contact)  
- Milk Deliveries (milkManId, shopId, liters, price, date)  
- Sales (shopId, customerId, liters, paymentMode, date)  
- Customers (name, phone, creditLimit)  
- Payments (milkManId, amount, status, date)  

---

 6. Implementation Plan  

 Phase 1: Core System (4 Weeks)  
- Set up Next.js + PostgreSQL.  
- Implement authentication (Milk Man, Shop, Admin).  
- Develop milk delivery & sales recording.  

 Phase 2: Reporting & Payments (3 Weeks)  
- Integrate MPESA (Daraja API).  
- Build reporting dashboards.  
- Add PDF/Excel export.  

 Phase 3: Testing & Deployment (2 Weeks)  
- User acceptance testing (UAT).  
- Deploy on Vercel + Supabase.  

---

 7. Expected Outcomes  
✅ Transparent milk supply chain with digital records. 
✅ Reduced errors in payment calculations. 
✅ Improved business decisions via analytics. 
✅ Scalable solution for multiple milk shops. 

---

 8. Future Enhancements  
- Mobile App (React Native) for milk men.  
- SMS Notifications for payment reminders.  
- Expense Tracking for milk shops.  

---

 9. Conclusion  
TastyMaziwa modernizes small-scale milk supply chains, ensuring efficiency and trust between stakeholders. By automating transactions and reporting, it empowers milk producers and sellers to grow their businesses sustainably. 

Next Steps:  
- Complete UI/UX design. 
- Develop MVP for pilot testing.
  