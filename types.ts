
export interface UploadedImage {
  data: string; // raw base64 data
  mimeType: string;
  dataUrl: string; // full data URL with prefix for display
}

export type Gender = 'male' | 'female';
