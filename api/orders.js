import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Server configuration missing' });
  }

  try {
    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY
    );

    const { customer_name, customer_phone, customer_address, items, total_amount } = req.body;

    if (
      typeof customer_name !== 'string' || !customer_name.trim() ||
      !/^\d{10}$/.test(String(customer_phone)) ||
      typeof customer_address !== 'string' || !customer_address.trim() ||
      !Array.isArray(items) || items.length === 0 ||
      !Number.isFinite(Number(total_amount)) || Number(total_amount) < 3100
    ) {
      return res.status(400).json({ error: 'Invalid order details' });
    }

    const order_number = 'SSK-' + Date.now().toString();

    const { data, error } = await supabase
      .from('orders')
      .insert([{
        order_number,
        customer_name: customer_name.trim(),
        customer_phone: String(customer_phone),
        customer_address: customer_address.trim(),
        items,
        total_amount: Number(total_amount),
        payment_method: 'COD',
        status: 'Pending'
      }])
      .select('order_number')
      .single();

    if (error) {
      console.error('Order insert failed:', error.message);
      return res.status(500).json({ error: 'Could not save order' });
    }

    return res.status(201).json({ success: true, order_number: data.order_number });
  } catch (error) {
    console.error('Order API failed:', error.message);
    return res.status(500).json({ error: 'Server error' });
  }
}
