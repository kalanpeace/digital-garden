import { NextResponse } from 'next/server';
import { supabase } from '@lib/supabase';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log('Received email:', email);

    // First, let's check if we can access the table
    const { error: tableError } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('Table access error:', tableError);
      throw new Error(`Table access error: ${JSON.stringify(tableError)}`);
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Store in Supabase
    const { error, data, status, statusText } = await supabase
      .from('newsletter_subscribers')
      .insert([
        { 
          email,
          subscribed_at: new Date().toISOString(),
          status: 'active'
        }
      ])
      .select();

    console.log('Supabase response:', { status, statusText, error, data });

    if (error) {
      console.error('Supabase error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      if (error.code === '23505') { // Unique violation
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 400 }
        );
      }
      throw error;
    }

    console.log('Successfully subscribed:', data);
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter' 
    });
  } catch (error) {
    console.error('Newsletter subscription error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
} 