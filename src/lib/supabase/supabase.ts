import { createBrowserClient, createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClientComponentClient() {
    return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLICK_SUPABASE_ANON_KEY!);
}

export function createServerComponentClient() {
    return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        cookies: {
            // return cookies with the name 'name' from the request headers
            get(name: string) {
                return cookies().get(name)?.value;
            },
            // set cookies in the response headers
            set(name: string, value: string, options: CookieOptions) {
                try {
                    cookies().set({ name, value, ...options });
                } catch (error) {
                    throw new Error("Some error setting cookies");
                }
            },
            // remove cookies from the response headers
            remove(name: string, options: CookieOptions) {
                try {
                    cookies().set({ name, value: "", ...options });
                } catch (error) {
                    throw new Error("Some error removing cookies");
                }
            },
        },
    });
}
