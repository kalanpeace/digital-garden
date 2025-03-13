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
    description: "Student at University of Michigan | Founder of Vindael Agency | Builder & Developer",
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
          <Text style={{ marginBottom: '2rem' }}>
            I'm Kalan Peace, a student at the University of Michigan with a passion for building innovative projects and solutions.
            While balancing my academic pursuits, I run the Vindael Agency, where we help businesses leverage automation and AI to transform their operations.
            I believe in learning by doing, which is why I'm constantly working on new ideas and projects.
          </Text>

          <Row style={{ marginTop: '1rem' }}>CURRENT VENTURES:</Row>
          <ActionListItem icon="►">Student at University of Michigan</ActionListItem>
          <ActionListItem icon="►">Founder & CEO of Vindael Agency</ActionListItem>
          <ActionListItem icon="►">Independent Project Builder & Developer</ActionListItem>
          <ActionListItem icon="►">AI Business Integration Specialist</ActionListItem>
        </Card>

        <Divider type="GRADIENT" />

        <Card title="[VINDAEL AGENCY]">
          <Text style={{ marginBottom: '1rem' }}>
            At Vindael Agency, we're revolutionizing how businesses approach automation and AI integration. Our mission is to make advanced automation 
            technology accessible and practical for businesses of all sizes, all while maintaining the agility and innovation of a student-led venture.
          </Text>

          <Row style={{ marginTop: '1rem' }}>KEY INITIATIVES:</Row>
          <ActionListItem icon="►">AI-Driven Business Solutions</ActionListItem>
          <ActionListItem icon="►">Custom Automation Systems</ActionListItem>
          <ActionListItem icon="►">Technology Integration Consulting</ActionListItem>
        </Card>

        <Divider type="GRADIENT" />

        <Card title="[PROJECTS & IDEAS]">
          <Text style={{ marginBottom: '1rem' }}>
            As a student builder, I'm constantly exploring new technologies and developing innovative solutions. My approach combines academic knowledge with practical application, resulting in projects that solve real-world problems.
          </Text>

          <Row style={{ marginTop: '1rem' }}>CURRENT FOCUS:</Row>
          <ActionListItem icon="►">InventoryAgent.ai - AI-powered inventory management</ActionListItem>
          <ActionListItem icon="►">Exploring emerging AI technologies</ActionListItem>
          <ActionListItem icon="►">Building tools for student entrepreneurs</ActionListItem>
        </Card>

        <Divider type="GRADIENT" />

        <Card title="[CONTACT INFORMATION]">
          <Row>PERSONAL: kalannp@umich.edu</Row>
          <Row>AGENCY: contact@vindael.com</Row>
          <Row>LOCATION: University of Michigan / Remote</Row>
        </Card>
      </Grid>
    </DefaultLayout>
  );
} 