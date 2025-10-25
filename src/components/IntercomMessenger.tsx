import { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';

export default function IntercomMessenger() {
  useEffect(() => {
    Intercom({
      app_id: 'qc9vxxff',
    });
  }, []);

  return null;
}
