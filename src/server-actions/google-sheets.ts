import { google, sheets_v4, drive_v3, Common, Auth } from 'googleapis';


type GoogleSheetParams = {
  spreadsheetId: string;
  driveId: string;
  range: string;
  auth: Common.GoogleAuth<Auth.AuthClient> | null;
  sheets: sheets_v4.Sheets | null;
  drive: drive_v3.Drive | null;
};

export const initGoogleAPI = async (range?: string): Promise<GoogleSheetParams> => {
  const params: GoogleSheetParams = {
    spreadsheetId: process.env.GOOGLE_SHEET_ID ?? '',
    driveId: process.env.GOOGLE_DRIVE_FOLDER_ID ?? '',
    range: range ?? '',
    auth: null,
    sheets: null,
    drive: null,
  };

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });
    params.auth = auth;
    params.sheets = google.sheets({ version: 'v4', auth });
    params.drive = google.drive({ version: 'v3', auth });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Unknown error');
    }
  }
  return params;
};
