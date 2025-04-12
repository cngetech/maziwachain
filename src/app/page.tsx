'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>MaziwaChain</CardTitle>
          <CardDescription>
            Streamlining Milk Transactions for a Sustainable Future
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Welcome to MaziwaChain, where transparency meets traceability in
            the milk supply chain. Use the navigation links above to access
            your specific dashboard.</p>
        </CardContent>
      </Card>
    </div>
  );
}
