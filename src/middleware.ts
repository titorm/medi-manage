import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es', 'pt'],

  // Used when no locale matches
  defaultLocale: 'en',
});

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `.` (e.g. `favicon.ico`)
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
