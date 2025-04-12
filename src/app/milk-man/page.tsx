'use client';

import {Calendar} from '@/components/ui/calendar';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {CalendarIcon} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {format} from 'date-fns';
import {useState} from 'react';

const deliverySchema = z.object({
  liters: z.number().min(1, {message: 'Liters must be greater than 0'}),
  expectedPayment: z.number().min(0, {message: 'Payment must be at least 0'}),
  date: z.date(),
});

export default function MilkManView() {
  const [report, setReport] = useState<any[]>([]);
  const form = useForm<z.infer<typeof deliverySchema>>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      liters: 0,
      expectedPayment: 0,
      date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof deliverySchema>) {
    // Simulate saving the delivery data and generating a report.
    // In a real app, you'd save to a database and fetch the updated report.
    setReport(prevReport => [...prevReport, values]);
    console.log(values);
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Milk Man View</CardTitle>
          <CardDescription>Record your daily milk deliveries here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="liters"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Liters Delivered</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter liters" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expectedPayment"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Expected Payment</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter payment amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({field}) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Delivery Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabledDate={(date) =>
                            date > new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Record Delivery</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Delivery Report</CardTitle>
          <CardDescription>View your past deliveries and payments.</CardDescription>
        </CardHeader>
        <CardContent>
          {report.length === 0 ? (
            <p>No deliveries recorded yet.</p>
          ) : (
            <ul>
              {report.map((item, index) => (
                <li key={index} className="py-2">
                  {`Delivery on ${format(item.date, 'PPP')}: ${item.liters} liters, Expected Payment: ${item.expectedPayment}`}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
