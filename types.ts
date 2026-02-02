
export interface GeminiResponse {
  text: string;
  urls?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  thinking?: string;
}

export enum ImageSize {
  K1 = '1K',
  K2 = '2K',
  K4 = '4K'
}

export enum AspectRatio {
  A1_1 = '1:1',
  A2_3 = '2:3',
  A3_2 = '3:2',
  A3_4 = '3:4',
  A4_3 = '4:3',
  A9_16 = '9:16',
  A16_9 = '16:9',
  A21_9 = '21:9'
}
