// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import logs from '../../data/server_log.json';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { ServerLogEntry } from '../../models';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerLogEntry[]>
) {
  res.status(200).json(logs);
}
