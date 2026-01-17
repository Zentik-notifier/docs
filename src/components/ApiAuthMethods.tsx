import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

interface ApiAuthMethodsProps {
  /**
   * Base URL for the API endpoint (e.g., "https://your-public-url/message" or "/transform?parser=authentik")
   */
  endpoint: string;
  /**
   * HTTP method (default: "GET")
   */
  method?: 'GET' | 'POST';
  /**
   * Additional query parameters (e.g., "&title=Hello&body=Test")
   */
  queryParams?: string;
  /**
   * Request body for POST requests (optional)
   */
  body?: string;
  /**
   * Additional headers for POST requests (optional)
   */
  headers?: string;
}

export default function ApiAuthMethods({
  endpoint,
  method = 'GET',
  queryParams = '',
  body,
  headers,
}: ApiAuthMethodsProps) {
  const baseUrl = endpoint.startsWith('http') ? endpoint : `https://your-public-url${endpoint}`;
  const hasQueryParams = endpoint.includes('?');
  const separator = hasQueryParams ? '&' : '?';

  return (
    <Tabs>
      <TabItem value="magic-code" label="Magic Code" default>
        {method === 'GET' ? (
          <pre>
            <code>{`curl "${baseUrl}${separator}magicCode=YOUR_MAGIC_CODE${queryParams}"`}</code>
          </pre>
        ) : (
          <pre>
            <code>{`curl -X POST \\
  "${baseUrl}${separator}magicCode=YOUR_MAGIC_CODE${queryParams}"${headers ? ` \\
  ${headers}` : ''}${body ? ` \\
  -d '${body}'` : ''}`}</code>
          </pre>
        )}
        <p>
          Replace <code>YOUR_MAGIC_CODE</code> with your actual Magic Code from your bucket settings.
        </p>
      </TabItem>
      <TabItem value="token" label="Token + Bucket ID">
        {method === 'GET' ? (
          <pre>
            <code>{`curl "${baseUrl}${separator}bucketId=YOUR_BUCKET_ID${queryParams}" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`}</code>
          </pre>
        ) : (
          <pre>
            <code>{`curl -X POST \\
  "${baseUrl}${separator}bucketId=YOUR_BUCKET_ID${queryParams}" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"${headers ? ` \\
  ${headers}` : ''}${body ? ` \\
  -d '${body}'` : ''}`}</code>
          </pre>
        )}
        <p>
          Replace <code>YOUR_BUCKET_ID</code> and <code>YOUR_ACCESS_TOKEN</code> with your actual credentials from your bucket settings.
        </p>
      </TabItem>
    </Tabs>
  );
}
