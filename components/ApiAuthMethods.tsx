import { Tabs, Tab } from 'fumadocs-ui/components/tabs';

interface ApiAuthMethodsProps {
  endpoint: string;
  method?: 'GET' | 'POST';
  queryParams?: string;
  body?: string;
  headers?: string;
}

export default function ApiAuthMethods({
  endpoint,
  method = 'GET',
  queryParams = '',
  body,
  headers,
}: ApiAuthMethodsProps) {
  const baseUrl = endpoint.startsWith('http')
    ? endpoint
    : `https://your-public-url${endpoint}`;
  const hasQueryParams = endpoint.includes('?');
  const separator = hasQueryParams ? '&' : '?';

  return (
    <Tabs items={['Magic Code', 'Token + Bucket ID']} defaultIndex={0}>
      <Tab value="Magic Code">
        {method === 'GET' ? (
          <pre className="overflow-x-auto rounded-lg bg-muted p-4">
            <code>{`curl "${baseUrl}${separator}magicCode=YOUR_MAGIC_CODE${queryParams}"`}</code>
          </pre>
        ) : (
          <pre className="overflow-x-auto rounded-lg bg-muted p-4">
            <code>{`curl -X POST \\
  "${baseUrl}${separator}magicCode=YOUR_MAGIC_CODE${queryParams}"${headers ? ` \\
  ${headers}` : ''}${body ? ` \\
  -d '${body}'` : ''}`}</code>
          </pre>
        )}
        <p className="mt-2 text-sm">
          Replace <code>YOUR_MAGIC_CODE</code> with your actual Magic Code from your bucket settings.
        </p>
      </Tab>
      <Tab value="Token + Bucket ID">
        {method === 'GET' ? (
          <pre className="overflow-x-auto rounded-lg bg-muted p-4">
            <code>{`curl "${baseUrl}${separator}bucketId=YOUR_BUCKET_ID${queryParams}" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`}</code>
          </pre>
        ) : (
          <pre className="overflow-x-auto rounded-lg bg-muted p-4">
            <code>{`curl -X POST \\
  "${baseUrl}${separator}bucketId=YOUR_BUCKET_ID${queryParams}" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"${headers ? ` \\
  ${headers}` : ''}${body ? ` \\
  -d '${body}'` : ''}`}</code>
          </pre>
        )}
        <p className="mt-2 text-sm">
          Replace <code>YOUR_BUCKET_ID</code> and <code>YOUR_ACCESS_TOKEN</code> with your actual credentials from your bucket settings.
        </p>
      </Tab>
    </Tabs>
  );
}
