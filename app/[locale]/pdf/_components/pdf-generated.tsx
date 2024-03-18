'use client';
import React, {useEffect, useState} from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import {Button} from '@/components/ui/button';
import { CreateTicket } from '@/actions/ticket';
import toast from 'react-hot-toast';
import { Match, Team } from '@prisma/client';
import { MapPinned } from 'lucide-react';

interface PdfDownloadProps{
  date:string
  match:Match & {
    localTeam:Team
    visitingTeam:Team
  }
}
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333333',
  },
  infoContainer: {
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555555',
    textAlign: 'center',
  },
  imageContainer: {
    height: 200,
    width: '100%',
    position: 'relative',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export const PdfDownload = ({date,match}: PdfDownloadProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTicket = async ()=>{
    const res=await CreateTicket(match.id)
    if(res.success){
      toast.success(`${res.success}`)
    }else{
      toast.error(`${res.error}`)

    }
  }

  const PdfGenerated =() => {
    return (
      <Document>
      <Page size="A6" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.imageContainer}>
            <Image src={'/logo.jpg'} style={styles.image} />
          </View>
          <Text style={styles.title}>{`${match.localTeam.name}`} - {`${match.localTeam.name}`}</Text>
          <Text style={styles.info}>{`${match.stadium}`}</Text>
          <Text style={styles.info}>{`${match.date}`}</Text>
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
