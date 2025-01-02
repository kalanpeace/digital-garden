'use client';

import * as React from 'react';
import Input from '@components/Input';
import Text from '@components/Text';
import Row from '@components/Row';

export default function NewsletterForm() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Successfully subscribed to newsletter!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Input
          label="NEWSLETTER SUBSCRIPTION"
          placeholder="Enter your email address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
      </Row>
      {status !== 'idle' && (
        <Text style={{ 
          marginTop: '0.5rem',
          color: status === 'error' ? 'var(--theme-error)' : 'var(--theme-success)'
        }}>
          {message}
        </Text>
      )}
      <Text style={{ marginTop: '1rem', opacity: 0.8 }}>
        Subscribe to receive my weekly articles directly in your inbox.
      </Text>
    </form>
  );
} 