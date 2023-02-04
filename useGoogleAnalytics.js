import { useEffect } from 'react';

export const useGoogleAnalytics = ({ id, startLoading, delay = 0 }) => {
  useEffect(() => {
    if (startLoading) {
      if (!id) {
        throw new Error('Must provide id');
      }
      setTimeout(() => {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
        document.body.appendChild(script);
        window.dataLayer = window.dataLayer || [];

        function gtag() {

          window.dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', id, {
          anonymize_ip: true,
          cookie_expires: 0,
        });
      }, delay);
    }
  }, [delay, id, startLoading]);
};