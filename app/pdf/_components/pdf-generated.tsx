'use client';
import React, {useEffect, useState} from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import {Button} from '@/components/ui/button';
import { CreateTicket } from '@/actions/ticket';
import toast from 'react-hot-toast';

interface PdfDownloadProps{
  date:string
  matchId:string
}
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export const PdfDownload = ({date,matchId}: PdfDownloadProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTicket = async ()=>{
    const res=await CreateTicket(matchId)
    if(res.success){
      toast.success(`${res.success}`)
    }else{
      toast.error(`${res.error}`)

    }
  }

  const PdfGenerated =() => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>{date}</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <>
      {isClient ? (
        <>
          <PDFDownloadLink
          
            document={<PdfGenerated />}
            fileName={`Ticket ${date}`}>
            {({loading}) =>
              loading ? <Button>Loading...</Button> : <Button className='w-full' onClick={handleTicket}>Get Ticket</Button>
            }
          </PDFDownloadLink>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
