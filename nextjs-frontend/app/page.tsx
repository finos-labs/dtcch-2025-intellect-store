import { redirect } from 'next/navigation';

export default function Home() {
  // This component does not need to render anything
  redirect('/dashboard'); // Redirect to /dashboard
}