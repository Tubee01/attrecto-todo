import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { CONNECTION } from 'src/utils/constants';
import { isUUID } from 'src/utils/helpers';
// tslint:disable:no-var-requires
const { fork } = require('child_process');
const path = require('path');

@Injectable()
export class FileService {
  constructor(@Inject(CONNECTION) private readonly pgClient: PoolClient) {}
  processImage(file: Express.Multer.File, userId = ''): void {
    const { originalname, mimetype, buffer } = file;
    const childFork = fork(path.resolve(__dirname, './image.process'));
    childFork.on('message', async (msg) => {
      childFork.kill();
      const fileId = await this.saveFile(
        originalname.split('.')[0],
        mimetype,
        msg.data,
      );
      if (isUUID(userId)) {
        const query =
          'UPDATE "User" SET profile_image_file_id = $1 WHERE id = $2';
        const values = [fileId, userId];
        this.pgClient.query(query, values);
      }
    });
    childFork.on('error', (err) => {
      childFork.kill();
      console.log(err);
    });
    childFork.send({ buffer, mimetype });
  }
  // insert file into database
  async saveFile(
    filename: string,
    mimeType: string,
    buffer: Buffer,
  ): Promise<string> {
    const query =
      'INSERT INTO "File" (name, file , mime_type) VALUES ($1, $2 , $3) RETURNING *';
    const values = [filename, buffer, mimeType];
    const { rows } = await this.pgClient.query(query, values);
    return rows[0].id;
  }
}
