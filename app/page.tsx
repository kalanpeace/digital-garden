import '@root/global.scss';

import * as React from 'react';
import ActionListItem from '@components/ActionListItem';
import Avatar from '@components/Avatar';
import BarProgress from '@components/BarProgress';
import Card from '@components/Card';
import DefaultActionBar from '@components/page/DefaultActionBar';
import DefaultLayout from '@components/page/DefaultLayout';
import Divider from '@components/Divider';
import Grid from '@components/Grid';
import Input from '@components/Input';
import Row from '@components/Row';
import Text from '@components/Text';
import TreeView from '@components/TreeView';
import NewsletterForm from '@components/NewsletterForm';

export const dynamic = 'force-static';

export async function generateMetadata() {
  return {
    title: "Kalan Peace",
    description: "Automation Expert & Developer",
  };
}

export default async function Page() {
  return (
    <DefaultLayout previewPixelSRC="/favicon.ico">
      <DefaultActionBar />

      <Grid>
        <Text style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
          WELCOME TO THE TERMINAL
        </Text>
        
        <Text style={{ marginBottom: '2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
          Hey there! I'm Kalan Peace. This is my digital garden where I share my thoughts on technology, automation, and software development.
        </Text>

        <Card title="[TERMINAL BROADCAST]">
          <NewsletterForm />
          
          <Text style={{ marginTop: '2rem', opacity: 0.8 }}>LATEST TRANSMISSION:</Text>
          
          <Card title="Welcome to my Digital Garden [1/7/2025]">
            <Text>A glimpse into my upcoming journey through technology, automation, and personal development. Join me as we explore the intersection of code and creativity.</Text>
            <Row style={{ marginTop: '1rem' }}>STATUS: Coming Soon</Row>
          </Card>
        </Card>

        <Divider type="GRADIENT" />

        <Text style={{ fontSize: '1.2rem', marginTop: '2rem' }}>
          [NETWORK CONNECTIONS]
        </Text>
        <ActionListItem icon="⌬" href="https://github.com/kalanpeace" target="_blank">
          GitHub
        </ActionListItem>
        <ActionListItem icon="⌬" href="https://youtube.com/@kalanpeace" target="_blank">
          YouTube
        </ActionListItem>
        <ActionListItem icon="⌬" href="https://tiktok.com/@kalanpeace" target="_blank">
          TikTok
        </ActionListItem>
        <ActionListItem icon="⌬" href="https://twitter.com/kalanpeace" target="_blank">
          Twitter
        </ActionListItem>
        <ActionListItem icon="⌬" href="https://linkedin.com/in/kalanpeace" target="_blank">
          LinkedIn
        </ActionListItem>

        <Divider type="GRADIENT" />

        <Text style={{ fontSize: '1.2rem', marginTop: '2rem' }}>
          [KNOWLEDGE BASE]
        </Text>
        <TreeView title="Computer Science & AI" defaultValue={true}>
          <TreeView title="Artificial Intelligence">
            <TreeView title="Machine Learning Notes.txt" isFile href="#" />
            <TreeView title="Neural Networks.txt" isFile href="#" />
          </TreeView>
          <TreeView title="Programming">
            <TreeView title="Design Patterns.txt" isFile href="#" />
            <TreeView title="System Architecture.txt" isFile href="#" />
          </TreeView>
        </TreeView>

        <TreeView title="Automation & Systems" defaultValue={true}>
          <TreeView title="Process Automation">
            <TreeView title="Workflow Design.txt" isFile href="#" />
            <TreeView title="Integration Patterns.txt" isFile href="#" />
          </TreeView>
          <TreeView title="Testing">
            <TreeView title="Test Automation.txt" isFile href="#" />
            <TreeView title="Quality Assurance.txt" isFile href="#" />
          </TreeView>
        </TreeView>

        <TreeView title="Mathematics" defaultValue={true}>
          <TreeView title="Applied Mathematics">
            <TreeView title="Linear Algebra.txt" isFile href="#" />
            <TreeView title="Statistics.txt" isFile href="#" />
          </TreeView>
          <TreeView title="Theoretical">
            <TreeView title="Algorithms.txt" isFile href="#" />
            <TreeView title="Discrete Math.txt" isFile href="#" />
          </TreeView>
        </TreeView>

        <TreeView title="Philosophy & Literature" defaultValue={true}>
          <TreeView title="Philosophy">
            <TreeView title="Reading List.txt" isFile href="#" />
            <TreeView title="Personal Notes.txt" isFile href="#" />
          </TreeView>
          <TreeView title="Academic Papers">
            <TreeView title="Research Collection.txt" isFile href="#" />
            <TreeView title="Study Notes.txt" isFile href="#" />
          </TreeView>
        </TreeView>

        <Text style={{ fontSize: '1.2rem', marginTop: '2rem' }}>
          [ACTIVE PROJECT]
        </Text>
        
        <Card title="Personal Website">
          <Row>Progress: <BarProgress progress={85} /></Row>
          <Row>Stack: Next.js/TypeScript</Row>
          <Row>Status: Active Development</Row>
          <Row style={{ marginTop: '1rem' }}>DEVELOPMENT ROADMAP:</Row>
          <ActionListItem icon="►">Implement live counting functionality</ActionListItem>
          <ActionListItem icon="►">Enhanced terminal-inspired UI elements</ActionListItem>
          <ActionListItem icon="►">Profile and community features</ActionListItem>
          <ActionListItem icon="►">Add profile picture to about page</ActionListItem>
        </Card>

        <Divider type="GRADIENT" />

        <Card title="[SYSTEM SPECS]">
          <Row>OPERATOR: Kalan Peace</Row>
          <Row>ROLE: Automation Expert & Developer</Row>
          <Row>EMAIL: kalanpeace@gmail.com</Row>
          <Row>STATUS: Online and accepting connections</Row>
          <Row style={{ marginTop: '1rem' }}>SYSTEM METRICS:</Row>
          <Row>► Projects Completed: 1</Row>
          <Row>► Books Read: 0</Row>
        </Card>
      </Grid>
    </DefaultLayout>
  );
}
