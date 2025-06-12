'use client';

import type React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters."}),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    // In a real app, you would send this data to a backend API
    console.log(data);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    form.reset();
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-4xl font-headline font-bold text-center mb-10">Get in Touch</h1>
      
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Contact Form */}
        <div className="bg-card p-6 sm:p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-headline font-semibold mb-6">Send us a Message</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="How can we help?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your message here..." rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Form>
        </div>

        {/* Contact Information & Image */}
        <div className="space-y-8">
            <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg">
                 <Image 
                    src="https://placehold.co/600x400.png" 
                    alt="Contact us graphic with friendly support icons"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="customer support"
                />
            </div>
            <div className="bg-card p-6 sm:p-8 rounded-lg shadow-xl space-y-6">
                <h2 className="text-2xl font-headline font-semibold mb-4">Contact Information</h2>
                <div className="flex items-start space-x-3">
                    <Mail size={24} className="text-primary mt-1 shrink-0" />
                    <div>
                        <h3 className="font-semibold">Email Us</h3>
                        <a href="mailto:support@ecommsim.com" className="text-muted-foreground hover:text-primary transition-colors">support@ecommsim.com</a>
                    </div>
                </div>
                <div className="flex items-start space-x-3">
                    <Phone size={24} className="text-primary mt-1 shrink-0" />
                    <div>
                        <h3 className="font-semibold">Call Us</h3>
                        <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">+1 (234) 567-890</a>
                    </div>
                </div>
                <div className="flex items-start space-x-3">
                    <MapPin size={24} className="text-primary mt-1 shrink-0" />
                    <div>
                        <h3 className="font-semibold">Our Office</h3>
                        <p className="text-muted-foreground">123 Playful Parkway, Joyville, JS 45678</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
