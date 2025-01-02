import '@root/global.scss';

import * as React from 'react';
import Card from '@components/Card';
import DefaultActionBar from '@components/page/DefaultActionBar';
import DefaultLayout from '@components/page/DefaultLayout';
import Grid from '@components/Grid';
import Row from '@components/Row';
import Text from '@components/Text';
import Divider from '@components/Divider';
import ActionListItem from '@components/ActionListItem';

export const dynamic = 'force-static';

export async function generateMetadata() {
  return {
    title: "About - Kalan Peace",
    description: "Founder of Vindael.com | Automation & AI Integration Expert",
  };
}

export default async function Page() {
  return (
    <DefaultLayout previewPixelSRC="/favicon.ico">
      <DefaultActionBar />
      <Grid>
        <Text style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
          [ABOUT THE OPERATOR]
        </Text>

        <Card title="[PROFESSIONAL PROFILE]">
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', alignItems: 'flex-start' }}>
            <div style={{ 
              width: '200px', 
              height: '200px', 
              position: 'relative',
              border: '2px solid var(--theme-border)',
              flexShrink: 0,
              background: 'var(--theme-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              [IMAGE PENDING]
            </div>
            <Text>
              I'm Kalan Peace, founder of Vindael.com, where we're building the future of automation and AI business integration. 
              With a deep passion for technology and automation, I help businesses leverage AI to transform their operations and decision-making processes.
            </Text>
          </div>

          <Row style={{ marginTop: '1rem' }}>CURRENT VENTURES:</Row>
          <ActionListItem icon="►">Founder & CEO of Vindael.com</ActionListItem>
          <ActionListItem icon="►">AI Business Integration Specialist</ActionListItem>
          <ActionListItem icon="►">Automation Technology Consultant</ActionListItem>
        </Card>

        <Divider type="GRADIENT" />

        <Card title="[VINDAEL.COM]">
          <Text style={{ marginBottom: '1rem' }}>
            At Vindael.com, we're revolutionizing how businesses approach automation and AI integration. Our mission is to make advanced automation 
            technology accessible and practical for businesses of all sizes.
          </Text>

          <Row style={{ marginTop: '1rem' }}>KEY INITIATIVES:</Row>
          <ActionListItem icon="►">AI-Driven Business Solutions</ActionListItem>
          <ActionListItem icon="►">Custom Automation Systems</ActionListItem>
          <ActionListItem icon="►">Technology Integration Consulting</ActionListItem>
        </Card>

        <Divider type="GRADIENT" />

        <Card title="[CONTACT INFORMATION]">
          <Row>EMAIL: kalanpeace@gmail.com</Row>
          <Row>BUSINESS: contact@vindael.com</Row>
          <Row>LOCATION: Remote</Row>
        </Card>
      </Grid>
    </DefaultLayout>
  );
} 