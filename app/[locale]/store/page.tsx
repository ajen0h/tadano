import {Terminal} from 'lucide-react';
import {Store} from './_components/store';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertComponent } from '@/components/alert-component';
const StorePage = async ({
  searchParams: {success, error},
}: {
  searchParams: {success: string; error: string};
}) => {
  console.log(success);

 

  
  return (
    <>
      <Store success={success} error={error} />
      {/* <Alert/> */}
      
    </>
  );
};

export default StorePage;
