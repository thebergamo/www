import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from 'utils/locales'

// export default async function middleware(request: NextRequest) {
//   const defaultLocale = request.headers.get('x-default-locale') || 'en-US'

//   const handleI18nRouting = createMiddleware({
//     // A list of all locales that are supported
//     locales: ['en-US', 'pt-BR'],
   
//     defaultLocale: 'en-US'
//   });

//   const response = handleI18nRouting(request)

//   response.headers.set('x-default-locale', defaultLocale)

//   return response
// }

export default createMiddleware({
  // A list of all locales that are supported
  locales,
 
  defaultLocale,
});

 
export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|images|.*\\..*).*)']
};
