import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import Jimp from 'jimp';

process.on('message', async (msg) => {
  const { buffer, mimeType } = msg;
  const data = await main(buffer, mimeType);
  process.send(data);
});

const main = async (buffer: Buffer, mimeType: string): Promise<Buffer> => {
  const resized = await Jimp.read(buffer)
    .then(async (image) => {
      if (image.getHeight() >= 1080 && image.getWidth() >= 1920) {
        image.resize(Jimp.AUTO, 1080);
      }
      return await image.getBufferAsync(mimeType);
    })
    .catch(() => {
      return buffer;
    });

  return await imagemin.buffer(Buffer.from(resized), {
    plugins: [
      imageminMozjpeg({
        quality: 80,
      }),
      imageminPngquant({
        speed: 10,
        quality: [0.6, 0.8],
      }),
    ],
  });
};
