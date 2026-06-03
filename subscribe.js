export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, first_name, event_type } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const SERVER  = API_KEY.split('-')[1];

  // Build tags — always 'waitlist', plus event type if provided
  const tags = ['waitlist'];
  if (event_type) tags.push(event_type);

  try {
    const response = await fetch(
      `https://${SERVER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + Buffer.from('anystring:' + API_KEY).toString('base64')
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: first_name || '',
            ETYPE: event_type || ''
          },
          tags
        })
      }
    );

    const data = await response.json();

    if (response.ok || data.title === 'Member Exists') {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: data.detail || 'Signup failed' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}
