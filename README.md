# Smart Solutions — Kateya

A mobile-friendly storefront prototype for Smart Solutions, Kateya.

## Current prototype features
- Responsive storefront with product cards and category filters
- Cart quantity controls and COD checkout form
- Demo admin area for viewing local demo orders and adding/deleting demo products
- WhatsApp pre-filled order message hook (customer must press Send)

## Important before going live
This is a front-end prototype only. Products and orders are stored in browser `localStorage`, so they are NOT shared across devices and are not suitable for real customer orders. The demo admin login is visible in source code and is NOT secure.

Before launch, connect a shared database (for example Supabase), implement Supabase Auth for admin login, enforce Row Level Security, validate checkout server-side, and configure the verified store WhatsApp number. Replace sample products/prices, exact address, contact details, and opening hours with details approved by the owner.

## Preview locally
Open `index.html` in a browser. For Vercel, import this repository as a static site; `index.html` is the entry point.
