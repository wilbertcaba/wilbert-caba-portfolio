import { createBrowserClient, createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

export function createClientComponentClient() {
    return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

export function createServerComponentClient(cookieStore: CookieStore) {
    return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        cookies: {
            // return cookies with the name 'name' from the request headers
            get(name: string) {
                return cookieStore.get(name)?.value;
            },
            // set cookies in the response headers
            set(name: string, value: string, options: CookieOptions) {
                try {
                    cookieStore.set({ name, value, ...options });
                } catch {
                    // Server Components cannot set cookies. Session refresh belongs in middleware or a route handler.
                }
            },
            // remove cookies from the response headers
            remove(name: string, options: CookieOptions) {
                try {
                    cookieStore.set({ name, value: "", ...options });
                } catch {
                    // Server Components cannot set cookies. Session refresh belongs in middleware or a route handler.
                }
            },
        },
    });
}
