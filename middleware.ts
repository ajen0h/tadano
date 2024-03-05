import {authMiddleware} from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/api/webhooks(.*)', '/forum', '/forum/thread/(.*)'],
  ignoredRoutes: ['/api/webhooks(.*)', '/forum/thread/(.*)'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
