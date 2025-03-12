export async function POST(request) {
    try {
      const body = await request.json();
      
      // Validate form data
      if (!body.name || !body.email || !body.message) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400
        });
      }
  
      // Add your email sending logic here (using Nodemailer, SendGrid, etc.)
      console.log('Contact form submission:', body);
  
      return new Response(JSON.stringify({ 
        success: true,
        message: 'Thank you for your message! I will respond shortly.'
      }), { status: 200 });
  
    } catch (error) {
      console.error('Contact form error:', error);
      return new Response(JSON.stringify({ 
        error: 'Error processing your request' 
      }), { status: 500 });
    }
  }