'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useState} from 'react';

// Schemas for form validation
const deliverySchema = z.object({
  milkReceived: z.number().min(0, {message: 'Must be 0 or more'}),
  amountOwed: z.number().min(0, {message: 'Must be 0 or more'}),
});

const cashSaleSchema = z.object({
  cashLitersSold: z.number().min(0, {message: 'Must be 0 or more'}),
});

const creditSaleSchema = z.object({
  customerName: z.string().min(2, {message: 'Name must be at least 2 characters'}),
  creditLitersSold: z.number().min(0, {message: 'Must be 0 or more'}),
  dueDate: z.date(),
});

const mpesaSaleSchema = z.object({
  mpesaTransactionId: z.string().min(5, {message: 'Invalid transaction ID'}),
  mpesaAmount: z.number().min(1, {message: 'Amount must be greater than 0'}),
  mpesaLitersSold: z.number().min(0, {message: 'Must be 0 or more'}),
});

const customerSchema = z.object({
  name: z.string().min(2, {message: 'Name must be at least 2 characters'}),
  contact: z.string().min(10, {message: 'Invalid contact number'}),
  creditLimit: z.number().min(0, {message: 'Credit limit must be 0 or more'}),
});

export default function MilkShopView() {
  // Delivery Tracking Form
  const deliveryForm = useForm<z.infer<typeof deliverySchema>>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      milkReceived: 0,
      amountOwed: 0,
    },
  });

  const [salesReport, setSalesReport] = useState<any[]>([]);

  const deliverySubmit = (values: z.infer<typeof deliverySchema>) => {
    console.log('Delivery Data:', values);
    // Handle delivery data submission (e.g., save to database)
  };

  // Cash Sales Form
  const cashSaleForm = useForm<z.infer<typeof cashSaleSchema>>({
    resolver: zodResolver(cashSaleSchema),
    defaultValues: {
      cashLitersSold: 0,
    },
  });

  const cashSaleSubmit = (values: z.infer<typeof cashSaleSchema>) => {
    setSalesReport(prevSalesReport => [...prevSalesReport, values]);
    console.log('Cash Sales Data:', values);
    // Handle cash sales data submission
  };

  // Credit Sales Form
  const creditSaleForm = useForm<z.infer<typeof creditSaleSchema>>({
    resolver: zodResolver(creditSaleSchema),
    defaultValues: {
      customerName: '',
      creditLitersSold: 0,
      dueDate: new Date(),
    },
  });

  const creditSaleSubmit = (values: z.infer<typeof creditSaleSchema>) => {
    setSalesReport(prevSalesReport => [...prevSalesReport, values]);
    console.log('Credit Sales Data:', values);
    // Handle credit sales data submission
  };

  // MPESA Sales Form
  const mpesaSaleForm = useForm<z.infer<typeof mpesaSaleSchema>>({
    resolver: zodResolver(mpesaSaleSchema),
    defaultValues: {
      mpesaTransactionId: '',
      mpesaAmount: 0,
      mpesaLitersSold: 0,
    },
  });

  const mpesaSaleSubmit = (values: z.infer<typeof mpesaSaleSchema>) => {
    setSalesReport(prevSalesReport => [...prevSalesReport, values]);
    console.log('MPESA Sales Data:', values);
    // Handle MPESA sales data submission
  };

  // Customer Management Form
  const customerForm = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      contact: '',
      creditLimit: 0,
    },
  });

  const customerSubmit = (values: z.infer<typeof customerSchema>) => {
    console.log('Customer Data:', values);
    // Handle customer data submission
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Milk Shop View</CardTitle>
          <CardDescription>Manage your milk deliveries, sales, and customers here.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Milk Delivery Tracking */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Milk Delivery Tracking</h2>
            <Form {...deliveryForm}>
              <form onSubmit={deliveryForm.handleSubmit(deliverySubmit)} className="space-y-4">
                <FormField
                  control={deliveryForm.control}
                  name="milkReceived"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Milk Received (Liters)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter liters received" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={deliveryForm.control}
                  name="amountOwed"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Amount Owed to Milk Man</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter amount owed" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Record Delivery</Button>
              </form>
            </Form>
          </section>

          {/* Sales Recording */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Sales Recording</h2>

            {/* Cash Sales */}
            <h3 className="text-lg font-semibold mb-2">Cash Sales</h3>
            <Form {...cashSaleForm}>
              <form onSubmit={cashSaleForm.handleSubmit(cashSaleSubmit)} className="space-y-4">
                <FormField
                  control={cashSaleForm.control}
                  name="cashLitersSold"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Liters Sold (Cash)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter liters sold for cash" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Record Cash Sale</Button>
              </form>
            </Form>

            {/* Credit Sales */}
            <h3 className="text-lg font-semibold mt-4 mb-2">Credit Sales</h3>
            <Form {...creditSaleForm}>
              <form onSubmit={creditSaleForm.handleSubmit(creditSaleSubmit)} className="space-y-4">
                <FormField
                  control={creditSaleForm.control}
                  name="customerName"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Customer Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter customer name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={creditSaleForm.control}
                  name="creditLitersSold"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Liters Sold (Credit)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter liters sold on credit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={creditSaleForm.control}
                  name="dueDate"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Record Credit Sale</Button>
              </form>
            </Form>

            {/* MPESA Sales */}
            <h3 className="text-lg font-semibold mt-4 mb-2">MPESA Sales</h3>
            <Form {...mpesaSaleForm}>
              <form onSubmit={mpesaSaleForm.handleSubmit(mpesaSaleSubmit)} className="space-y-4">
                <FormField
                  control={mpesaSaleForm.control}
                  name="mpesaTransactionId"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>MPESA Transaction ID</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter MPESA transaction ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={mpesaSaleForm.control}
                  name="mpesaAmount"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Amount Received (MPESA)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter amount received via MPESA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={mpesaSaleForm.control}
                  name="mpesaLitersSold"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Liters Sold (MPESA)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter liters sold via MPESA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Record MPESA Sale</Button>
              </form>
            </Form>
          </section>

          {/* Customer Management */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
            <Form {...customerForm}>
              <form onSubmit={customerForm.handleSubmit(customerSubmit)} className="space-y-4">
                <FormField
                  control={customerForm.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Customer Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter customer name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={customerForm.control}
                  name="contact"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Enter contact number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={customerForm.control}
                  name="creditLimit"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Credit Limit</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter credit limit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Register Customer</Button>
              </form>
            </Form>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Sales Report</h2>
            <ul>
              {salesReport.map((item, index) => (
                <li key={index} className="py-2">
                  {`Sales Record ${index + 1}: ${JSON.stringify(item)} `}
                </li>
              ))}
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
