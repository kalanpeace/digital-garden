import '@root/global.scss';

import * as React from 'react';
import Card from '@components/Card';
import DefaultActionBar from '@components/page/DefaultActionBar';
import DefaultLayout from '@components/page/DefaultLayout';
import Grid from '@components/Grid';
import Row from '@components/Row';
import Text from '@components/Text';
import Divider from '@components/Divider';
import Link from 'next/link';

export const dynamic = 'force-static';

export async function generateMetadata() {
  return {
    title: "Welcome to my Digital Garden - First Newsletter",
    description: "First newsletter outlining the weekly sprint approach for 2025",
  };
}

export default async function Page() {
  return (
    <DefaultLayout previewPixelSRC="/favicon.ico">
      <DefaultActionBar />
      <Grid>
        <Text style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
          [TRANSMISSION: 001]
        </Text>

        <Card title="Welcome to my Digital Garden [1/12/2025]">
          <Text style={{ marginBottom: '2rem' }}>
            Welcome to my first newsletter! I'm excited to share my journey through technology, automation, and personal development with you. This year, I'm taking a unique approach to project development and content creation.
          </Text>

          <Text style={{ marginBottom: '2rem' }}>
            [WEEKLY SPRINT SYSTEM]
            The heart of this newsletter is my intensive weekly sprint system. Here's what makes it special - I'll be dedicating myself to a single project each week, working on it from the moment I wake up until I go to sleep. These aren't just any projects - I'm deliberately choosing ambitious goals that might seem almost impossible to complete in a week. It's going to be quite the challenge juggling this with college and my part-time job, but that's what makes it exciting!
          </Text>

          <Row style={{ marginBottom: '1rem' }}>Week 0:</Row>
          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            Got things rolling by launching this website and mapping out my first sprint. The big idea? Creating an AI agent.
          </Text>

          <Row style={{ marginBottom: '1rem' }}>Week 1: Lunakai AI Agent Project</Row>
          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            This week was a wild ride! I dove into creating an AI agent, crafting about 200 lines of custom personas. Things were moving smoothly until Thursday when reality hit hard. My PC couldn't handle the heavy lifting, so I had to look into cloud GPUs - and wow, those costs add up fast! Had to settle for basic AI art since ComfyUI was out of my budget range. Switched to OpenAI fine-tuning, which was super quick, but here's the thing - the persona still needed way more human hand-holding than I'd hoped for. Even getting it live on Twitter became a money pit thanks to their new API pricing. Honestly, the whole AI agent trend, especially in the crypto space, left me feeling a bit underwhelmed. Still, it was a fun experiment! Planning to revisit this in 6-8 months when the tech's more advanced and I've got more capital to really flesh out that personality with proper databases.
          </Text>

          <Row style={{ marginBottom: '1rem' }}>Week 2 (Current):</Row>
          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            Time to focus on the fundamentals - making my first sale on Upwork! The goal? Land that first client within a week. Need to build up that capital for future projects.
          </Text>

          <Text style={{ marginBottom: '2rem' }}>
            [TRANSMISSION SCHEDULE]
            You'll get the full scoop every Sunday, covering:
            ► All the progress I've made that week
            ► The technical walls I ran into (and hopefully knocked down)
            ► How I solved problems along the way
            ► What I'm aiming for next week
          </Text>

          <Row style={{ marginTop: '2rem' }}>STATUS: First Transmission Complete</Row>
          <Row>NEXT UPDATE: 1/19/2025</Row>
        </Card>

        <Divider type="GRADIENT" />

        <Card title="[SYSTEM NOTE]">
          <Row>To receive future transmissions directly:</Row>
          <Row>► Return to <Link href="/" style={{ color: 'inherit' }}>HOME TERMINAL</Link></Row>
          <Row>► Subscribe to the newsletter</Row>
        </Card>
      </Grid>
    </DefaultLayout>
  );
} 