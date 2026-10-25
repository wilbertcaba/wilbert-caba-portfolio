"use client";

import { Analytics } from "@vercel/analytics/next";

export function AnalyticsWithOptOut() {
    return (
        <Analytics
            beforeSend={(event) => {
                // Use localStorage.setItem("va-disable", "true"); to disable analytics on every browser
                if (localStorage.getItem("va-disable")) {
                    return null;
                }
                return event;
            }}
        />
    );
}
