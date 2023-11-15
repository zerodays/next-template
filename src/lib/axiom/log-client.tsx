// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useLogger } from 'next-axiom';

// Used by client components to log events
const useClientLogger = () => {
  // TODO: add custom data to logs
  const logConfig = { todo: 'TODO' };
  return useLogger().with(logConfig);
};

export default useClientLogger;
