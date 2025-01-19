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
    title: "Week 2: First Client Sprint - Newsletter",
    description: "Second newsletter covering the journey to landing the first client",
  };
}

export default async function Page() {
  return (
    <DefaultLayout previewPixelSRC="/favicon.ico">
      <DefaultActionBar />
      <Grid>
        <Text style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
          [TRANSMISSION: 002]
        </Text>

        <Card title="Week 2: First Client Sprint [1/19/2025]">
          <Text style={{ marginBottom: '2rem' }}>
            Following our journey into AI development, this week we're switching gears to focus on a crucial milestone - landing the first client on Upwork. Here's how we're approaching this challenge.
          </Text>

          <Text style={{ marginBottom: '2rem' }}>
            [SPRINT OBJECTIVES]
            The main goal for this week is clear: secure our first client through Upwork. This isn't just about making a sale - it's about laying the groundwork for sustainable freelance operations and building the capital needed for future projects.
          </Text>

          <Row style={{ marginBottom: '1rem' }}>Key Focus Areas:</Row>
          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            ► Profile Optimization
            ► Portfolio Development
            ► Client Outreach Strategy
            ► Proposal Writing
            ► Service Package Design
          </Text>

          <Row style={{ marginBottom: '1rem' }}>Current Progress:</Row>
          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            Day 1-2: Profile setup and optimization
            Day 3-4: Creating sample projects and documentation
            Day 5-7: Active client outreach and proposal submissions
          </Text>

          <Row style={{ marginBottom: '1rem' }}>What Actually Happened:</Row>
          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            The project example I had done did not get approved due to it being a webscraper. It didn't motivate me much, but I understand what I need to do now and I am ready to start with my learning experience.
          </Text>

          <Text style={{ marginBottom: '2rem' }}>
            [WEEK RETROSPECTIVE]
            This week was tough. I was out of it for a few days and didn't get much done. I also had to deal with a lot of stress from work and school. Just overall meh about it - I really want to get this first client and get this ball rolling. So I'm going to keep grinding it out until I have my first client.
          </Text>

          <Text style={{ marginBottom: '2rem' }}>
            [COURSE CORRECTION]
            I got rid of a lot of things as I felt there was too much focus on trying to be almost performative about the projects. I'm taking a big break from social media - I want to really push myself with landing this first client until I get to the point of making the capital that I need. Then I can shift my focus to the projects.
          </Text>

          <Row style={{ marginTop: '2rem' }}>STATUS: Completed</Row>
          <Row>NEXT UPDATE: 1/26/2025</Row>
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