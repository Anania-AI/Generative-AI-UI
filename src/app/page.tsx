'use client';
import React from 'react';
import Navigation from '@/components/Navigation';
import Query from '@/components/Query';
import Output from '@/components/Output';
// import { sendQuery } from "api";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

import './App.css';
import getString from "@/utils/getString";

const NAVIGATION_ITEMS = [
  {
    link: 'https://github.com/Anania-AI/Generative-AI-UI',
    text: 'Star us on GitHub',
  },
  {
    link: '#',
    text: 'Join Discord'
  }
]

export default function Home() {

  const [sql, setSql] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleSendQuery = (query) => {
    fetch('/api/query', {
      method: 'POST',
      body: JSON.stringify({
        query,
      })
    }).then(res => res.json()).then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setSql(data.data.choices[0].message.content);
        setError(null);
      }
    })
    // const response = await sendQuery(query);
    // setSql(response.data.choices[0].message.content);
  }

  return (
      <div className="w-full h-full flex justify-center items-center pt-12">
        <div className="w-[676px] h-full">
          <div>
            <Navigation items={NAVIGATION_ITEMS} />
          </div>
          <div className="mt-16 flex justify-center">
            <h1 className="font-bold text-[#2E2E2E] text-[32px] text-center w-4/5">
              {getString('headline')}
            </h1>
          </div>
          <div className="mt-16">
            <Query onSendQuery={handleSendQuery} />
          </div>
          <div className="mt-16 flex justify-center">
            <Output>
              {!sql ? <div className="px-[37px] p-7">
                <h2 className="font-bold text-[24px] text-center">{getString('outputHeadline')}</h2>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                    {error ? error : getString('infoText')}
                </ReactMarkdown>
              </div> : <ReactMarkdown
                  className="w-full"
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(
                          className?.toLowerCase() || ''
                      );
                      return !inline && match ? (
                          <SyntaxHighlighter language={match[1]} PreTag="div" style={dark}>
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                      ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                      );
                    },
                  }}
                  remarkPlugins={[remarkGfm]}
              >
                {sql}
              </ReactMarkdown>}
            </Output>
          </div>
        </div>
      </div>
  );
}
