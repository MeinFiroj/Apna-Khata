import ImageKit, { toFile } from '@imagekit/nodejs';
import { config } from 'dotenv'
config()

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const uploadFile = async (buffer, fileName) => {
  const response = await client.files.upload({
    file: await toFile(buffer, 'file'),
    fileName,
    folder : 'Apna-Khata'
  });

  return response;
}
