'use server';

export async function verifyRecaptcha(token: string) {
  console.log('Starting reCAPTCHA verification');
  console.log('Token length:', token.length);
  console.log('Secret key available:', !!process.env.RECAPTCHA_SECRET_KEY);

  const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

  try {
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY || '',
        response: token,
      }),
    });

    const data = await response.json();
    console.log('Verification response:', JSON.stringify(data));

    return data;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, error: 'Verification request failed' };
  }
}
