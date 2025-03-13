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
    title: "Back in Action - Third Newsletter",
    description: "Updates on active projects including InventoryAgent.ai",
  };
}

export default async function Page() {
  return (
    <DefaultLayout previewPixelSRC="/favicon.ico">
      <DefaultActionBar />
      <Grid>
        <Text style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
          [TRANSMISSION: 003]
        </Text>

        <Card title="Back in Action [6/23/2024]">
          <Text style={{ marginBottom: '2rem' }}>
            These past few weeks I have been neglecting my updates here, but I've been working diligently on active projects behind the scenes. I'm excited to share what I've been building and the progress I've made.
          </Text>

          <Row style={{ marginBottom: '1rem' }}>Current Project: InventoryAgent.ai</Row>
          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            I'm thrilled to announce my latest venture: InventoryAgent.ai - an AI-powered inventory management solution built specifically for small and medium-sized businesses. Using cutting-edge Next.js for the frontend and Supabase for secure, scalable backend services, this platform represents the future of inventory management.
          </Text>

          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            What sets InventoryAgent.ai apart is its sophisticated AI engine that not only tracks inventory but actually learns from your business patterns. The system can predict stock requirements, identify supply chain bottlenecks, and even suggest optimal pricing strategies based on market conditions and historical data.
          </Text>

          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            The interface is designed with simplicity in mind - a beautiful, intuitive dashboard that provides powerful insights without overwhelming the user. Real-time analytics visualizations make complex data instantly understandable, while the responsive design ensures a seamless experience across all devices.
          </Text>

          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            Integration capabilities were a priority from day one. InventoryAgent.ai connects effortlessly with popular e-commerce platforms, POS systems, and accounting software, creating a unified ecosystem for business operations. The platform also features customizable automation workflows that can be tailored to each business's unique processes.
          </Text>

          <Row style={{ marginBottom: '1rem' }}>Technical Challenges:</Row>
          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            Building InventoryAgent.ai hasn't been without its challenges. Developing an AI model that could adapt to the diverse inventory patterns across different industries required extensive testing and refinement. Optimizing the real-time synchronization between the Next.js frontend and Supabase backend while maintaining snappy performance was another hurdle that demanded innovative solutions.
          </Text>

          <Row style={{ marginBottom: '1rem' }}>Looking Forward:</Row>
          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            In the coming weeks, I'll be focusing on expanding the AI capabilities to include image recognition for inventory scanning and implementing advanced forecasting algorithms. I'm also planning to add comprehensive API documentation to facilitate third-party integrations.
          </Text>

          <Text style={{ marginBottom: '2rem' }}>
            I'm recommitting to providing regular updates on my projects and sharing both the triumphs and challenges along the way. Stay tuned for more detailed technical breakdowns of InventoryAgent.ai's architecture and the lessons learned throughout its development.
          </Text>

          <Row style={{ marginTop: '2rem' }}>STATUS: Development In Progress</Row>
          <Row>NEXT UPDATE: 6/30/2024</Row>
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