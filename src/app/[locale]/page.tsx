import {useTranslations} from 'next-intl';
import Link from 'next/link';
 
export default function Index() {
  const t = useTranslations('Index');
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/dashboard">Go to dashboard</Link>
    </div>
  );
}