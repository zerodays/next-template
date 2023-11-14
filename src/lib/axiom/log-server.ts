// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Logger } from 'next-axiom';

// Used by server actions + server components to log events
const serverLogger = () => {
  // TODO: add custom data to logs
  const logConfig = { todo: 'TODO' };
  return new Logger().with(logConfig);
};

export default serverLogger;
