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
    title: "January 2025 - Monthly Update",
    description: "January 2025 update: Digital Garden launch and Lunakai AI agent development",
  };
}

export default async function Page() {
  return (
    <DefaultLayout previewPixelSRC="/favicon.ico">
      <DefaultActionBar />
      <Grid>
        <Text style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
          [TRANSMISSION: JANUARY 2025]
        </Text>

        <Card title="Getting Started [January 2025]">
          <Text style={{ marginBottom: '2rem' }}>
            Welcome to my first monthly update! I'm excited to share the progress I've made in January 2025 as I begin this journey of building in public.
          </Text>

          <Row style={{ marginBottom: '1rem' }}>Digital Garden Launch:</Row>
          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            This month marked the official launch of my digital garden - a space where I can document my progress, share insights, and connect with like-minded individuals. I've designed this site with a terminal-inspired interface to reflect my technical background and create a unique user experience. This will be my platform for monthly updates as I work on various projects throughout 2025.
          </Text>

          <Row style={{ marginBottom: '1rem' }}>Lunakai AI Agent Development:</Row>
          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            My primary focus this month was developing the Lunakai AI agent. This involved creating approximately 200 lines of custom personas to give the agent a distinct personality and voice. The development process was challenging but educational, especially as I navigated hardware limitations and explored cloud GPU solutions.
          </Text>

          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            While working on Lunakai, I gained valuable insights into the current limitations of AI technologies, particularly when it comes to creating truly autonomous agents. The cost implications of running advanced AI models became apparent as well, which helped inform my approach to future AI projects. Despite these challenges, the project provided an excellent foundation in AI development that will serve me well in upcoming ventures.
          </Text>

          <Row style={{ marginBottom: '1rem' }}>Looking Ahead:</Row>
          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            As I move into February, I'll be shifting my focus to a new concept that combines my interest in AI with practical business applications. I've been researching Y Combinator's methodology and best practices for startups, which has inspired some exciting ideas for my next project. 
          </Text>

          <Text style={{ marginBottom: '2rem', marginLeft: '2ch' }}>
            I plan to revisit and expand the Lunakai AI agent in the future when technology advances and becomes more accessible, but for now, I'm excited to channel my energy into new directions that can deliver immediate value.
          </Text>

          <Row style={{ marginTop: '2rem' }}>STATUS: Month Completed</Row>
          <Row>NEXT UPDATE: February 2025</Row>
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