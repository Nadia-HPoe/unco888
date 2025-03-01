'use server';

import { initGoogleAPI } from '@/server-actions/google-sheets';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';

type DataRow = string[];
type Data = DataRow[];

export interface TransformedObject {
  [key: string]: string;
}

const NEXT_PUBLIC_SHEET_SELLOFFERS_RANGE = process.env.NEXT_PUBLIC_SHEET_SELLOFFERS_RANGE;
const NEXT_PUBLIC_SHEET_QA_RANGE = process.env.NEXT_PUBLIC_SHEET_QA_RANGE;
const NEXT_PUBLIC_SHEET_CONTACT_US_RANGE = process.env.NEXT_PUBLIC_SHEET_CONTACT_US_RANGE;
const NEXT_PUBLIC_SHEET_FEEDBACK_RANGE = process.env.NEXT_PUBLIC_SHEET_FEEDBACK_RANGE;
const NEXT_PUBLIC_SHEET_NEWS_RANGE = process.env.NEXT_PUBLIC_SHEET_NEWS_RANGE;

const transformData = (data: Data): TransformedObject[] => {
  const headers: string[] = data[0];
  const result: TransformedObject[] = [];

  for (let i = 1; i < data.length; i++) {
    const obj: TransformedObject = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = data[i][j];
    }
    result.push(obj);
  }

  return result;
};

export const loadSellOffers = async () => {
  const { sheets, spreadsheetId, range } = await initGoogleAPI(NEXT_PUBLIC_SHEET_SELLOFFERS_RANGE);

  if (sheets) {
    try {
      const getRows = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      console.log(getRows);
      return { data: getRows.data.values as string[][], status: getRows.status };
    } catch (error) {
      console.log(error);
    }
  }
  return { data: null, status: 500 };
};

export const sendSellOffer = async (
  quantity: string,
  price: string,
  link: string,
  contact: string,
  visible: boolean
) => {
  const { sheets, spreadsheetId } = await initGoogleAPI();

  try {
    if (!sheets) throw new Error('Server error');
    const sheetsRes = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: NEXT_PUBLIC_SHEET_SELLOFFERS_RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[`${uuidv4()}`, quantity, price, link, contact, visible]],
      },
    });
    return { status: sheetsRes.status, error: '' };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return { status: 500, error: error.message };
    } else {
      console.log('Unknown error');
    }
  }
  return { status: 500, error: '' };
};

export const loadNews = async () => {
  const { sheets, spreadsheetId, range } = await initGoogleAPI(NEXT_PUBLIC_SHEET_NEWS_RANGE);
  if (sheets) {
    try {
      const getRows = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      console.log(getRows);
      return { data: getRows.data.values as string[][], status: getRows.status };
    } catch (error) {
      console.log(error);
    }
  }
  return { data: null, status: 500 };
};

export const loadFeedback = async () => {
  const { sheets, spreadsheetId, range } = await initGoogleAPI(NEXT_PUBLIC_SHEET_FEEDBACK_RANGE);

  if (sheets) {
    try {
      const getRows = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      console.log(getRows);
      return { data: getRows.data.values as string[][], status: getRows.status };
    } catch (error) {
      console.log(error);
    }
  }
  return { data: null, status: 500 };
};

export const getQaData = async () => {
  const { sheets, spreadsheetId, range } = await initGoogleAPI(NEXT_PUBLIC_SHEET_QA_RANGE);

  if (sheets) {
    try {
      const getRows = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      const rows: string[][] = getRows.data.values || [];

      return {
        data: transformData(rows),
        status: getRows.status,
      };
    } catch (error) {
      console.log(error);
    }
  }

  return { data: null, status: 500 };
};

async function bufferToStream(buffer: Buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

export const sendFeedback = async (
  name: string,
  message: string,
  photo: File | null,
  visible: 'FALSE' = 'FALSE'
) => {
  const { sheets, spreadsheetId } = await initGoogleAPI();
  const { drive } = await initGoogleAPI();
  const submissionId = `SUBM_${uuidv4()}`;

  try {
    if (!sheets) throw new Error('Server error');

    let photoUrl = '';
    if (photo) {
      const photoBuffer = Buffer.from(await photo.arrayBuffer());
      const photoStream = await bufferToStream(photoBuffer);

      const driveResponse = await drive?.files.create({
        requestBody: {
          name: `${submissionId}_${photo.name}`,
          mimeType: photo.type,
          parents: [process.env.NEXT_PUBLIC_DRIVE_FOLDER_ID!],
        },
        media: {
          mimeType: photo.type,
          body: photoStream,
        },
        fields: 'id, webContentLink',
      });

      if (driveResponse?.data.id) {
        await drive?.permissions.create({
          fileId: driveResponse?.data.id,
          requestBody: {
            role: 'reader',
            type: 'anyone',
          },
        });

        photoUrl = `https://drive.google.com/uc?export=view&id=${driveResponse.data.id}`;
      } else {
        console.error('Failed to get file ID from Google Drive response');
      }
    }

    const sheetsRes = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: NEXT_PUBLIC_SHEET_FEEDBACK_RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[submissionId, name, photoUrl, message, visible]],
      },
    });

    return { status: sheetsRes.status, error: '' };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return { status: 500, error: error.message };
    }
    console.log('Unknown error');
    return { status: 500, error: 'Unknown error occurred' };
  }
};

export const sendContactFormData = async (name: string, message: string) => {
  const { sheets, spreadsheetId } = await initGoogleAPI(NEXT_PUBLIC_SHEET_CONTACT_US_RANGE);

  try {
    if (!sheets) throw new Error('Server error');
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: NEXT_PUBLIC_SHEET_CONTACT_US_RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[`${uuidv4()}`, name, message]],
      },
    });
    return { data: response.data, status: response.status, error: '' };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return { status: 500, error: error.message };
    } else {
      console.log('Unknown error');
    }
  }
  return { status: 500, error: '' };
};
