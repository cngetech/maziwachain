'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const userSchema = z.object({
  name: z.string().min(2, {message: 'Name must be at least 2 characters'}),
  role: z.enum(['admin', 'milk_man', 'milk_shop']),
  contact: z.string().min(10, {message: 'Invalid contact number'}),
});

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      role: 'milk_man',
      contact: '',
    },
  });

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    setUsers(prevUsers => [...prevUsers, values]);
    console.log('New User Data:', values);
    form.reset();
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Monitor transactions, manage users, and view financial reports.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* User Management Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter user name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <select {...field} className="border rounded px-3 py-2 w-full">
                          <option value="admin">Admin</option>
                          <option value="milk_man">Milk Man</option>
                          <option value="milk_shop">Milk Shop</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
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
                <Button type="submit">Add User</Button>
              </form>
            </Form>
            <h3 className="text-lg font-semibold mt-4 mb-2">Registered Users</h3>
            <ul>
              {users.map((user, index) => (
                <li key={index} className="py-2">{`User ${index + 1}: Name: ${user.name}, Role: ${user.role}, Contact: ${user.contact}`}</li>
              ))}
            </ul>
          </section>

          {/* Transaction Monitoring (Placeholder) */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Transaction Monitoring</h2>
            {/* Placeholder for transaction data table or charts */}
            <p>Transaction data will be displayed here.</p>
          </section>

          {/* Financial Reports (Placeholder) */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Financial Reports</h2>
            {/* Placeholder for financial reports and charts */}
            <p>Financial reports and analytics will be displayed here.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
